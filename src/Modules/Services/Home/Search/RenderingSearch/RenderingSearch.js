//! ----------------------------------------------- Import
//! ----------------------------------------------- Home Page
export class RenderingSearch {
  constructor(users) {
    this.users = users;
  }
  //? ----------------------- Render User Data
  renderUserData(template) {
    //! ----------------------- Template Access
    const templateAccess = document.importNode(template.content, true);
    //! ----------------------- Image
    const userImage = templateAccess.querySelector("#image-search");
    userImage.src = this.users.profile_image;
    //! ----------------------- Name
    const userName = templateAccess.querySelector("#name-search");
    userName.innerHTML = this.users.name;
    //! ----------------------- Bio
    const userBio = templateAccess.querySelector("#bio-search");
    userBio.innerHTML = this.users.bio;
    //! ----------------------- User Id
    const userId = templateAccess.querySelector("#userIdGiver");
    userId.setAttribute("data-userid", this.users.id);
    //! ----------------------- Return
    return templateAccess;
  }
}
