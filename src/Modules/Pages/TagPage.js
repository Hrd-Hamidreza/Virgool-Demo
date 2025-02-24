//! ------------------------------------------------------------ Import
import { App } from "../App";
import { Page } from "../Models/Page";
//! ------------------------------------------------------------ Tag Page
export class TagPage extends Page {
  //todo ----------------------- beforeRendering
  async beforeRendering(html, main) {
    const newSec = document.createElement("section");
    newSec.innerHTML = html;
    //! ----------------------- Elements
    //Todo ----------------------- write Fetch Bool
    const checkerCatId = main.getAttribute("data-categoryId");
    const sendIdToSave = App.getSaverHistory().categoryHistory(checkerCatId);
    let finalCatId;
    if (checkerCatId) {
      finalCatId = checkerCatId;
    } else {
      finalCatId = sendIdToSave;
    }
    //Todo ----------------------- Start
    const getCat = await App.tagsBlogGet().fetchContent(finalCatId);
    const holder = newSec.querySelector("#category-wrapper");
    const tagNameElm = newSec.querySelector("#tag-content");
    //! ----------------------- Condition Tags
    if (getCat && getCat.length) {
      getCat.forEach((element) => {
        holder.append(element.renderTagBlogs(newSec, tagNameElm));
      });
    } else if (getCat.result === false) {
      //Todo ----------------------- Tag Name
      tagNameElm.innerHTML = getCat.tagName;
      //Todo ----------------------- Style
      holder.innerHTML = ` ( ${getCat.tagName} ) : There is no post for your chosen tag subject about the`;
      holder.style.display = "flex";
      holder.style.justifyContent = "center";
      holder.style.alignItems = "center";
      holder.style["font-weight"] = "bold";
      //Todo ----------------------- Error
      console.error(getCat.errorMessage);
    }
    //! ----------------------- Return
    return newSec.innerHTML;
  }
  //todo ----------------------- afterRendering
  afterRendering() {
    console.log("Tag Page");
  }
}
