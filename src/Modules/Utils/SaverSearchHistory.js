//! ----------------------------------------------- Import
//! ----------------------------------------------- Home Page
export class SaverHistory {
  constructor() {
    this.searchArray = [];
    this.categoryArray = [];
    this.blogArray = [];
    this.postArray = [];
  }
  //? ----------------------- SearchHistory
  searchHistory(response) {
    if (response.tagName && response.tagName === "A") {
      if (this.searchArray.length > 0) {
        return this.searchArray[0];
      }
    }
    this.searchArray.unshift(response);
    return this.searchArray[0];
  }
  //? ----------------------- CategoryHistory
  categoryHistory(CatIdNum) {
    if (CatIdNum !== this.categoryArray[0] && CatIdNum !== null) {
      this.categoryArray = [];
    }
    if (CatIdNum) {
      this.categoryArray.unshift(CatIdNum);
    }
    return this.categoryArray[0];
  }
  //? ----------------------- BlogHistory
  blogHistory(placeCenter) {
    if (placeCenter !== this.blogArray[0] && placeCenter !== null) {
      this.blogArray = [];
    }
    if (placeCenter) {
      this.blogArray.unshift(placeCenter);
    }
    return this.blogArray[0];
  }
  //? ----------------------- postHistory
  postHistory(postId) {
    if (postId !== this.postArray[0] && postId !== null) {
      this.postArray = [];
    }
    if (postId) {
      this.postArray.unshift(postId);
    }
    return this.postArray[0];
  }
}
