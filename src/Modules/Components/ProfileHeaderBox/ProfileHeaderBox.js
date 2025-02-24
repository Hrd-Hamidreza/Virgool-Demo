//! ----------------------------------------------- Import
import { App } from "../../App";
//! ----------------------------------------------- Login Page
export class ProfileHeaderBox {
  constructor() {
    this.boxProfileBtn = document.querySelector(".account");
    this.hiddenBoxIcon = document.getElementById("hiddenBox");
    this.exit = document.getElementById("logOut");
    this.theme = document.getElementById("change-theme");
    this.handleClickProfile();
  }
  //? ----------------------- Click Profile
  handleClickProfile() {
    //! ----------------------- Add
    this.hiddenBoxIcon.addEventListener("click", () => {
      this.boxProfileBtn.classList.toggle("hidden");
    });
    //! ----------------------- Delete
    this.exit.addEventListener("click", this.deleteAccFromUp.bind(this));
    //! ----------------------- Theme
    this.theme.addEventListener("click", this.themeChanging.bind(this));
  }
  //? ----------------------- delete Acc From Up
  deleteAccFromUp() {
    App.getTokenCode().signOut();
  }
  //? ----------------------- Change Theme Color
  themeChanging() {
    App.getThemeDetails().themeChange();
  }
}
