//! ----------------------------------------------- Import
import axios from "axios";
import { url } from "../../../../Utils/Options";
import { App } from "../../../../App";
import { Toast } from "../../../../Utils/Toast";
//! ----------------------------------------------- Home Page
export class FetchingSearch {
  constructor() {
    this.searchBox = document.getElementById("search");
    this.time = false;
    this.emptyCommand;
  }
  //? ----------------------- Click Search Box
  clickSearchBox() {
    this.searchBox.value = "";
    this.searchBox.addEventListener("keyup", (event) =>
      this.getSearchContent(event)
    );
  }
  //? ----------------------- Get Search Content
  getSearchContent(event) {
    if (this.searchBox.value.trim() !== "" && event.key) {
      if (this.emptyCommand === this.searchBox.value.length) {
        return;
      } else {
        if (this.time) {
          clearTimeout(this.time);
        }
        this.time = setTimeout(() => {
          this.fetchSearchInfo();
        }, 2000);
      }
      this.emptyCommand = this.searchBox.value.length;
    }
    if (event.key === "Backspace" || event.key === " ") {
      this.emptyCommand = "";
    }
  }
  //? ----------------------- Fetch Search Info
  async fetchSearchInfo() {
    try {
      //! ------------ Fetch
      const { data: response } = await axios.get(
        `${url}/quotes/search/${this.searchBox.value}`
      );
      if (response.quotes.length > 0 || response.users.length > 0) {
        App.getRouter().navigateTo("search", { searchResult: response });
      } else {
        new Toast().failure("برای عبارت جستجو شده نتیجه ای یافت نشد");
      }
      //! ------------ Empty
      this.searchBox.value = "";
    } catch (error) {
      console.error(error);
    }
  }
}
