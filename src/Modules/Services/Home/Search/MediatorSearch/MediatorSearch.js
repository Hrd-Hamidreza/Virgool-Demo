//! ----------------------------------------------- Import
import { PostsContents } from "../../Post/Contents/PostsContents";
import { RenderingSearch } from "../RenderingSearch/RenderingSearch";
//! ----------------------------------------------- Home Page
export class MediatorSearch {
  constructor() {
    this.usersArray = [];
    this.quotesArray = [];
  }
  //? ----------------------- Mediatoring Users
  mediatoringUsers(response) {
    this.usersArray = response.users.map((user) => new RenderingSearch(user));
    //! ----------------------- Return
    return this.usersArray;
  }
  //? ----------------------- Mediatoring Quotes
  mediatoringQuotes(response) {
    this.quotesArray = response.quotes.map((quote) => new PostsContents(quote));
    //! ----------------------- Return
    return this.quotesArray;
  }
}
