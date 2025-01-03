import { auth, db } from './firebase-config.js';
import { collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Test Firebase connection
console.log('Initializing Firebase connection...');

// Load articles from Firebase
async function loadArticles() {
    const articleContainer = document.querySelector('.article-container');
    const q = query(collection(db, "articles"), orderBy("date", "desc"));
    
    try {
        const querySnapshot = await getDocs(q);
        articleContainer.innerHTML = ''; // Clear existing articles
        
        querySnapshot.forEach((doc) => {
            const article = doc.data();
            const articleHTML = `
                <div class="article-box">
                    <img class="article-image" src="${article.imageUrl}" alt="תמונה">
                    <p class="writer-name">כותב הכתבה: ${article.author}</p>
                    <p class="article-date">תאריך: ${article.date}</p>
                    <h3>${article.title}</h3>
                    <p class="short-description">${article.shortDescription}</p>
                    <div class="full-article">
                        <p>${article.fullContent}</p>
                    </div>
                    <a href="javascript:void(0);" class="read-more">קרא עוד</a>
                </div>
            `;
            articleContainer.innerHTML += articleHTML;
        });

        // Reattach event listeners for "Read More" buttons
        attachReadMoreListeners();
    } catch (error) {
        console.error("Error loading articles: ", error);
    }
}

// Add new article (for admins only)
async function addArticle(articleData) {
    if (!auth.currentUser) {
        alert('יש להתחבר כדי להוסיף כתבה');
        return;
    }

    try {
        await addDoc(collection(db, "articles"), {
            title: articleData.title,
            author: articleData.author,
            date: new Date().toISOString().split('T')[0],
            imageUrl: articleData.imageUrl,
            shortDescription: articleData.shortDescription,
            fullContent: articleData.fullContent,
            authorId: auth.currentUser.uid
        });
        
        // Reload articles after adding new one
        loadArticles();
    } catch (error) {
        console.error("Error adding article: ", error);
        alert('שגיאה בהוספת הכתבה');
    }
}

// Search functionality
function setupSearch() {
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('input', async (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const articleBoxes = document.querySelectorAll('.article-box');
        
        articleBoxes.forEach(box => {
            const title = box.querySelector('h3').textContent.toLowerCase();
            const author = box.querySelector('.writer-name').textContent.toLowerCase();
            const date = box.querySelector('.article-date').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || 
                author.includes(searchTerm) || 
                date.includes(searchTerm)) {
                box.style.display = '';
            } else {
                box.style.display = 'none';
            }
        });
    });
}

// Read More functionality
function attachReadMoreListeners() {
    document.querySelectorAll('.read-more').forEach(button => {
        button.addEventListener('click', function() {
            const articleBox = this.closest('.article-box');
            const fullArticle = articleBox.querySelector('.full-article');
            
            if (fullArticle.style.display === 'none' || !fullArticle.style.display) {
                fullArticle.style.display = 'block';
                this.textContent = 'קרא פחות';
            } else {
                fullArticle.style.display = 'none';
                this.textContent = 'קרא עוד';
            }
        });
    });
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadArticles();
    setupSearch();
});
