//! ----------------------------------------------- Import
import { url } from "../../../../Utils/Options";
//! ----------------------------------------------- Launched Class
export class RenderingDirectoriesdata {
  constructor(quotes) {
    for (let key in quotes) {
      this[key] = quotes[key];
    }
  }
  //? ----------------------- RenderItems
  RenderItems(newSec) {
    //Todo ----------------------- Template Creation
    const postTemplate = newSec.querySelector("#post-template");
    const templateSection = document.importNode(postTemplate.content, true);
    //Todo ----------------------- Publish Click
    if (this.valid) {
      const publishStatus = templateSection.querySelectorAll("#publish-status");
      publishStatus.forEach((element) => {
        element.setAttribute("data-postId", this.id);
        element.classList.remove("bg-danger");
        element.style.backgroundColor = "green";
        element.innerHTML = "منتشر شده";
      });
    }
    //Todo ----------------------- Render Items
    //! ------------- Set Post Id
    //* ------- Delete Post Element
    const deletePost = templateSection.getElementById("delete-post-id");
    deletePost.setAttribute("data-postId", +this.id);
    //* ------- Post Link Tag
    const postTitle = templateSection.getElementById("post-title");
    postTitle.setAttribute("data-postId", +this.id);
    postTitle.setAttribute("place", "myQuotes");
    //! ------------- title
    postTitle.innerHTML = this.title;
    //! ------------- Image
    templateSection.getElementById(
      "post-image"
    ).src = `${url}/${this.imageUrl}`;
    //! ------------- publish
    templateSection.getElementById("post-publish").innerHTML = this.time_frame;
    //! ------------- category
    templateSection.getElementById("post-category").innerHTML =
      this.category_title;
    //! ------------- like
    templateSection.getElementById("post-like").innerHTML = this.likecount;
    //! ------------- comment
    templateSection.getElementById("post-comment").innerHTML =
      this.commentcount;
    //Todo ----------------------- Return
    return templateSection;
  }
}
