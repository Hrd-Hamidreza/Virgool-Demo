//! ----------------------------------------------- Import
//! ----------------------------------------------- Login Page
export class ChangingTheme {
  constructor() {
    this.htmlTag = document.documentElement;
    this.dayTime = document.getElementById("name-theme");
    this.iconTime = document.getElementById("theme-icon");
    this.themeElm = document.getElementById("change-theme");
  }
  //? ----------------------- Theme Change
  themeChange() {
    //! ----------------------- Create Delay
    this.createDelay();
    //! ----------------------- Conditions
    const currentState = this.htmlTag.getAttribute("data-bs-theme");
    this.conditions(currentState);
    //! ----------------------- Conditions
    this.setLocalStorage();
  }
  //? ----------------------- Create Delay
  createDelay() {
    //! ----------------------- Delay
    this.themeElm.toggleAttribute("disabled");
    setTimeout(() => {
      this.themeElm.removeAttribute("disabled");
    }, 1500);
  }
  //? ----------------------- condition
  conditions(theme) {
    theme === "light" ? this.darkMode() : this.lightMode();
  }
  //? ----------------------- Dark Mode
  darkMode() {
    this.htmlTag.setAttribute("data-bs-theme", "dark");
    this.dayTime.innerHTML = "شب";
    this.iconTime.classList.replace("fa-sun", "fa-moon");
    this.themeElm.style.backgroundColor = "#778989";
  }
  //? ----------------------- Light Mode
  lightMode() {
    this.htmlTag.setAttribute("data-bs-theme", "light");
    this.dayTime.innerHTML = "روز";
    this.iconTime.classList.replace("fa-moon", "fa-sun");
    this.themeElm.style.backgroundColor = "#ffcc80";
  }
  //? ----------------------- Set Local Storage
  setLocalStorage() {
    const finalTheme = this.htmlTag.getAttribute("data-bs-theme");
    localStorage.setItem("Theme", finalTheme);
  }
  //? ----------------------- Get Local Storage
  getLocalStorage() {
    const lastTheme = localStorage.getItem("Theme");
    if (lastTheme) {
      if (lastTheme === "light") {
        this.conditions("dark");
      } else {
        this.conditions("light");
      }
    }
  }
}
