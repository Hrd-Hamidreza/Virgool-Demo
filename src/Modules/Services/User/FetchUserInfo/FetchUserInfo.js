//! ------------------------------------------------------------ Import
import axios from "axios";
import { url } from "../../../Utils/Options";
import { RenderUserInfo } from "../RenderUserInfo/RenderUserInfo";
import { PostsContents } from "../../Home/Post/Contents/PostsContents";
import { Toast } from "../../../Utils/Toast";
//! ------------------------------------------------------------ Tag Page
export class FetchUserInfo {
  constructor() {
    this.postArr = [];
    this.backId = [];
  }
  //? ----------------------- Fetch Whole Data
  async fetchWholeData(id) {
    try {
      if (id) {
        this.backId.unshift(id);
      }
      //! ----------------------- Form Data
      const formData = new FormData();
      if (id === null) {
        formData.append("id", this.backId[0]);
      } else {
        formData.append("id", id);
      }
      //Todo ----------- General Response
      const generalResponse = await axios.post(`${url}/userid`, formData);
      //! ----------------------- Return
      if (generalResponse.data) {
        return new RenderUserInfo(generalResponse.data);
      } else {
        console.log("متاسفانه کاربری یافت نشد");
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  }
  //? ----------------------- Fetch Posts Data
  async fetchPostsData(id) {
    try {
      //! ----------------------- Posts Response
      let postsResponse;
      if (id === null) {
        postsResponse = await axios.get(`${url}/quotes/user/${this.backId[0]}`);
      } else {
        postsResponse = await axios.get(`${url}/quotes/user/${id}`);
      }
      if (
        postsResponse.data.status === "error" ||
        postsResponse.data.length === 0
      ) {
        new Toast().failure("پستی یافت نشد");
        return false;
      } else {
        // ! ----------------------- return
        this.postArr = postsResponse.data.map(
          (element) => new PostsContents(element)
        );
        return this.postArr;
      }
    } catch (error) {
      console.error(error);
    }
  }
}
