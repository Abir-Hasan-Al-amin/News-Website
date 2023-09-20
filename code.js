const API_KEY ="6ef2ea750f9e4e23b4119fa6b4c75ce4";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=>fetchNews("Global"));
function reload(){
    window.location.reload();
    searchTxt.value="";
}
async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}
function bindData(articles) {
    const cardContainer=document.querySelector("#card_container");
    const newsTemp =document.querySelector("#temp-news-card");
    cardContainer.innerHTML="";
    articles.forEach(article => {
        if(!article.urlToImage){
            return;
        } 
        const cardClone = newsTemp.content.cloneNode(true);
        fillDataCard(cardClone,article);
        cardContainer.appendChild(cardClone);
    });
}
function fillDataCard(cardClone,article) {
    const newsImage = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDsc = cardClone.querySelector("#news-des");
    newsImage.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDsc.innerHTML= article.description;
    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    });
    newsSource.innerHTML=`${article.source.name} -  ${date}`;
    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blank");
    });
}
let curSelectNav= null;
function onNav(value) {
    fetchNews(value);
    const navItem =document.getElementById(value);
    curSelectNav?.classList.remove('active');
    curSelectNav=navItem;
    curSelectNav.classList.add('active');
}
const searchBtn=document.getElementById("search-button");
const searchTxt=document.getElementById("search-text");
searchBtn.addEventListener('click',()=>{
    const value =searchTxt.value;
    if(!value) return;
    fetchNews(value);
    curSelectNav?.classList.remove('active');
    curSelectNav= null;
});