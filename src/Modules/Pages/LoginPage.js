//! ----------------------------------------------- Import
import { Page } from "../Models/Page.js";
import { LoginValidation } from "../Utils/LoginValidation.js";
//! ----------------------------------------------- Login Page
export class LoginPage extends Page {
  //? ----------------------- After Rendering
  afterRendering() {
    //! ------------ Empty Email Data
    const delEmail = localStorage.getItem("Email");
    if (delEmail) {
      localStorage.removeItem("Email");
    }
    //! ------------ LoginValidation
    new LoginValidation().submit();
    //! ------------ Page Name
    console.log("Login Page");
  }
  //? ----------------------- Login Restricted
  loginRestricted() {
    return true;
  }
}
