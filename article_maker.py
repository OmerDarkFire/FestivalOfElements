from datetime import datetime

def generate_article(): 
    img_src = input("Enter the image URL: ")
    writer_name = input("Enter the writer's name: ")
    article_title = input("Enter the article title: ")
    short_description = input("Enter the short description: ")
    full_article = input("Enter the full content of the article: ")
    today_date = datetime.now().strftime("%Y-%m-%d")
    html_code = f"""
    <div class="article-box">
        <img class="article-image" src="{img_src}" alt="תמונה">
        <p class="writer-name">כותב הכתבה: {writer_name}</p>
        <p class="article-date" data-date="{today_date}">תאריך: {today_date}</p>
        <h3>{article_title}</h3>
        <p class="short-description">{short_description}</p>
        <div class="full-article">
            <p>{full_article}</p>
        </div>
        <a href="javascript:void(0);" class="read-more">קרא עוד</a>
    </div>
    """
    return html_code
print("=== Generate a new article ===")
article_html = generate_article()
print("\nGenerated HTML:")
print(article_html)
