// =====================================================
// GREENBOT - PART 1
// Chat Window, Messages & Typing Animation
// =====================================================

// ---------- Conversation Memory ----------

let currentTree = null;

// ---------- HTML Elements ----------

const chatBtn = document.getElementById("chatBtn");
const chatWindow = document.getElementById("chatWindow");
const closeChat = document.getElementById("closeChat");

const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatMessages = document.getElementById("chatMessages");

// ---------- Safety Check ----------

if (
    !chatBtn ||
    !chatWindow ||
    !closeChat ||
    !sendBtn ||
    !userInput ||
    !chatMessages
) {
    console.error("GreenBot: Required HTML elements not found.");
}

// ---------- Open Chat ----------

chatBtn.addEventListener("click", function () {

    chatWindow.style.display = "block";

});

// ---------- Close Chat ----------

closeChat.addEventListener("click", function () {

    chatWindow.style.display = "none";

});

// ---------- Scroll to Bottom ----------

function scrollChat() {

    chatMessages.scrollTop = chatMessages.scrollHeight;

}

// ---------- Add User Message ----------

function addUserMessage(message) {

    chatMessages.innerHTML += `
        <div class="user">
            ${message}
        </div>
    `;

    scrollChat();

}

// ---------- Add Bot Message ----------

function addBotMessage(message) {

    chatMessages.innerHTML += `
        <div class="bot">
            ${message}
        </div>
    `;

    scrollChat();

}

// ---------- Typing Animation ----------

function showTyping() {

    removeTyping();

    chatMessages.innerHTML += `
        <div class="bot" id="typing">
            🌿 GreenBot is typing...
        </div>
    `;

    scrollChat();

}

function removeTyping() {

    const typing = document.getElementById("typing");

    if (typing) {

        typing.remove();

    }

}

// ---------- Send Message ----------

function sendMessage() {

    const message = userInput.value.trim();

    if (message === "") {

        return;

    }

    addUserMessage(message);

    userInput.value = "";

    showTyping();

    setTimeout(function () {

        removeTyping();

        getBotReply(message);

    }, 700);

}

// ---------- Send Button ----------

sendBtn.addEventListener("click", sendMessage);

// ---------- Enter Key ----------

userInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        event.preventDefault();

        sendMessage();

    }

});
// =====================================================
// GREENBOT - PART 2
// Tree Database & Smart Reply System
// =====================================================

// ---------- Search Tree Database ----------

function searchTree(question) {

    question = question.toLowerCase();

    for (const tree of treeDatabase) {

        for (const keyword of tree.keywords) {

            if (question.includes(keyword.toLowerCase())) {

                currentTree = tree;

                return tree;

            }

        }

    }

    return null;

}

// ---------- Main Reply Function ----------

function getBotReply(question) {

    question = question.toLowerCase();

    // ==========================
    // Search Tree Database
    // ==========================

    const tree = searchTree(question);

    if (tree) {

        addBotMessage(

`🌳 <b>${tree.name}</b><br><br>

<b>Scientific Name:</b> ${tree.scientificName}<br>

<b>Uses:</b> ${tree.uses}<br>

<b>Sunlight:</b> ${tree.sunlight}<br>

<b>Watering:</b> ${tree.watering}<br>

<b>Soil:</b> ${tree.soil}<br>

<b>Growth:</b> ${tree.growth}<br>

<b>Height:</b> ${tree.height}<br>

<b>Lifespan:</b> ${tree.lifespan}`

        );

        return;

    }

    // ==========================
    // Conversation Memory
    // ==========================

    if (currentTree) {

        if (
            question.includes("water") ||
            question.includes("watering")
        ) {

            addBotMessage("💧 " + currentTree.watering);

            return;

        }

        if (
            question.includes("soil")
        ) {

            addBotMessage("🌱 " + currentTree.soil);

            return;

        }

        if (
            question.includes("sun") ||
            question.includes("sunlight")
        ) {

            addBotMessage("☀ " + currentTree.sunlight);

            return;

        }

        if (
            question.includes("height") ||
            question.includes("tall")
        ) {

            addBotMessage("📏 " + currentTree.height);

            return;

        }

        if (
            question.includes("growth") ||
            question.includes("grow")
        ) {

            addBotMessage("🌿 " + currentTree.growth);

            return;

        }

        if (
            question.includes("use") ||
            question.includes("benefit")
        ) {

            addBotMessage("🌳 " + currentTree.uses);

            return;

        }

        if (
            question.includes("life") ||
            question.includes("age")
        ) {

            addBotMessage("🌱 " + currentTree.lifespan);

            return;

        }

    }

    // ==========================
    // Continue to Knowledge Base
    // (Added in Part 3)
    // ==========================

    searchKnowledgeBase(question);

}
// =====================================================
// GREENBOT - PART 3
// Knowledge Base
// =====================================================

const knowledgeBase = [

{
keywords:[
"hello",
"hi",
"hey",
"good morning",
"good afternoon",
"good evening"
],

answer:
"👋 Hello! I'm <b>GreenBot</b>, the virtual assistant of <b>The Tree Guardians</b>. How can I help you today?"
},

{
keywords:[
"who are you",
"your name",
"greenbot"
],

answer:
"I'm 🌿 <b>GreenBot</b>, the official virtual assistant of <b>The Tree Guardians</b>. I can answer questions about trees, plantation, climate change and our organization."
},

{
keywords:[
"tree guardians",
"organization",
"about"
],

answer:
"The Tree Guardians is an environmental organization dedicated to planting trees, protecting biodiversity, spreading awareness, and inspiring communities to create a greener future."
},

{
keywords:[
"mission",
"vision",
"goal",
"purpose"
],

answer:
"Our mission is to build a greener and healthier planet by planting trees, conserving nature, and encouraging every individual to become a guardian of the Earth."
},

{
keywords:[
"join",
"membership",
"member"
],

answer:
"You can become a Tree Guardian by filling out the Join form on our website. Every member receives a digital membership card and joins our green community."
},

{
keywords:[
"benefits of trees",
"importance of trees",
"why plant trees"
],

answer:
"🌳 Trees produce oxygen, absorb carbon dioxide, reduce pollution, prevent soil erosion, provide shade, improve biodiversity, and help fight climate change."
},

{
keywords:[
"climate change",
"global warming"
],

answer:
"Climate change is mainly caused by greenhouse gases released through human activities. Planting trees helps absorb carbon dioxide and reduce global warming."
},

{
keywords:[
"oxygen"
],

answer:
"Trees release oxygen during photosynthesis, making them essential for life on Earth."
},

{
keywords:[
"pollution"
],

answer:
"Trees naturally filter dust and harmful gases, helping improve air quality and reduce pollution."
},

{
keywords:[
"thank you",
"thanks"
],

answer:
"😊 You're welcome! Together we can make Earth greener, one tree at a time."
}

];

// =====================================================
// KNOWLEDGE BASE SEARCH
// =====================================================

function searchKnowledgeBase(question){

    let bestScore = 0;
    let bestAnswer = "";

    for(const topic of knowledgeBase){

        let score = 0;

        for(const keyword of topic.keywords){

            if(question.includes(keyword.toLowerCase())){

                score++;

            }

        }

        if(score > bestScore){

            bestScore = score;
            bestAnswer = topic.answer;

        }

    }

    if(bestScore > 0){

        addBotMessage(bestAnswer);

    }else{

        addBotMessage(
`😔 Sorry, I don't know the answer yet.`
);

showSuggestions();
    }

}
// =====================================================
// GREENBOT - PART 4
// Extra Features
// =====================================================

// ---------- Welcome Messages ----------

const welcomeMessages = [

    "🌱 Every tree planted today creates a better tomorrow.",

    "🌍 Welcome! Together let's make Earth greener.",

    "🌳 Plant a tree, protect the future.",

    "💚 Small actions create big environmental changes."

];

// ---------- Random Welcome ----------

let welcomeShown = false;

function showRandomWelcome(){

    const random = Math.floor(Math.random() * welcomeMessages.length);

    addBotMessage(welcomeMessages[random]);

}

chatBtn.addEventListener("click",function(){

    if(!welcomeShown){

        setTimeout(showRandomWelcome,500);

        welcomeShown = true;

    }

});

// ---------- Suggested Questions ----------

const suggestions = [

    "Tell me about Neem",

    "Tell me about Peepal",

    "Tell me about Banyan",

    "Why should we plant trees?",

    "What is climate change?",

    "Benefits of trees"

];

function showSuggestions(){

    let html = "<div class='bot'><b>💡 Try asking:</b><br><br>";

    suggestions.forEach(function(question){

        html += "• " + question + "<br>";

    });

    html += "</div>";

    chatMessages.innerHTML += html;

    scrollChat();

}

// ---------- Clear Chat ----------

function clearChat(){

    chatMessages.innerHTML =

`<div class="bot">

👋 Hello! I'm <b>GreenBot</b>.

<br><br>

Ask me anything about

<br><br>

🌳 Tree Plantation

<br>

🌍 Environment

<br>

🌱 Tree Care

<br>

🤝 The Tree Guardians

</div>`;

    welcomeShown = false;

}

// Ctrl + Delete

document.addEventListener("keydown",function(e){

    if(e.ctrlKey && e.key==="Delete"){

        clearChat();

    }

});

// ---------- Console ----------

console.log(

"%c🌿 GreenBot Loaded Successfully",

"color:green;font-size:18px;font-weight:bold;"

);