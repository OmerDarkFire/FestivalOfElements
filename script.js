document.addEventListener('DOMContentLoaded', () => {
    const blackBox = document.getElementById('hidden-box');
    let inputSequence = '';
    const targetSequence = '123'; 
    const redirectURL = 'https://youtu.be/dIEuBLkYqYA?si=rDb7eYbIzbYANajE';

    // Ensure the box exists before adding an event listener
    if (blackBox) {
        blackBox.addEventListener('click', () => {
            // Play the sound
            const audio = new Audio('images/BLUE_LOBSTER.mp3');
            audio.play();

            // Show the image in full screen
            const photoURL = 'images/yali-grey-black-background.png';
            const imgElement = document.createElement('img');
            imgElement.src = photoURL;
            imgElement.alt = 'Full screen photo';
            imgElement.style.position = 'fixed';
            imgElement.style.top = '0';
            imgElement.style.left = '0';
            imgElement.style.width = '100vw';
            imgElement.style.height = '100vh';
            imgElement.style.objectFit = 'contain';
            imgElement.style.background = 'rgba(0, 0, 0, 0.8)';
            imgElement.style.zIndex = '1000';

            imgElement.addEventListener('click', () => {
                document.body.removeChild(imgElement);
            });

            document.body.appendChild(imgElement);
        });
    }

    // Key Sequence Event for '123' Redirect
    document.addEventListener('keydown', (event) => {
        inputSequence += event.key;

        // Check for the sequence match
        if (inputSequence.includes(targetSequence)) {
            window.open(redirectURL, '_blank');
            inputSequence = ''; // Reset sequence after match
        }

        // Prevent inputSequence from growing too long
        if (inputSequence.length > targetSequence.length) {
            inputSequence = inputSequence.slice(-targetSequence.length);
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers for read more buttons
    document.querySelectorAll('.read-more').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Find the full article content in this specific article box
            const articleBox = this.closest('.article-box');
            const fullArticle = articleBox.querySelector('.full-article');
            
            // Toggle the content
            if (fullArticle.classList.contains('show')) {
                fullArticle.classList.remove('show');
                this.textContent = 'קרא עוד';
            } else {
                fullArticle.classList.add('show');
                this.textContent = 'קרא פחות';
            }
        });
    });
});
// Get the search input field
const searchInput = document.querySelector('.search-input');

// Add event listener for input
searchInput.addEventListener('input', function() {
    const query = searchInput.value.toLowerCase();
    const articles = document.querySelectorAll('.article-box');
    
    articles.forEach(article => {
        const title = article.querySelector('h3').textContent.toLowerCase();
        const writer = article.querySelector('.writer-name').textContent.toLowerCase();
        const date = article.querySelector('.article-date').textContent.toLowerCase();
        
        // Show or hide articles based on whether they match the query
        if (title.includes(query) || writer.includes(query) || date.includes(query)) {
            article.style.display = 'block'; // Show the article
        } else {
            article.style.display = 'none'; // Hide the article
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Get the article container
    const articleContainer = document.querySelector('.article-container');
    
    // Get all article boxes
    let articles = Array.from(document.querySelectorAll('.article-box'));
    
    // Sort articles by date (newest first)
    articles.sort((a, b) => {
        const dateA = new Date(a.querySelector('.article-date').getAttribute('data-date'));
        const dateB = new Date(b.querySelector('.article-date').getAttribute('data-date'));
        return dateB - dateA;
    });
    
    // Clear and re-append sorted articles
    articleContainer.innerHTML = '';
    articles.forEach(article => {
        articleContainer.appendChild(article);
    });
});
