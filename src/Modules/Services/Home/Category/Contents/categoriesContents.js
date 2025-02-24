//! ----------------------------------------------- Import
//! ----------------------------------------------- Home Page
export class CategoriesContents {
  constructor(categories) {
    for (let key in categories) {
      this[key] = categories[key];
    }
  }
  //todo ----------------------- renderCategories
  renderCategories(html) {
    const innerAccess = document.importNode(html.content, true);
    //! ------------ Categories Text
    innerAccess.getElementById("tags").innerText = this.name;
    //! ------------ First
    const catId = innerAccess.querySelectorAll(".chosen");
    catId.forEach((element) => {
      element.setAttribute("data-categoryId", this.id);
    });
    //! ------------ Return
    return innerAccess;
  }
}
