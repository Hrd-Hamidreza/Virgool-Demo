//! ----------------------------------------------- Import
import axios from "axios";
import { url } from "./Options";
import { App } from "../App";
import { Toast } from "./Toast";
//! ----------------------------------------------- Login Validation
export class LoginValidation {
  constructor() {
    this.errorsObject = {};
    this.loginEmail = document.getElementById("login-email");
    this.loginPassword = document.getElementById("login-password");
    this.errorsEmpty = document.getElementById("errors-empty");
    this.emptyLogin = document.querySelectorAll(".emptyLogin");
    this.btnLog = document.getElementById("login-btn");
    this.loginInputs = document.querySelectorAll(".stuLogin-input");
  }
  //? ----------------------- getData
  submit() {
    this.btnLog.addEventListener("click", this.checking.bind(this));
    this.loginInputs.forEach((event, index) => {
      event.addEventListener("keypress", (a) => {
        if (a.key === "Enter" && index < this.loginInputs.length - 1) {
          a.preventDefault();
          this.loginInputs[index + 1].focus();
        }
      });
    });
  }
  //? ----------------------- showErrors
  checking() {
    //Todo ------------ empty Errors
    this.errorsObject = {};
    //Todo ------------ Setting Error(s) in Object
    this.loginInputs.forEach((input) => {
      if (!input.value.trim()) {
        const englishName = input.getAttribute("data-entitle");
        const persionName = input.getAttribute("data-fatitle");
        this.errorsObject[englishName] = `بخش ${persionName} نباید خالی باشد`;
      }
    });
    //Todo ------------ Empty Last Errors left
    this.emptyLogin.forEach((element) => {
      element.innerHTML = "";
    });
    //Todo ------------ sending Results to Render
    if (Object.keys(this.errorsObject).length > 0) {
      this.renderErrors();
    } else {
      this.fetchData();
    }
  }
  //? ----------------------- renderErrors
  renderErrors() {
    const objectDirections = {
      email: document.getElementById("errors-email"),
      password: document.getElementById("errors-password"),
    };
    for (const allErrors in this.errorsObject) {
      const newLi = document.createElement("li");
      newLi.classList.add("stuRegister__error");
      newLi.innerHTML = this.errorsObject[allErrors];
      objectDirections[allErrors].append(newLi);
    }
  }
  //? ----------------------- fetchData
  async fetchData() {
    try {
      //Todo ------------ FormData
      const formData = new FormData();
      formData.append("email", this.loginEmail.value);
      formData.append("password", this.loginPassword.value);
      //Todo ------------ Response
      const { data: response } = await axios.post(`${url}/login`, formData);
      if (response.status === "ok") {
        new Toast().success(response.message);
        const name = response.data.name;
        const token = response.data.token;
        App.getTokenCode().setLoginLocal(name, token);
        App.getRouter().navigateTo("profile");
      } else {
        new Toast().failure(response.message);
        const newLi = document.createElement("li");
        newLi.classList.add("stuRegister__error");
        newLi.innerHTML = response.message;
        this.errorsEmpty.append(newLi);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
