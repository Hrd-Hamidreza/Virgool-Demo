//! ----------------------------------------------- Import
//! ----------------------------------------------- Home Page
export class SelectedDirectory {
  constructor() {
    this.Items = document.querySelectorAll(".dashboard__item");
    this.Sections = document.querySelectorAll(".section-item");
  }
  //? ----------------------- Clicked Item
  clickedItem() {
    this.Items.forEach((list, index) => {
      list.addEventListener("click", (event) =>
        this.selectedDirectory(event, index)
      );
    });
  }
  //? ----------------------- selectedSeDir
  selectedDirectory(event, index) {
    //! ----------------------- Each Section Style
    this.Sections.forEach((sec) => {
      if (sec.classList.contains("d-flex")) {
        sec.classList.replace("d-flex", "d-none");
      } else {
        sec.classList.add("d-none");
      }
    });
    //Todo ------------
    this.Sections[index].classList.replace("d-none", "d-flex");
    //! ----------------------- Bottom Line Style
    this.Items.forEach((list) => {
      list.classList.remove("active");
    });
    //Todo ------------
    this.Items[index].classList.add("active");
  }
}
