//! ----------------------------------------------- Import
import { App } from "../App";
import { Page } from "../Models/Page";
import { RenderSubject } from "../Services/Home/Subject/RenderSubject/RenderSubject";
//! ----------------------------------------------- Home Page
export class SubjectPage extends Page {
  //? ----------------------- beforeRendering
  async beforeRendering(html) {
    try {
      //! ----------------------- NewSec
      const newSec = document.createElement("section");
      newSec.innerHTML = html;
      //! ----------------------- Elements
      const parentDiv = newSec.querySelector(".topic-wrapper");
      const temple = newSec.querySelector("#topic-cat");
      //! ----------------------- Categories
      const categories = await App.fetchCategory().getCategories();
      //Todo -----------
      categories.forEach((event) => {
        parentDiv.append(new RenderSubject(event).renderChildren(temple));
      });
      //! ----------------------- Return
      return newSec.innerHTML;
    } catch (error) {
      console.error(error);
    }
  }
  //? ----------------------- afterRendering
  afterRendering() {
    console.log("Subject Page");
  }
}
