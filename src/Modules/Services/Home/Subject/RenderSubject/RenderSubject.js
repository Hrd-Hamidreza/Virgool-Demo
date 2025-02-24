//! ----------------------------------------------- Import
//! ----------------------------------------------- Home Page
export class RenderSubject {
  constructor(categories) {
    this.categories = categories;
  }
  //? ----------------------- Render Children
  renderChildren(temple) {
    //! ----------------------- NewSec
    const innerAccess = document.importNode(temple.content, true);
    //! ----------------------- Cat Name
    const catName = innerAccess.querySelector(".main-topic");
    catName.innerHTML = this.categories.name;
    //Todo ----------- Id Attribute
    catName.setAttribute("data-categoryid", this.categories.id);
    //! ----------------------- Render lists
    const lists = innerAccess.querySelector(".list-group");
    this.categories.children.forEach((element) => {
      //Todo ----------- Create Element
      const newA = document.createElement("a");
      //! ------ classList
      newA.classList =
        "list-group-item childTopic text-subtitle mt-3 fs-4 w-100 d-flex topic-item";
      //! ------ Id Attribute
      newA.setAttribute("data-categoryid", element.id);
      //! ------ Href
      newA.href = "/tag";
      //! ------ InnerHTML
      newA.innerHTML = element.name;
      //! ------ Add
      lists.append(newA);
    });
    //! ----------------------- Return
    return innerAccess;
  }
}
