//! ----------------------------------------------- Import
import { App } from "../../App";
//! ----------------------------------------------- Authorization Login
export class AuthorizationLogin {
  constructor() {
    this.name;
    this.token;
    this.getName;
    this.getEmail;
    this.activate = document.getElementById("login-activateId");
    this.NoActivate = document.getElementById("login-NoActivateId");
    this.userNameProfile = document.getElementById("name-userProfile");
    this.userName = document.getElementById("userNameBox");
    this.renderUserInfo();
  }
  //? ----------------------- SetLogin Local Storage
  setLoginLocal(name, token) {
    this.name = name;
    this.token = token;
    localStorage.setItem("Name", name);
    localStorage.setItem("Token", token);
    this.renderUserInfo();
  }
  //? ----------------------- Current Conditions Boolean
  currentConditionsBoolean() {
    this.getName = localStorage.getItem("Name");
    this.getEmail = localStorage.getItem("Token");
    if ((this.name && this.token) || (this.getName && this.getEmail)) {
      return true;
    } else {
      return false;
    }
  }
  //? ----------------------- Render User Info
  renderUserInfo() {
    if (this.currentConditionsBoolean()) {
      this.name = this.getName;
      //Todo ------------ Styles
      this.activate.classList.add("hidden");
      this.NoActivate.classList.remove("hidden");
      this.userNameProfile.innerHTML = this.name;
      //Todo ------------ Name
      this.userName.innerHTML = this.name;
    } else {
      //Todo ------------ Styles
      this.activate.classList.remove("hidden");
      this.NoActivate.classList.add("hidden");
    }
  }
  //? ----------------------- signOut
  signOut() {
    this.name = null;
    this.token = null;
    localStorage.removeItem("Name");
    localStorage.removeItem("Token");
    //Todo Styles
    this.activate = document.getElementById("login-activateId");
    this.NoActivate = document.getElementById("login-NoActivateId");
    this.activate.classList.remove("hidden");
    this.NoActivate.classList.add("hidden");
    // Todo Styles
    App.getRouter().navigateTo("home");
  }
}
