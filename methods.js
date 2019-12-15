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
  static getHelpList() {
    const listCmd = { name: "-l", value: "generate a list of top memes" };
    const genCmd = {
      name: "Generic format",
      value: "!meme id text -t text -t text"
    };
    const numCmd = { name: "id", value: "a number from 1-100 (require)" };
    const lineCmd = {
      name: "-t",
      value: "entering new box/line of text in the template (max 5 lines)"
    };
    const randCmd = {
      name: "-m",
      value: "put this at the end to randomize upper and lower case"
    };
    const helpList = {
      title: "Command List",
      fields: [listCmd, genCmd, numCmd, lineCmd, randCmd]
    };
    return helpList;
  }
  static async getMemeList() {
    const memes = await axios
      .get(process.env.IMGFLIP_GETMEMES)
      .then(res => {
        if (res.data.success) {
          var embedlist = { title: "Top 25 memes", fields: [] };
          const memes = res.data.data.memes;
          for (var i = 0; i < memes.length; i++) {
            embedlist.fields.push({
              name: i + 1,
              value: memes[i].name,
              template_id: memes[i].id,
              url: memes[i].url
            });
          }
          return embedlist;
        }
      })
      .catch(err => {
        throw err;
      });
    return memes;
  }
  static async getMemeName(id) {
    const memeList = await this.getMemeList();
    return memeList.fields[id - 1];
  }
  static async getGeneratedMeme(id, str1, str2, str3, str4, str5, isMock) {
    const firstStr = isMock ? this.mockString(str1) : str1;
    const secondStr = isMock ? this.mockString(str2) : str2;
    const thirdStr = isMock ? this.mockString(str3) : str3;
    const fourthStr = isMock ? this.mockString(str4) : str4;
    const fifthStr = isMock ? this.mockString(str5) : str5;

    const formData = new FormData();
    const memeList = await this.getMemeList();
    console.log(memeList);
    const template_id = memeList.fields[id - 1].template_id;
    formData.append("template_id", template_id);
    formData.append("username", process.env.IMGFLIP_USERNAME);
    formData.append("password", process.env.IMGFLIP_PASSWORD);
    formData.append("boxes[0][text]", firstStr);
    formData.append("boxes[1][text]", secondStr);
    formData.append("boxes[2][text]", thirdStr);
    formData.append("boxes[3][text]", fourthStr);
    formData.append("boxes[4][text]", fifthStr);

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
