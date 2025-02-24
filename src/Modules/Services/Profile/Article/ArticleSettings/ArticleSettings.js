//! ----------------------------------------------- Import
//! ----------------------------------------------- Article Settings
export class ArticleSettings {
  constructor() {}
  //? ----------------------- Sort Categories
  sortCategories(html, getCat) {
    //Todo ------------ new Sec
    const newSec = document.createElement("section");
    newSec.innerHTML = html;
    //! ------- Element
    const categoryWrapper = newSec.querySelector("#category-post");
    //! ------- Default
    const defaultAll = document.createElement("option");
    defaultAll.innerHTML = "انتخاب";
    defaultAll.value = "";
    categoryWrapper.prepend(defaultAll);
    //! ------- Loop
    getCat.forEach((event) => {
      const newOption = document.createElement("option");
      newOption.innerHTML = event.name;
      newOption.value = event.id;
      categoryWrapper.append(newOption);
    });
    //Todo ------------ Return
    return newSec.innerHTML;
  }
  //? ----------------------- Range Num
  rangeNum() {
    const rangeInput = document.getElementById("rangeInput");
    const valueRangeInput = document.getElementById("value");
    rangeInput.addEventListener("input", (event) => {
      event.target.setAttribute("value", event.target.valueAsNumber);
      valueRangeInput.innerHTML = event.target.valueAsNumber;
    });
  }
  //? ----------------------- Tag Type
  tagType() {
    const exiArr = [];
    const tagInput = document.querySelector(".tags-block--add");
    const tagBucket = document.querySelector(".tags-block-list");
    tagInput.addEventListener("keypress", (event) => {
      //* ----------------------- Start
      if (event.key === "Enter" || event.key === " " || event.key === "-") {
        event.preventDefault();
        if (tagInput.value.trim() !== "") {
          tagInput.value = tagInput.value.trim();
          //Todo ------------ newLi
          const newLi = document.createElement("li");
          newLi.classList.add("tags-block-list--item");
          newLi.innerHTML = `<span id="emptyFactor" class="emptyClassSpan">${tagInput.value}</span><button id="tagsDelBtn"
          class="tags-block-list--remove">x</button>
          `;
          //Todo ------------ Condition ( Prepend & Array )
          if (!exiArr.includes(tagInput.value)) {
            //! ------ push
            exiArr.push(tagInput.value.trim());
            //! ------ prepend
            tagBucket.prepend(newLi);
          }
          //Todo ------------ Empty
          tagInput.value = "";
          //Todo ------------ Delete Li
          newLi
            .querySelector(".tags-block-list--remove")
            .addEventListener("click", () => {
              const itemDeleted = newLi.querySelector("#emptyFactor").innerHTML;
              const index = exiArr.indexOf(itemDeleted);
              exiArr.splice(index, 1);
              newLi.remove();
            });
        }
      }
      //* ----------------------- End
    });
  }
  //? ----------------------- Upload Image
  uploadImage() {
    const uploadDiv = document.getElementById("upload-div");
    const fileInput = document.getElementById("file-input");
    const previewImage = document.getElementById("preview-image");
    //Todo ------------ Upload Div
    uploadDiv.addEventListener("click", (event) => {
      fileInput.click();
    });
    //Todo ------------ File Input
    fileInput.addEventListener("change", (element) => {
      //! ------ Call FileReader
      const fileReader = new FileReader();
      //! ------ readAsDataURL
      fileReader.readAsDataURL(element.target.files[0]);
      //! ------ onload
      fileReader.onload = (event) => {
        previewImage.src = event.target.result;
      };
    });
  }
}
