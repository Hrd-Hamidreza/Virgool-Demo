//Todo ----------------------------------------------- Start OOP
import { App } from "../App";
import { Loading } from "../Utils/Loading";
//! ----------------------------------------------- Page
export class Page {
  constructor(targetName, urlName) {
    this.targetName = targetName;
    this.urlName = urlName;
  }
  //? ----------------------- renderContent
  renderContent(main) {
    //Todo ----------------------- Login Condition (If user hasn't entered so far)
    if (
      this.mustBeLogged() &&
      !App.getTokenCode().currentConditionsBoolean() &&
      this.targetName !== "verify"
    ) {
      App.getRouter().navigateTo("login");
      return;
    }
    //Todo ----------------------- Login Condition (If user has entered once)
    if (
      this.loginRestricted() &&
      App.getTokenCode().currentConditionsBoolean()
    ) {
      App.getRouter().navigateTo("profile");
      return;
    }
    //Todo ----------------------- Main
    Loading.showLoading();
    const container = document.getElementById("container");
    fetch(`./pages/${this.urlName}`)
      .then((response) => response.text())
      .then((html) => {
        return this.beforeRendering(html, main);
      })
      .then((result) => {
        if (result) {
          container.innerHTML = result;
          this.afterRendering();
        } else {
          this.catch();
        }
        Loading.hideLoading();
      })
      .catch((error) => {
        Loading.hideLoading();
        if (navigator.onLine) {
          alert(`You bumped into some errors named : ${error}`);
        } else {
          alert("Check Your internet connection");
        }
      });
  }
  //? ----------------------- beforeRendering
  beforeRendering(html) {
    return html;
  }
  //? ----------------------- afterRendering
  afterRendering() {
    console.log("Default Rendering");
  }
  //? ----------------------- Must Be Logged || Default(False)
  mustBeLogged() {
    return false;
  }
  //? ----------------------- Login Restricted || Default(False)
  loginRestricted() {
    return false;
  }
}
