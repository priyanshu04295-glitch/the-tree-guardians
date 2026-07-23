// =========================================
// THE TREE GUARDIANS
// script.js
// =========================================



// =========================================
// THEME
// =========================================

const themeBtn = document.getElementById("themeBtn");

if(themeBtn){

    themeBtn.onclick = function(){

        document.body.classList.toggle("dark");

        if(document.body.classList.contains("dark")){

            themeBtn.innerHTML="☀️";

            localStorage.setItem(
                "theme",
                "dark"
            );

        }

        else{

            themeBtn.innerHTML="🌙";

            localStorage.setItem(
                "theme",
                "light"
            );

        }

    };

}



window.onload=function(){

    if(localStorage.getItem("theme")==="dark"){

        document.body.classList.add("dark");

        if(themeBtn){

            themeBtn.innerHTML="☀️";

        }

    }

};




// =========================================
// JOURNEY COUNTER
// =========================================

const treeCounter=document.getElementById("trees");

const peopleCounter=document.getElementById("people");

let trees=0;

let people=0;

function startCounter(){

    if(treeCounter && trees<10){

        trees++;

        treeCounter.innerHTML=trees+"+";

    }

    if(peopleCounter && people<50){

        people++;

        peopleCounter.innerHTML=people+"+";

    }

}

setInterval(startCounter,120);




// =========================================
// JOIN FORM
// =========================================

const joinForm=document.getElementById("joinForm");

if(joinForm){

joinForm.addEventListener(

"submit",

function(e){

e.preventDefault();



// Read Form

const name=document.getElementById("name").value;

const age=document.getElementById("age").value;

const location=document.getElementById("location").value;

const email=document.getElementById("email").value;

const tree=document.getElementById("tree").value;

const message=document.getElementById("message").value;



// Membership Number

let memberNumber=localStorage.getItem("memberNumber");

if(memberNumber==null){

memberNumber=1;

}

else{

memberNumber=parseInt(memberNumber)+1;

}

localStorage.setItem(

"memberNumber",

memberNumber

);



// Membership ID

const membershipID=

"TG-2026-"+

String(memberNumber).padStart(4,"0");



// Joining Date

const today=new Date();

const memberSince=today.toLocaleDateString(

"en-GB",

{

day:"2-digit",

month:"long",

year:"numeric"

}

);



// Fill Membership Card

document.getElementById("cardID").innerHTML=

membershipID;

document.getElementById("cardName").innerHTML=

name;

document.getElementById("cardAge").innerHTML=

age;

document.getElementById("cardLocation").innerHTML=

location;

document.getElementById("cardDate").innerHTML=

memberSince;

// Show Membership Card

const card=document.getElementById("membershipCard");

card.style.display="block";



// Download Membership Card

setTimeout(function(){

html2canvas(card,{

scale:3,

backgroundColor:null

})

.then(function(canvas){

const link=document.createElement("a");

link.download=membershipID+".png";

link.href=canvas.toDataURL("image/png");

link.click();

card.style.display="none";

document.getElementById("successPopup").style.display="flex";

joinForm.reset();

});

},500);



}

);

}




// =========================================
// GREEN PLEDGE
// =========================================

const buttons=document.querySelectorAll(".btn");

buttons.forEach(function(button){

button.addEventListener(

"click",

function(){

if(button.innerHTML.includes("Pledge")){

alert(

"🌎 Congratulations!\n\nYou have officially taken the Green Guardian Pledge.\n\nTogether, we can protect nature and build a greener future. 🌳"

);

}

}

);

});




// =========================================
// FALLING LEAVES ANIMATION
// =========================================

function createLeaf(){

const leaf=document.createElement("div");

leaf.innerHTML="🍃";

leaf.style.position="fixed";

leaf.style.top="-30px";

leaf.style.left=Math.random()*100+"vw";

leaf.style.fontSize="25px";

leaf.style.pointerEvents="none";

leaf.style.zIndex="999";

leaf.style.animation="leafFall 6s linear";

document.body.appendChild(leaf);

setTimeout(function(){

leaf.remove();

},6000);

}

setInterval(createLeaf,2000);




// =========================================
// LEAF ANIMATION STYLE
// =========================================

const style=document.createElement("style");

style.innerHTML=`

@keyframes leafFall{

0%{

transform:translateY(0) rotate(0deg);

opacity:1;

}

100%{

transform:translateY(110vh) rotate(360deg);

opacity:0;

}

}

`;

document.head.appendChild(style);




// =========================================
// RANDOM ENVIRONMENTAL FACTS
// =========================================

const facts=[

"🌳 Trees absorb carbon dioxide and release oxygen.",

"🌍 One mature tree can absorb about 22 kg of CO₂ every year.",

"💧 Forests help recharge groundwater and protect rivers.",

"🐦 Trees provide habitat for thousands of species.",

"🌱 Planting native trees supports local biodiversity.",

"♻ Reducing plastic waste protects both land and oceans.",

"🌿 Every Tree Guardian contributes to a greener future."

];

setInterval(function(){

const random=Math.floor(

Math.random()*facts.length

);

console.log(facts[random]);

},5000);




// =========================================
// WEBSITE LOADED
// =========================================

console.log(

"🌳 The Tree Guardians website loaded successfully."

);
// ======================================
// PART 3 - PROFESSIONAL FEATURES
// ======================================



// Prevent Double Submission

let submitted = false;



// Success Popup

const popup = document.getElementById("successPopup");
const closePopup = document.getElementById("closePopup");

if (closePopup) {

    closePopup.onclick = function () {

        popup.style.display = "none";

    };

}



// Show Success Popup

function showSuccessPopup() {

    if (popup) {

        popup.style.display = "flex";

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }

}



// Form Validation

function validateForm(name, age, location, email, message) {

    if (name.trim() === "") {

        alert("Please enter your full name.");

        return false;

    }

    if (age === "" || age < 5 || age > 120) {

        alert("Please enter a valid age.");

        return false;

    }

    if (location.trim() === "") {

        alert("Please enter your location.");

        return false;

    }

    if (email.trim() === "") {

        alert("Please enter your email address.");

        return false;

    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;

    if (!emailPattern.test(email)) {

        alert("Please enter a valid email address.");

        return false;

    }

    if (message.trim().length < 20) {

        alert("Please write a little more about your environmental commitment.");

        return false;

    }

    return true;

}



// Download Membership Card

function downloadMembershipCard(card, membershipID) {

    html2canvas(card, {

        scale: 3,

        backgroundColor: "#ffffff"

    }).then(function (canvas) {

        const link = document.createElement("a");

        link.download = membershipID + ".png";

        link.href = canvas.toDataURL("image/png");

        link.click();

        card.style.display = "none";

        showSuccessPopup();

    });

}



// Random Welcome Quotes

const welcomeQuotes = [

    "🌳 Every tree planted today creates hope for tomorrow.",

    "🌍 Together we can restore nature, one tree at a time.",

    "💚 Thank you for becoming a guardian of our planet.",

    "🌱 Small actions create extraordinary forests.",

    "🍃 Nature grows stronger because of people like you."

];



function showRandomQuote() {

    const random = Math.floor(

        Math.random() * welcomeQuotes.length

    );

    console.log(welcomeQuotes[random]);

}



// Run every 10 seconds

setInterval(showRandomQuote,10000);



// Welcome Message

console.log("===================================");

console.log("🌳 THE TREE GUARDIANS");

console.log("Plant • Protect • Prosper");

console.log("Website Loaded Successfully");

console.log("===================================");



// Utility Function

function getTodayDate(){

    const today = new Date();

    return today.toLocaleDateString(

        "en-GB",

        {

            day:"2-digit",

            month:"long",

            year:"numeric"

        }

    );

}



// Generate Membership Number

function generateMembershipID(){

    let memberNumber =

    localStorage.getItem("memberNumber");



    if(memberNumber == null){

        memberNumber = 1;

    }

    else{

        memberNumber =

        parseInt(memberNumber)+1;

    }



    localStorage.setItem(

        "memberNumber",

        memberNumber

    );



    return "TG-2026-"+

    String(memberNumber).padStart(4,"0");

}



// Environmental Greeting

function welcomeGuardian(name){

    console.log(

        "🌱 Welcome "+name+

        " to The Tree Guardians!"

    );

}



// End of Part 3

console.log("Part 3 Loaded Successfully.");