//! ------------------------------------------------------------ Import
import { url } from "../../../Utils/Options";
//! ------------------------------------------------------------ Tag Page
export class RenderUserInfo {
  constructor(info) {
    this.info = info;
  }
  //? ----------------------- renderInformation
  renderInformation(html) {
    //! ----------------------- User Image
    const userImage = html.querySelector("#user-image");
    userImage.src = this.info.imageurl;
    //! ----------------------- User Name
    const userName = html.querySelector("#user-name");
    userName.innerHTML = this.info.name;
    //! ----------------------- User Bio
    const userBio = html.querySelector("#user-bio");
    userBio.innerHTML = this.info.bio;
  }
}
