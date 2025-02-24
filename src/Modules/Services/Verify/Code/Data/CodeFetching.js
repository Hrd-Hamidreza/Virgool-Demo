//! ----------------------------------------------- Import
import axios from "axios";
import { url } from "../../../../Utils/Options";
import { App } from "../../../../App";
import { Toast } from "../../../../Utils/Toast";
//! ----------------------------------------------- Launched Class
export class CodeFetching {
  constructor() {
    this.otpInput = document.querySelectorAll(".otp-input");
    this.calArr = [];
    this.code = "";
  }

  //? ----------------------- InputEvent
  inputEvent() {
    this.otpInput.forEach((inputs, index) => {
      inputs.addEventListener("keyup", (event) => {
        this.getActivateCode(event, index);
      });
    });
  }

  //? ----------------------- getActivateCode
  getActivateCode(event, index) {
    this.calArr = [];
    event.target.value = event.target.value.slice(0, 1);
    if (event.key && event.key !== " ") {
      if (index < this.otpInput.length - 1 && event.key !== "Backspace") {
        this.otpInput[index + 1].focus();
      } else if (event.key === "Backspace" && index > 0) {
        this.otpInput[index - 1].focus();
      }
      this.otpInput.forEach((inputs) => {
        if (inputs.value !== "") {
          this.calArr.push(inputs.value);
        }
      });
      if (this.calArr.length === this.otpInput.length) {
        this.calculateCode();
      }
    }
  }

  //? ----------------------- Calculate Code
  calculateCode() {
    this.code = "";
    this.otpInput.forEach((input) => {
      this.code += input.value;
    });
    this.sendData(this.code);
  }

  //? ----------------------- sendData
  async sendData(code) {
    try {
      //Todo ------------ Get Email
      const email = localStorage.getItem("Email");
      //Todo ------------ Options
      const formData = new FormData();
      formData.append("otp", code);
      formData.append("email", email);
      //Todo ------------ code Fetch (Axios)
      const { data: response } = await axios.post(`${url}/otp`, formData);
      //Todo ------------ Condition
      if (response.status === "ok") {
        new Toast().success(response.message);
        this.changingColorResponse("#4db34d");
        App.getRouter().navigateTo("login");
      } else {
        new Toast().failure(response.message);
        this.changingColorResponse("#ff3333");
      }
      //Todo ------------
    } catch (error) {
      console.error(error);
    }
  }

  //? ----------------------- changing Color Response
  changingColorResponse(color) {
    this.otpInput.forEach((element) => {
      element.style.backgroundColor = color;
    });
  }
}
