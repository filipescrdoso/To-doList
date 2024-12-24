const menuButton = document.getElementById("menu-button");
const menu = document.getElementById("menu");
const navBar = document.getElementById("nav-bar");

menuButton.addEventListener('click', () => {
    menu.style.display === "none" ? menu.style.display = "flex" : menu.style.display = "none";
    menu.style.display === "none" ? navBar.style.display = "flex": navBar.style.display = "block";
})