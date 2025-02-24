//! ----------------------------------------------- Import
//! ----------------------------------------------- Home Page
export class Loading {
  //todo ----------------------- Show Loading
  static showLoading() {
    const loadingElm = document.querySelector(".loading-container");
    loadingElm.dataset.show = true;
  }
  //todo ----------------------- Hide Loading
  static hideLoading() {
    const loadingElm = document.querySelector(".loading-container");
    loadingElm.dataset.show = false;
  }
}
