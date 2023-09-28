const API_KEY ="069716097cdbbca9a090fa2e1b7083aa";//use api key
const url = "http://api.mediastack.com/v1/news? access_key = ";

window.addEventListener('load',()=>fetchNews("Global"));
function reload(){
    window.location.reload();
    searchTxt.value="";
}
async function fetchNews(query) {
    // const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const res = await fetch(`http://api.mediastack.com/v1/news?access_key=${API_KEY}&keywords=${query}&countries=gb`);
    const data = await res.json();
    console.log(data);
    bindData(data.data);
}
function bindData(datas) {
    const cardContainer=document.querySelector("#card_container");
    const newsTemp =document.querySelector("#temp-news-card");
    cardContainer.innerHTML="";
    datas.forEach(data => {
        if(!data.image){
            return;
        } 
        const cardClone = newsTemp.content.cloneNode(true);
        fillDataCard(cardClone,data);
        cardContainer.appendChild(cardClone);
    });
}
function fillDataCard(cardClone,data) {
    const newsImage = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDsc = cardClone.querySelector("#news-des");
    newsImage.src=data.image;
    newsTitle.innerHTML=data.title;
    newsDsc.innerHTML= data.description;
    const date = new Date(data.published_at).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    });
    newsSource.innerHTML=`${data.source} -  ${date}`;
    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(data.url,"_blank");
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