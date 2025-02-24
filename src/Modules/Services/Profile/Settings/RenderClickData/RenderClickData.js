//! ----------------------------------------------- Import
import axios from "axios";
import { url } from "../../../../Utils/Options";
import { Toast } from "../../../../Utils/Toast";
import { Loading } from "../../../../Utils/Loading";
import { App } from "../../../../App";
//! ----------------------------------------------- Home Page
export class RenderClickData {
  constructor(userDataApi) {
    this.userDataApi = userDataApi;
    this.showSetting = document.getElementById("show-setting");
    this.inputElm = document.getElementById("input-seting-user");
    this.oldValue = document.getElementById("name");
    this.settingDelete = document.querySelector(".setting__delete");
    this.deleteBtn = document.getElementById("delete-account");
    this.declineDelete = document.querySelector(".delete-setting");
    this.submitDelete = document.getElementById("submit-delete");
    this.clickItems();
  }
  //? ----------------------- Click Items
  clickItems() {
    //! ----------------------- Settings Items
    const settingsItems = document.querySelectorAll(".setting__prev");
    settingsItems.forEach((items) =>
      items.addEventListener("click", this.editingInfo.bind(this))
    );
    //! ----------------------- Submit Setting
    const submitSetting = document.getElementById("submit-setting");
    submitSetting.addEventListener("click", this.submitBox.bind(this));
    //! ----------------------- Input
    this.inputElm.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        submitSetting.click();
      }
    });
    //! ----------------------- Close Setting
    const closeSetting = document.querySelector(".close-setting");
    closeSetting.addEventListener("click", this.closeInfoBox.bind(this));
    //! ----------------------- Delete Account
    this.deleteBtn.addEventListener("click", () => {
      this.deleteAccount();
    });
    //! ----------------------- Decline Delete
    this.declineDelete.addEventListener("click", () => this.declineDel());
    //! ----------------------- Submit Delete
    this.submitDelete.addEventListener("click", () => this.checkerForDelete());
  }
  //? ----------------------- Editing Info
  editingInfo(event) {
    const infoName = event.currentTarget.dataset.name;
    const itemTitle = event.currentTarget.querySelector("h3").innerHTML;
    if (infoName === "password") {
      this.inputElm.setAttribute("type", "password");
    }
    let titleName, value, AttrName;
    switch (infoName) {
      case "name":
        titleName = itemTitle;
        AttrName = "name";
        value = this.userDataApi.name;
        break;
      case "bio":
        titleName = itemTitle;
        AttrName = "bio";
        value = this.userDataApi.bio;
        break;
      case "username":
        titleName = itemTitle;
        AttrName = "username";
        value = this.userDataApi.username;
        break;
      case "email":
        titleName = itemTitle;
        AttrName = "email";
        value = this.userDataApi.email;
        break;
      case "phone":
        titleName = itemTitle;
        AttrName = "phone";
        value = this.userDataApi.phone;
        break;
      case "password":
        titleName = itemTitle;
        AttrName = "password";
        value = "**********";
        break;
    }
    this.renderInfo(titleName, value, AttrName);
  }
  //? ----------------------- Render Info
  renderInfo(titleName, value, AttrName) {
    //! -----------------------
    //Todo ------------
    document.getElementById("name-seting-user").innerHTML = titleName;
    //Todo ------------
    this.inputElm.value = value;
    this.inputElm.setAttribute("data-name", AttrName);
    //! -----------------------
    this.showInfoBox();
  }
  //? ----------------------- Show Info Box
  showInfoBox() {
    this.showSetting.classList.replace("d-none", "d-flex");
  }
  //? ----------------------- Close Info Box
  closeInfoBox() {
    this.showSetting.classList.replace("d-flex", "d-none");
  }
  //? ----------------------- Submit Box
  async submitBox() {
    try {
      //! ----------------------- Value
      const InputName = this.inputElm.dataset.name;
      const newInputValue = this.inputElm.value;
      //! ----------------------- Fetch Data
      const formData = new FormData();
      formData.append("key", InputName);
      formData.append("value", newInputValue);
      Loading.showLoading();
      const { data: response } = await axios.post(`${url}/update`, formData);
      //! ----------------------- Result (Call renderNewInfo)
      this.renderNewInfo(response);
    } catch (error) {
      console.error(Error);
    }
  }
  //? ----------------------- renderNewInfo
  renderNewInfo(response) {
    const oldInput = this.oldValue.innerHTML;
    const newInput = this.inputElm.value;
    //! ----------------------- Loading
    Loading.hideLoading();
    //! ----------------------- response Toast
    if (response.status === "error") {
      if (oldInput === newInput) {
        new Toast().failure("تغییری در کاراکتر وارد شده , داده نشده است");
      } else {
        new Toast().failure(response.message);
      }
    } else {
      App.getTokenCode().setLoginLocal(response.data.name, response.data.token);
      new Toast().success(response.message);
      App.getRouter().navigateTo("setting");
    }
    //! ----------------------- Style Change
    this.showSetting.classList.replace("d-flex", "d-none");
  }
  //? ----------------------- Delete Account
  deleteAccount() {
    this.settingDelete.classList.replace("d-none", "d-flex");
    const welcome = document.getElementById("welcome");
    welcome.setAttribute("data-write-bool", true);
  }
  //? ----------------------- Decline Del
  declineDel() {
    this.settingDelete.classList.replace("d-flex", "d-none");
  }
  //? ----------------------- Check Conditions
  checkerForDelete() {
    const inputDeleteUser = document.getElementById("input-delete-user");
    if (inputDeleteUser.value === "Delete") {
      const confirmAsk = confirm("آیا از حذف اکانت خود اطمینان دارید؟");
      if (confirmAsk) {
        axios
          .delete(`${url}/deleteUser`)
          .then(() => {
            App.getTokenCode().signOut();
            new Toast().success("اکانت شما با موفقیت حذف گردید");
            App.getRouter().navigateTo("home");
          })
          .catch((error) => {
            new Toast().failure("حذف اکانت با مشکل مواجه شد");
          });
      }
    } else {
      inputDeleteUser.style.color = "#ef4056";
      inputDeleteUser.setAttribute(
        "placeholder",
        "در صورت تمایل لطفا عبارت خواسته شده را وارد نمایید"
      );
    }
    inputDeleteUser.value = "";
  }
}
