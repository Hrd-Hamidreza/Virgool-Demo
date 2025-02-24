//! ----------------------------------------------- Import
//! ----------------------------------------------- Home Page
export class RenderSettingData {
  constructor(info) {
    for (const key in info) {
      this[key] = info[key];
    }
  }
  //? ----------------------- Render Data
  renderData(html) {
    //! ----------------------- Name
    html.querySelector("#name").innerHTML = this.name;
    //! ----------------------- UserName
    html.querySelector("#userName").innerHTML = this.username;
    //! ----------------------- email
    html.querySelector("#email").innerHTML = this.email;
    //! ----------------------- phone
    html.querySelector("#phone").innerHTML = this.phone;
    //! ----------------------- Description
    html.querySelector("#bio").innerHTML = this.bio;
    //! ----------------------- Return
    return html;
  }
}
