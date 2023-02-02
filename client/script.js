import {Bot, User} from "./assets/index.js";

const form = document.querySelector("form");
const chatContainer = document.querySelector("#chat_container");

let loadInterval;

function loader(element) {
   element.textContent = "";

   loadInterval = setInterval(() => {
      element.textContent += ".";

      if (element.textContent.length === "....") {
         element.textContent = "";
      }
   }, 300);
}

function typeText(element, text) {
   let index = 0;
   let interval = setInterval(() => {
      if (index < text.length) {
         element.innerHeight += text.charAt(index);
         index++;
      } else {
         clearInterval(interval);
      }
   }, 20)
}

function generateUniqueId() {
   const timestamp = Date.now()
   const random = Math.random()
   const hexSting = random.toString(16)

   return `id-${timestamp}-${hexSting}`;
}

function chatStripe(isAi, value, uniqueId) {
   return (`
           <div class="wrapper ${isAi && 'ai'}">
              <div class="chat">
                  <div class="profile">
                    <img src="${isAi ? Bot : User}" alt="${isAi ? "Bot" : "User"}"/>
                  </div>
                  <div class="message" id={uniqueId}>${value}</div>
              </div>
           </div>
   `)
}

const handleSubmit = async (e) => {
   e.preventDefault()
   const data = new FormData(form);
   // user's stripe
   chatContainer.innerHTML += chatStripe(false, data.get("prompt"));

   form.reset();

   // bot's stripe
   const uniqueId = generateUniqueId();
   chatContainer.innerHTML += chatStripe(true, " ", uniqueId);

   chatContainer.scrollTop = chatContainer.scrollHeight;
   const messageDiv = document.getElementById(uniqueId);
   loader(messageDiv);
}

form.addEventListener("submit", handleSubmit);
form.addEventListener("keyup",
   (e) => {
      if (e.keyCode === 13) {
         handleSubmit(e);
      }
   })
