const apiText = document.querySelector("#apitext"),
    apiAuthor = document.querySelector("#apiAuthor"),
    refreshApi = document.querySelector("#refreshApi");

const welcomeText = document.querySelector("#welcomeText"),
    welcomeName = document.querySelector("#welcomeName"),
    showTime = document.querySelector("#time"),
    loactiontime = document.querySelector("#location");


async function getData(cb) {
    try {
        const data = await fetch("https://type.fit/api/quotes");
        const res = await data.json();
        let randomNumber = Math.floor(Math.random() * 1500);
        cb({ title: res[randomNumber].text, author: res[randomNumber].author });
    }
    catch (err) {
        alert("something went wrong");
    }
}

function start() {
    let value = 0;
    refreshApi.style.transition = '0.1s ease';
    let timeout = setInterval(() => {
        if (value < 360) {
            refreshApi.style.transform = `rotate(${value}deg)`;
            value += 20;
        }
        else {
            value = 0;
        }
    }, 50);
    getData((data) => {
        apiText.innerText = `"${data.title}"`;
        apiAuthor.innerText = data.author;
    })
    setTimeout(() => {
        clearInterval(timeout);
    }, 2000);

}


start();

refreshApi.addEventListener("click", start);


function show(){
let great = null;
let name = localStorage.getItem('_name');
const time = new Date().getHours();
console.log(time);
if(time < 11){
    great = 'good morning';
    document.body.style.backgroundImage = "url('./morning.jpg')";
}
else if(time < 18){
    great = 'good day';
    document.body.style.backgroundImage = "url('./day.jpg')";
}
else{
    great = 'good evening';
    document.body.style.backgroundImage = "url('./night.jpg')";
}
welcomeText.innerText = `${great},`;
while(!name){
    name = prompt('Enter Your Name..');
}
localStorage.setItem('_name',name);
welcomeName.innerText = name;
}

function showTimer(){
    let date = new Date();
    showTime.innerText = `${date.getHours()}:${date.getMinutes()}`;
}

show();
showTimer();

setInterval(() => {
    showTimer();
},200);
