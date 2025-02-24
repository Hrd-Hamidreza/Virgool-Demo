//! ----------------------------------------------- Import
import axios from "axios";
import { url } from "../../../../Utils/Options";
import { RenderingDirectoriesdata } from "../RenderingDirectoriesdata/RenderingDirectoriesdata";
import { App } from "../../../../App";
import { Toast } from "../../../../Utils/Toast";
import { Loading } from "../../../../Utils/Loading";
//! ----------------------------------------------- RenderDirectory
export class GettingDirectoriesData {
  constructor() {
    this.myQuotes = [];
  }
  //? ----------------------- Fetch Items
  async fetchItems(writeFetchBool) {
    try {
      if (this.myQuotes.length === 1) {
        writeFetchBool = true;
      }
      if (writeFetchBool !== true && this.myQuotes.length > 0) {
        return this.myQuotes;
      } else if (writeFetchBool === true || this.myQuotes.length === 0) {
        //Todo ----------------------- Fetch Data Conditions
        const { data: response } = await axios.get(`${url}/myquotes`);
        if (response.status === "success") {
          this.myQuotes = response.quotes.map(
            (quotes) => new RenderingDirectoriesdata(quotes)
          );
          //! ----------------------- Return
          return this.myQuotes;
        } else {
          return false;
        }
      }
      //Todo ----------------------- End
    } catch (error) {
      console.error(error);
    }
  }
  //? ----------------------- Fetch Publishing Post
  async fetchPublishPost(id) {
    try {
      //Todo ----------------------- show Loading
      Loading.showLoading();
      //Todo ----------------------- Fetch
      const { data: response } = await axios.put(`${url}/quotes/${id}`);
      //Todo ----------------------- Toast
      new Toast().success("پست شما با موفقیت منتشر شد");
      //Todo ----------------------- Hide Loading
      Loading.hideLoading();
      //Todo ----------------------- Call
      //! ----------------------- Set Bool Amount
      const welcome = document.getElementById("welcome");
      welcome.setAttribute("data-write-bool", true);
      App.getRouter().navigateTo("profile");
      //Todo ----------------------- Bool
      return true;
    } catch (error) {
      console.error(error);
    }
  }
  //? ----------------------- Fetch Deleting Post
  async fetchDeletingPost(id, confirm) {
    try {
      if (confirm === true) {
        //Todo ----------------------- Show Loading
        Loading.showLoading();
        //Todo ----------------------- Fetch
        const { data: response } = await axios.delete(`${url}/quotes/${id}`);
        //Todo ----------------------- Show Loading
        Loading.hideLoading();
        //! ----------------------- Set Bool Amount
        const welcome = document.getElementById("welcome");
        welcome.setAttribute("data-write-bool", true);
        App.getRouter().navigateTo("profile");
        //Todo ----------------------- Result
        if (response.status === "OK") {
          new Toast().success("پست مورد نظر با موفقیت حذف شد");
          return true;
        } else {
          new Toast().failure("عملیات حذف نا موفق");
          return false;
        }
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  }
}
