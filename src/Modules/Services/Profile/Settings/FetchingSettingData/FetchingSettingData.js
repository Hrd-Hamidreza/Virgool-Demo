//! ----------------------------------------------- Import
import axios from "axios";
import { RenderSettingData } from "../RenderSettingData/RenderSettingData";
import { url } from "../../../../Utils/Options";
//! ----------------------------------------------- Home Page
export class FetchingSettingData {
  constructor() {}
  //? ----------------------- Fetch Data
  async fetchSettingsData() {
    try {
      //! ----------------------- Fetch
      const { data: response } = await axios.get(`${url}/getuser`);
      //! ----------------------- Call
      const result = new RenderSettingData(response);
      //! ----------------------- Return
      return result;
    } catch (error) {
      console.error(error);
    }
  }
}
