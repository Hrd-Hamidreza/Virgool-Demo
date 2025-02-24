//! ----------------------------------------------- Import
import { App } from "../App";
import { Page } from "../Models/Page";
import { SelectedDirectory } from "../Utils/SelectedDirectory";
import { RenderClickData } from "../Services/Profile/Settings/RenderClickData/RenderClickData";
//! ----------------------------------------------- Home Page
export class SettingPage extends Page {
  //? ----------------------- beforeRendering
  async beforeRendering(html) {
    try {
      //! ----------------------- newSec
      const newSec = document.createElement("section");
      newSec.innerHTML = html;
      //! ----------------------- userInfo ( App )
      this.userInfo = await App.getProfileSetting().fetchSettingsData();
      this.userInfo.renderData(newSec);
      //! ----------------------- Return
      return newSec.innerHTML;
    } catch (error) {
      console.error(error);
    }
  }
  //? ----------------------- afterRendering
  afterRendering() {
    //! ----------------------- Call Select Settings Directory
    new SelectedDirectory().clickedItem();
    //! ----------------------- Render Click Data
    new RenderClickData(this.userInfo);
    //! ----------------------- Setting Name
    console.log("Setting Page");
  }
  //? ----------------------- Must Be Logged
  mustBeLogged() {
    return true;
  }
}
