// DOM items selection
const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");
const menuNav = document.querySelector(".menu-nav");
const menuBranding = document.querySelector(".menu-branding");
const navItems = document.querySelectorAll(".nav-item");

//initial menu state

let showMenu = false;

menuBtn.addEventListener("click", toggleMenu);
function toggleMenu() {
  if (!showMenu) {
    menuBtn.classList.add("close");
    menu.classList.add("show");
    menuNav.classList.add("show");
    menuBranding.classList.add("show");
    navItems.forEach(item => item.classList.add("show"));

    //set menu state
    showMenu = true;
  } else {
    menuBtn.classList.remove("close");
    menu.classList.remove("show");
    menuNav.classList.remove("show");
    menuBranding.classList.remove("show");
    navItems.forEach(item => item.classList.remove("show"));

    //resetting menu state
    showMenu = false;
  }
}

var list = document.getElementsByClassName("text__alternate");
var featuredText = document.querySelector(".text__featured");
var delayCount = list.length * 2.5;

// delay each alternate word 2.5s
for (var i = 0; i < list.length; i++) {
  list[i].style.animationDelay = i * 2.5 + "s";
}

// delay final word and underline
featuredText.style.animationDelay = delayCount + 1.5 + "s";
document.styleSheets[0].addRule(
  "span.text__featured::after",
  "animation-delay:" + (delayCount + 2) + "s;"
);
