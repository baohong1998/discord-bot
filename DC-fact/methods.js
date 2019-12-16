const axios = require("axios");
class DucCon {
  time = 10000;
  constructor(time) {
    this.time = time < 0 ? this.time : time * 1000;
  }

  setTime(time) {
    this.time = time < 0 ? this.time : time * 1000;
  }
  static async getUselessFact() {
    const fact = await axios
      .get(process.env.FACT_URL)
      .then(res => {
        return res.data.text;
      })
      .catch(err => {
        throw err;
      });
    return fact;
  }
  static getHelp() {
    const listCmd = {
      name: "-start",
      value: "start spilling facts every 10 sec"
    };
    const genCmd = {
      name: "-set x",
      value: "splill facts after (x) seconds"
    };
    const numCmd = { name: "-stop", value: "make the bot stfu" };
    const lineCmd = {
      name: "-get",
      value: "get one random fact"
    };

    const helpList = {
      title: "Command List (facts are sent to #useless-facts",
      fields: [listCmd, genCmd, numCmd, lineCmd]
    };
    return helpList;
  }
}
module.exports = DucCon;
