//! ----------------------------------------------- Import
//! ----------------------------------------------- Checking Article
export class CheckingArticle {
  constructor() {
    this.publishBtn = document.getElementById("publishBtn");
    this.subjectInput = document.getElementById("subject__Text");
    this.contentPTag = document.querySelector(".post__description");
    this.prevPost = document.querySelector(".prev-post");
    this.closeSetting = document.getElementById("close-setting");
    this.errorPublish = document.getElementById("editor");
    this.contentTextPTag;
  }
  //? ----------------------- publish Clicking
  publishClicking() {
    //Todo ------------ Click
    this.publishBtn.addEventListener("click", this.checkingValues.bind(this));
    //Todo ------------ this.enterJump
    this.subjectInput.addEventListener("keypress", this.enterJump.bind(this));
    //Todo ------------ return
    return true;
  }
  //? ----------------------- checking Values
  checkingValues() {
    this.contentTextPTag = document.querySelectorAll(".ck-content > p");
    const opop = [];
    this.contentTextPTag.forEach((texts) => opop.push(texts.children.length));
    const finalBool = opop.some((element) => element === 0);
    //Todo ----------------------- conditions (If)
    if (this.subjectInput.value.trim() !== "" && finalBool) {
      this.errorPublish.innerHTML = "";
      //! --------- Black color
      this.changingBlackInput(this.subjectInput);
      //! --------- Hidden
      this.prevPost.classList.remove("hidden");
      //! --------- Close Setting Window
      this.closeSetting.addEventListener("click", () => {
        this.prevPost.classList.add("hidden");
      });
      //Todo ----------------------- conditions (Else)
    } else {
      //Todo ----------------------- conditions (If)
      if (!finalBool && this.subjectInput.value.trim() === "") {
        //Todo ------------ Article
        this.errorPublish.style.display = "flex";
        this.errorPublish.style.fontSize = "1.5rem";
        this.errorPublish.innerHTML = "متن مقاله نباید خالی باشد";
        this.errorPublish.classList.add("stuRegister__error");
        //Todo ------------ Subject
        //! --------- Black color
        this.changingBlackInput(this.subjectInput);
        //! --------- Styles
        this.prevPost.classList.add("hidden");
        this.subjectInput.style.color = "red";
        const name = this.subjectInput.dataset.title;
        this.subjectInput.setAttribute(
          "placeholder",
          `${name}  نباید خالی باشد`
        );
        //Todo ----------------------- conditions (Else If)
      } else if (!finalBool) {
        this.errorPublish.style.display = "flex";
        this.errorPublish.style.fontSize = "1.5rem";
        this.errorPublish.innerHTML = "متن مقاله نباید خالی باشد";
        this.errorPublish.classList.add("stuRegister__error");
        //Todo ----------------------- conditions (Else If)
      } else if (this.subjectInput.value.trim() === "") {
        this.errorPublish.innerHTML = "";
        //! --------- Black color
        this.changingBlackInput(this.subjectInput);
        //! --------- Styles
        this.prevPost.classList.add("hidden");
        this.subjectInput.style.color = "red";
        const name = this.subjectInput.dataset.title;
        this.subjectInput.setAttribute(
          "placeholder",
          `${name}  نباید خالی باشد`
        );
      }
    }
  }
  //? ----------------------- Changing Black Input
  changingBlackInput(element) {
    element.addEventListener("input", () => {
      this.subjectInput.style.color = "black";
    });
  }
  //? ----------------------- Enter Jump
  enterJump(event) {
    const contentTextPTag = document.querySelector(".ck-content");
    //Todo ------------ Enter Jump
    if (event.key === "Enter") {
      contentTextPTag.focus();
    }
  }
}
