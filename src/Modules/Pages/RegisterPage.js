//! ----------------------------------------------- Import
import { Page } from "../Models/Page.js";
import { FormValidation } from "../Utils/FormValidation.js";
//! ----------------------------------------------- Home Page
export class RegisterPage extends Page {
  //? ----------------------- afterRendering
  afterRendering() {
    //! ------------
    new FormValidation().submit();
    //! ------------
  }
  //? ----------------------- Login Restricted
  loginRestricted() {
    return true;
  }
}
