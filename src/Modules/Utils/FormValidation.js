//! ----------------------------------------------- Import
import axios from "axios";
import { url } from "./Options";
import { App } from "../App";
import { Toast } from "./Toast";
//! ----------------------------------------------- FormValidation
export class FormValidation {
  constructor() {
    this.myObj = {};
    this.registerElm = document.getElementById("register-btn");
    this.formRegisterElm = document.getElementById("form-register");
    this.inputs = document.querySelectorAll(".stuRegister__Input");
    //! Individual Inputs
    this.name = document.getElementById("register-name");
    this.email = document.getElementById("register-email");
    this.phone = document.getElementById("register-phone");
    this.password = document.getElementById("register-password");
    this.rePassword = document.getElementById("register-repassword");
    this.errorEmpty = document.getElementById("errors-empty");
    this.orange = document.getElementById("firstCol");
    this.errorEle = document.querySelectorAll(".removingInnerElm");
    this.emptyClass = document.querySelectorAll(".empty");
    this.changingColor();
  }
  //? ----------------------- submit
  submit() {
    //! ------------ Click
    this.registerElm.addEventListener(
      "click",
      this.validableConditions.bind(this)
    );
    //! ------------
  }
  //? ----------------------- validableConditions
  validableConditions() {
    //todo ------------------
    const containerElements = {
      name: document.getElementById("errors-name"),
      email: document.getElementById("errors-email"),
      phone: document.getElementById("errors-phone"),
      password: document.getElementById("errors-password"),
      password_repeat: document.getElementById("errors-rePassword"),
    };
    //todo ------------------
    this.myObj = {};
    this.inputs.forEach((input) => {
      if (input.value.trim() == "") {
        const name = input.getAttribute("data-title");
        this.myObj[input.getAttribute("name")] = `فیلد ${name} نباید خالی باشد`;
      }
    });
    //todo ------------------
    //todo ------------------
    this.emptyClass.forEach((event) => (event.innerHTML = ""));
    if (+Object.keys(this.myObj).length > 0) {
      this.showErrors(containerElements);
    } else {
      this.submitInfo();
    }
  }
  //? ----------------------- submitInfo
  async submitInfo() {
    //! --------
    const formData = new FormData();
    formData.append("email", this.email.value);
    formData.append("name", this.name.value);
    formData.append("phone", this.phone.value);
    formData.append("password", this.password.value);
    const { data: response } = await axios.post(`${url}/register`, formData);
    if (response.status === "ok") {
      new Toast().success(response.message);
      this.verifyPage(this.email.value);
    } else {
      new Toast().failure("عدم صحت اطلاعات");
      this.getProblems(response.errors);
    }
  }
  //? ----------------------- VerifyPage
  verifyPage(email) {
    //! ------------ email
    localStorage.setItem("Email", email);
    //! ------------ Page
    App.getRouter().navigateTo("verify");
    //! ------------ message
  }
  //? ----------------------- getProblems
  getProblems(error) {
    //todo ------------------ Object
    const containerElements = {
      email: document.getElementById("errors-email"),
      name: document.getElementById("errors-name"),
      phone: document.getElementById("errors-phone"),
      password: document.getElementById("errors-rePassword"),
    };
    //todo ------------------ Loop
    for (const field in error) {
      const element = containerElements[field];
      element.innerHTML = "";
      for (const indi of error[field]) {
        //Todo -------- Password Comparison Condition
        if (this.password.value != this.rePassword.value) {
          containerElements["password"].innerHTML = "";
          const newLi = document.createElement("li");
          newLi.innerHTML = `پسوردها با یکدیگر مغایرت دارند`;
          newLi.classList.add("stuRegister__error");
          containerElements["password"].append(newLi);
        }
        element.innerHTML = "";
        //Todo -------- General
        const newLi = document.createElement("li");
        newLi.innerHTML = indi;
        newLi.classList.add("stuRegister__error");
        element.append(newLi);
      }
    }
    //todo ------------------ Return
    return;
  }
  //? ----------------------- showErrors
  showErrors(containerElements) {
    //todo ------------------
    for (const pro in this.myObj) {
      const element = containerElements[pro];
      const newLi = document.createElement("li");
      newLi.classList.add("stuRegister__error");
      newLi.innerHTML = this.myObj[pro];
      element.append(newLi);
      //todo ------------------
    }
  }
  //? ----------------------- changingColor
  changingColor() {
    //! ------------------
    this.inputs.forEach((a) => {
      a.addEventListener("keyup", (event) => {
        //! ------------------
        if (event.key && event.key !== " " && a.value !== " ") {
          this.orange.style.backgroundColor = "#ffb74d";
          this.orange.firstElementChild.style.color = "black";
          if (event.key === "Backspace" && a.value == false) {
            this.orange.style.backgroundColor = "transparent";
            this.orange.firstElementChild.style.color = "white";
          }
        }
      });
    });
  }
}
