//! ----------------------------------------------- Import
import { App } from "../App";
import { Page } from "../Models/Page";
import { SelectedDirectory } from "../Utils/SelectedDirectory";
//! ----------------------------------------------- Home Page
export class SearchPage extends Page {
  //? ----------------------- beforeRendering
  beforeRendering(html, main) {
    //! ---------------------------------------------- New Section
    const newSec = document.createElement("section");
    newSec.innerHTML = html;
    //! ---------------------------------------------- User Elements
    const userContainer = newSec.querySelector("#user-container");
    const userTemplate = newSec.querySelector("#user-template");
    //Todo ----------------------- Get Response
    const justInCase = App.getSaverHistory().searchHistory(main);
    const { searchResult } = justInCase;
    //Todo ----------------------- Rendering Users
    const usersData = App.getMediator().mediatoringUsers(searchResult);
    if (usersData.length > 0) {
      usersData.forEach((User) => {
        userContainer.append(User.renderUserData(userTemplate));
      });
    } else {
      userContainer.style.color = "#ef4056";
      userContainer.style.fontWeight = "bold";
      userContainer.style.display = "flex";
      userContainer.style.paddingTop = "5rem";
      userContainer.style.justifyContent = "center";
      userContainer.style.alignItems = "center";
      userContainer.innerHTML = "متاسفانه کاربری با این نام وجود ندارد";
    }

    //! ---------------------------------------------- Post Elements
    const postContainer = newSec.querySelector("#post-container");
    const postTemplate = newSec.querySelector("#post-template");
    //Todo ----------------------- Rendering Quotes
    const quotesData = App.getMediator().mediatoringQuotes(searchResult);
    if (quotesData.length > 0) {
      quotesData.forEach((quote) => {
        postContainer.append(quote.renderPosts(postTemplate));
      });
    } else {
      postContainer.style.color = "#ef4056";
      postContainer.style.fontWeight = "bold";
      postContainer.style.display = "flex";
      postContainer.style.paddingTop = "5rem";
      postContainer.style.justifyContent = "center";
      postContainer.style.alignItems = "center";
      postContainer.innerHTML = "متاسفانه پستی مرتبط وجود ندارد";
    }

    //! ---------------------------------------------- Return
    return newSec.innerHTML;
  }
  //? ----------------------- afterRendering
  afterRendering() {
    //! -----------------------  Selected Directory
    new SelectedDirectory().clickedItem();
    //! ----------------------- Home Page
    console.log("Home Page");
  }
}
