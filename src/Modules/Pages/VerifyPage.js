//! ------------------------------------------------------------------------ Import
import { Page } from "../Models/Page";
import { CodeFetching } from "../Services/Verify/Code/Data/CodeFetching";
//! ------------------------------------------------------------------------ Tag Page
export class VerifyPage extends Page {
  //? ----------------------- afterRendering
  afterRendering() {
    new CodeFetching().inputEvent();
  }
  //? ----------------------- Must Be Logged
  mustBeLogged() {
    return true;
  }
}
