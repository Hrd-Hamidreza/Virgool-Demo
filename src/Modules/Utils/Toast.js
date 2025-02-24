//! ----------------------------------------------- Import
//! ----------------------------------------------- Home Page
export class Toast {
  constructor() {
    this.toastParent = document.getElementById("toastMessage");
    this.newToast;
    this.createToast();
  }
  //? ----------------------- ShowToast
  createToast() {
    //Todo ------------ New Div
    this.newToast = document.createElement("div");
    this.newToast.classList.add("Toast");
    //Todo ------------ Styles
    this.newToast.style.paddingInline = "2.5rem";
    this.newToast.style.paddingBlock = "1rem";
    //Todo ------------ Append
    this.toastParent.prepend(this.newToast);
  }
  //? ----------------------- Success
  success(message) {
    //Todo ------------ Styles
    this.newToast.id = "addToast";
    this.newToast.innerHTML = message;
    this.newToast.style.backgroundColor = "#4db34d";
    //Todo ------------ Remove Toast
    this.removeToast();
  }
  //? ----------------------- Failure
  failure(message) {
    //Todo ------------ Styles
    this.newToast.id = "delToast";
    this.newToast.innerHTML = message;
    this.newToast.style.backgroundColor = "#ff3333";
    //Todo ------------ Remove Toast
    this.removeToast();
  }
  //? ----------------------- RemoveToast
  removeToast() {
    //Todo ------------ Set Time Out
    this.timeRefresh = setTimeout(() => {
      this.newToast.remove();
    }, 3000);
  }
}
