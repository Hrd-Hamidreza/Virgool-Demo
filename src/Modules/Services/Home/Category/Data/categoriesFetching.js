//! ----------------------------------------------- Import
import axios from "axios";
import { url } from "../../../../Utils/Options";
import { CategoriesContents } from "../Contents/categoriesContents";
//! ----------------------------------------------- Home Page
export class CategoriesFetching {
  constructor() {
    this.categoryArray = [];
  }
  //todo ----------------------- getCategories
  async getCategories() {
    try {
      if (this.categoryArray.length === 0) {
        const { data: response } = await axios.get(`${url}/category`);
        this.categoryArray = response.map(
          (element) => new CategoriesContents(element)
        );
        return this.categoryArray;
      } else {
        return this.categoryArray;
      }
    } catch (error) {
      console.error(error);
    }
  }
}
