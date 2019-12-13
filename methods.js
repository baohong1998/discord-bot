const axios = require("axios");
const FormData = require("form-data");
class BotWork {
  static mockString(str) {
    var newStr = "";
    for (var i = 0; i < str.length; i++) {
      var rand = Math.floor(Math.random() * 2);
      switch (rand) {
        case 0:
          newStr += str.charAt(i).toLowerCase();
          break;
        case 1:
          newStr += str.charAt(i).toUpperCase();
      }
    }
    return newStr;
  }
  static async getMockSponge(str) {
    const preStr = this.mockString(str);
    console.log(preStr);
    const box = [{ text: preStr, color: "#fff" }];
    const formData = new FormData();
    formData.append("template_id", process.env.SPONGE_ID);
    formData.append("username", process.env.IMGFLIP_USERNAME);
    formData.append("password", process.env.IMGFLIP_PASSWORD);
    formData.append("boxes[0][text]", preStr);

    const generatedMeme = await axios
      .post(process.env.IMGFLIP_URL, formData, {
        headers: formData.getHeaders()
      })
      .then(res => {
        return res.data.data.url;
      })
      .catch(err => {
        throw err;
      });
    return generatedMeme;
  }
}
module.exports = BotWork;
