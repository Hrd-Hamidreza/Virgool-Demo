//! ----------------------------------------------- Import
import axios from "axios";
import { url } from "../../../../Utils/Options";
import { Toast } from "../../../../Utils/Toast";
import { App } from "../../../../App";
import { Loading } from "../../../../Utils/Loading";
//! ----------------------------------------------- Fetching Article
export class FetchingArticle {
  constructor() {
    this.tagsArray = [];
    this.titleInput;
    this.description;
    this.tags;
    this.range;
    this.categories;
    this.getIdattr;
    this.inputImage;
    this.event;
  }
  //? ----------------------- Click Publish Btn
  publishClick() {
    document
      .getElementById("submit-post")
      .addEventListener("click", this.elementsPath.bind(this));
  }
  //? ----------------------- Elements
  elementsPath(event) {
    this.event = event;
    //Todo ------------ Tags Title
    this.titleInput = document.getElementById("subject__Text");
    //Todo ------------ Tags Description
    this.description = document.querySelector(".ck-content");
    //Todo ------------ Tags
    this.tagsArray = [];
    const tags = document.querySelectorAll(".tags-block-list--item > span");
    tags.forEach((element) => {
      this.tagsArray.push(element.innerHTML);
    });
    //Todo ------------ categories
    this.categories = document.getElementById("category-post");
    this.getIdattr = this.categories.value;
    //Todo ------------ Range
    this.range = document.getElementById("rangeInput");
    //Todo ------------ Image
    this.inputImage = document.getElementById("file-input"); //! must included
    //Todo ------------ Call And Empty ( UL )
    const emptyLine = document.getElementById("emptyHiddenSection");
    emptyLine.innerHTML = "";
    if (!this.getIdattr || !this.inputImage.value) {
      this.conditionsFunction(emptyLine);
    } else {
      //Todo ------------ Handle Click Pausing
      this.handleClickPausing();
      //Todo ------------ Fetching Data
      this.fetchingData();
    }
  }
  //? ----------------------- Conditions & Function
  conditionsFunction(emptyLine) {
    //Todo ------------ Empty Array
    const errorsArray = [];
    //Todo ------------ Function
    const funcy = function (text, text2 = null) {
      if (text2) {
        errorsArray.push(text, text2);
      } else {
        errorsArray.push(text);
      }
      errorsArray.forEach((element) => {
        const newLi = document.createElement("li");
        newLi.classList.add("stuRegister__error");
        newLi.style.fontSize = "1.5rem";
        newLi.innerHTML = element;
        emptyLine.append(newLi);
      });
    };
    //Todo ------------ Conditions
    if (!this.getIdattr && !this.inputImage.value) {
      const text1 = "لطفا دسته بندی را مشخص کنید";
      const text12 = "لطفا عکس مناسب بارگذاری کنید";
      funcy(text1, text12);
    } else if (!this.getIdattr) {
      const text2 = "لطفا دسته بندی را مشخص کنید";
      funcy(text2);
    } else {
      const text3 = "لطفا عکس مناسب بارگذاری کنید";
      funcy(text3);
    }
  }
  //? ----------------------- Fetching Data
  async fetchingData() {
    try {
      //Todo ------------ Form Data
      const formData = new FormData();
      //! ------ title
      formData.append("title", this.titleInput.value);
      //! ------ description
      formData.append("description", this.description.innerHTML);
      //! ------ categoryId
      formData.append("categoryId", this.getIdattr);
      //! ------ Tags
      formData.append("tags", this.tagsArray);
      //! ------ timeread
      formData.append("timeread", this.range.value);
      //! ------ Image
      formData.append("image", this.inputImage.files[0], this.inputImage.value);
      //Todo ------------ Fetch
      //! ------ Loading
      Loading.showLoading();
      //! ------ Fetching
      const { data: response } = await axios.post(`${url}/quotes`, formData);
      //Todo ------------ Call status Show
      this.statusShow(response);
      //Todo ------------ Return
    } catch (error) {
      console.error(error);
    }
  }
  //? ----------------------- Status Show
  statusShow(response) {
    //! ----------------------- Set Bool Amount
    const welcome = document.getElementById("welcome");
    welcome.setAttribute("data-write-bool", true);
    App.getRouter().navigateTo("profile");
    //! -----------------------
    Loading.hideLoading();
    if (response.status === "ok") {
      new Toast().success("انتشار با موفقیت انجام شد");
    } else {
      new Toast().failure("پست مورد نظر منتشر نشد");
      alert(response.message);
    }
  }
  //? ----------------------- Handle Click pausing
  handleClickPausing() {
    this.event.target.disabled = true;
  }
}
