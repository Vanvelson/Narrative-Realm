import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, doc, collection, addDoc, query, updateDoc, getDocs, where, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js"; 


document.addEventListener('DOMContentLoaded', function() {
  const wordList = document.querySelector('[data-looping-words-list]');
  const words = Array.from(wordList.children);
  const totalWords = words.length;
  const wordHeight = 100 / totalWords; // Offset as a percentage
  const edgeElement = document.querySelector('[data-looping-words-selector]');
  let currentIndex = 0;
  function updateEdgeWidth() {
    const centerIndex = (currentIndex + 1) % totalWords;
    const centerWord = words[centerIndex];
    const centerWordWidth = centerWord.getBoundingClientRect().width;
    const listWidth = wordList.getBoundingClientRect().width;
    const percentageWidth = (centerWordWidth / listWidth) * 100;
    gsap.to(edgeElement, {
      width: `${percentageWidth}%`,
      duration: 0.5,
      ease: 'Expo.easeOut',
    });
  }

  function moveWords() {
    currentIndex++;
    gsap.to(wordList, {
      yPercent: -wordHeight * currentIndex,
      duration: 1.2,
      ease: 'elastic.out(1, 0.85)',
      onStart: updateEdgeWidth,
      onComplete: function() {
        if (currentIndex >= totalWords - 3) {
          wordList.appendChild(wordList.children[0]);
          currentIndex--;
          gsap.set(wordList, { yPercent: -wordHeight * currentIndex });
          words.push(words.shift());
        }
      }
    });
  }
  updateEdgeWidth();
  gsap.timeline({ repeat: -1, delay: 1 })
    .call(moveWords)
    .to({}, { duration: 2 })
    .repeat(-1);
});


const colors = ["#ffffff", "#ec5146", "#f6963c", "#ffd447", "#b0c954", "#61bd61"];
const ratingText = ["Bad", "Decent", "Average", "Good", "Excellent"];

const starsEl = document.querySelectorAll('.star');
const rootEl = document.querySelector(':root');
const ratingTextEl = document.querySelector('#rating-text');
const ratingStarsEl = document.querySelector('#rating-stars');

starsEl.forEach((star, index) => {
    star.addEventListener('click', () => highlightStar(index));
});

function highlightStar(index) {

    starsEl.forEach((star, idx) => {

        if (idx <= index) {
            star.classList.add('is-selected');

        } else {
            star.classList.remove('is-selected');
        }
    });
    
    const selectedStars = document.querySelectorAll('.is-selected');
    const color = colors[selectedStars.length]; 

    selectedStars.forEach((star, idx) => {
        rootEl.style.setProperty(`--star${idx+1}`, color);
    });

    ratingTextEl.innerText = `${ratingText[selectedStars.length - 1]}`;

    if (selectedStars.length === 1) {
        ratingStarsEl.innerText = `${selectedStars.length} star`;
    } else {
        ratingStarsEl.innerText = `${selectedStars.length} stars`;
    }

};


document.getElementById("open_cart").onclick = function(){
    document.getElementById("module").classList.remove("hide")
}
document.getElementById("close_cart").onclick = function(){
    document.getElementById("module").classList.add("hide")
}



const firebaseConfig = {
    apiKey: "AIzaSyBpycTg_gn-xRsysMlvWOTK67qbAthMs4o",
    authDomain: "novashop-bc762.firebaseapp.com",
    projectId: "novashop-bc762",
    storageBucket: "novashop-bc762.appspot.com",
    messagingSenderId: "57262889635",
    appId: "1:57262889635:web:0a0e1c2514044a95f73d16"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", function(){
fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(products => {
        for(let product of products){
            document.getElementById("products").innerHTML +=`
                <div class="card mx-auto" style="width: 18rem;">
                        <img src="${product.image}" class="card-img-top" alt="${product.title}">
                        <div class="card-body">
                            <h5 class="card-title">${product.title}</h5>
                            <p class="card-text">${product.description}</p>
                            <a href="#" class="btn btn-primary add-product" data-id='${product.id}'">Check</a>
                        </div>
                    </div>
                `;
            }
            
            for (let el of document.getElementsByClassName("add-product")){

                el.onclick = async function(){
                    const user = doc(db, "users", localStorage.getItem("user"));
                    const data = await getDoc(user)

                    const products = data.data().products || []
                    const newProducts = new Set([...products, +this.dataset.id])

                    await updateDoc(user, {
                        products: ([...newProducts])
                    });

                    console.log('product added')
                }    
            }
        })
    });




document.getElementById('registerForm').onsubmit = async function(e){
    e.preventDefault();

    const name = document.getElementById('InputName').value
    const email = document.getElementById('InputEmail').value
    const password = document.getElementById('InputPassword1').value
    const check = document.getElementById('Check1').value

    await addDoc(collection(db, "users"), { name, email, password, check });

    console.log('works')
}
document.getElementById('loginForm').onsubmit = async function(e){
    e.preventDefault();

    const email = document.getElementById('LoginInputEmail').value
    const password = document.getElementById('loginInputPassword1').value

    const q = query(collection(db, "users"), where("email", "==", email ), where("password", "==", password));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => localStorage.setItem("user", doc.id));

    console.log('works')
}








const books = [
  {
    "id": 1,
    "title": "Kobzar",
    "author": "Taras Shevchenko",
    "content": "This is a notable book of Ukrainian poetry written by Taras Shevchenko.",
    "cover": "https://static.yakaboo.ua/media/catalog/product/7/d/7d37636590e82cb61a6130802d0a1336.png"
},
{
    "id": 2,
    "title": "Shadows of Forgotten Ancestors",
    "author": "Mykhailo Kotsiubynsky",
    "content": "A poetic novel depicting life, traditions, and mysticism in the Hutsul region of Ukraine.",
    "cover": "https://static.yakaboo.ua/media/cloudflare/product/webp/600x840/1/8/180_1_33.jpg"
},
{
    "id": 3,
    "title": "Forest Song",
    "author": "Lesya Ukrainka",
    "content": "A lyrical drama blending folklore and philosophy, emphasizing the harmony between humanity and nature.",
    "cover": "https://i0.wp.com/www.lgbtqfresno.com/wp-content/uploads/sites/2/2023/12/Mavka.jpg?fit=788%2C1080&ssl=1&w=640"
},
{
  "id": 4,
  "title": "The Brave Little Fox",
  "author": "Olha Dmytrenko",
  "content": "A small fox named Liko shows great courage to save his forest from danger.",
  "cover": "https://m.media-amazon.com/images/I/61SlgH6qu6L._AC_UF1000,1000_QL80_.jpg"
},
{
    "id": 5,
    "title": "Maria",
    "author": "Ulas Samchuk",
    "content": "A tragic story of famine and hardship during the Holodomor of the 1930s.",
    "cover": "https://static.yakaboo.ua/media/cloudflare/product/webp/600x840/3/5/354_1_1.jpg"
},
{
    "id": 6,
    "title": "Tiger Trappers",
    "author": "Ivan Bahrianyi",
    "content": "A gripping tale of courage and survival in the wilds of Siberia.",
    "cover": "https://wordery.com/jackets/f4987daf/tiger-trappers-ivan-bahrianyi-9789660396203.jpg"
},
{
    "id": 7,
    "title": "Yellow Prince",
    "author": "Vasyl Barka",
    "content": "A harrowing tale of the Ukrainian famine of the 1930s.",
    "cover": "https://i.ebayimg.com/images/g/9HwAAOSw0ztlqbV-/s-l400.jpg"
},
{
    "id": 8,
    "title": "Eneida",
    "author": "Ivan Kotliarevsky",
    "content": "A humorous adaptation of Virgil’s Aeneid that satirizes Ukrainian society of the 18th century.",
    "cover": "https://nashformat.ua/files/products/ebook-eneida-klasyka-ukrainskoi-literatury-629276.800x800.jpeg?241208061002"
},
{
  "id": 9,
  "title": "Little Friend",
  "author": "Olena Doroshenko",
  "content": "A little fox named Lina embarks on an adventure to find friends and learns the value of bravery and kindness.",
  "cover": "https://content2.rozetka.com.ua/goods/images/big/449074478.jpg"
},
{
    "id": 10,
    "title": "Death and the Penguin",
    "author": "Andrey Kurkov",
    "content": "A darkly humorous tale of a journalist and his pet penguin, exploring loneliness and societal absurdity.",
    "cover": "https://static.yakaboo.ua/media/catalog/product/9/7/9781446483367.jpg"
},
{
    "id": 11,
    "title": "The Museum of Abandoned Secrets",
    "author": "Oksana Zabuzhko",
    "content": "A multi-layered family saga interweaving love, war, and Ukraine’s Soviet past.",
    "cover": "https://m.media-amazon.com/images/I/51xXjNT+TuL._SL500_.jpg"
},
{
    "id": 16,
    "title": "At the Market Square",
    "author": "Hrytsko Hryhorenko",
    "content": "A collection of short stories that vividly portray the daily life and struggles of Ukrainian villagers.",
    "cover": "https://m.media-amazon.com/images/I/9183vWakGaL._AC_UF1000,1000_QL80_.jpg"
},
];
  
  let synth = window.speechSynthesis;
  let utterance;
  let isSpeaking = false;
  let selectedVoice;
  
  function initializeVoice() {
    const voices = synth.getVoices();
    selectedVoice = voices.find(voice => voice.lang === 'en-US' && voice.name.includes('Google'));
    if (!selectedVoice) {
      selectedVoice = voices.find(voice => voice.lang === 'en-US') || voices.find(voice => voice.lang.startsWith('en'));
    }
  }
  
  if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = initializeVoice;
  }
  
  function displayCatalog() {
    const catalog = document.getElementById("catalog");
    books.forEach(book => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img src="${book.cover}" alt="Обложка книги ${book.id}">
        <h3>${book.title}</h3>
        <p>Автор: ${book.author}</p>
      `;
      card.addEventListener("click", () => openModal(book));
      catalog.appendChild(card);
    });
  }
  
  function openModal(book) {
    document.getElementById("bookTitle").textContent = book.title;
    document.getElementById("bookAuthor").textContent = book.author;
    document.getElementById("bookContent").textContent = book.content;
    document.getElementById("bookCover").src = book.cover;
    document.getElementById("modal").style.display = "flex";
  }
  
  document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("modal").style.display = "none";
    stopAudio();
  });
  
  document.getElementById("audioButton").addEventListener("click", toggleAudio);
  
  function toggleAudio() {
    const text = document.getElementById("bookContent").textContent;
    
    if (isSpeaking) {
      stopAudio();
    } else {
      speakText(text);
    }
  }
  
  function speakText(text) {
    if (synth.speaking) {
      synth.cancel();
    }
    utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;
    utterance.lang = selectedVoice ? selectedVoice.lang : 'en-US';
    synth.speak(utterance);
    
    utterance.onstart = () => { 
      isSpeaking = true; 
      document.getElementById("audioButton").textContent = "Зупинити аудіо";
    };
    
    utterance.onend = () => { 
      isSpeaking = false; 
      document.getElementById("audioButton").textContent = "Слухати аудіо";
    };
  }
  
  function stopAudio() {
    if (synth.speaking) {
      synth.cancel();
      isSpeaking = false;
      document.getElementById("audioButton").textContent = "Слухати аудіо";
    }
  }
  
  window.onload = () => {
    displayCatalog();
    initializeVoice();
  };