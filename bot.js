const Discord = require("discord.js");
const client = new Discord.Client();
const BotWork = require("./methods");
require("dotenv").config();
client.on("ready", () => {
  console.log("bot is ready");
});
client.on("message", message => {
  const content = message.content.split(" ");
  const prefix = content.shift().toLowerCase();
  var isMock = false;

  if (prefix !== "!meme") return;
  if (content.length <= 0) {
    message.channel.send("Type -h for a list of command");
    return;
  }
  if (content[0] === "-h") {
    //send help
    message.channel.send(
      "-l for a list of top 100 memes\n id then follow by\n-t for first line of text\n-b for second line\nadd -m at the end to randomly set uppercase and lowercase"
    );
    return;
  }
  if (content[0] === "-l") {
    //print meme list 100
    BotWork.getMemeList().then(memes => {
      message.channel.send({ embed: memes });
    });
    return;
  }

  if (isNaN(content[0])) {
    message.channel.send("Please choose a number from 1-100");
    return;
  }
  const id = parseInt(content.shift());
  console.log(id);
  const firstArr = [];
  const secondArr = [];
  const thirdArr = [];
  const fourthArr = [];
  const fifthArr = [];
  if (content.length <= 0) {
    BotWork.getMemeName(id)
      .then(res => {
        message.channel.send("Meme name: " + res);
      })
      .catch(err => {
        throw err;
      });
    return;
  }
  if (content[0] === "-t1") {
    content.shift();
  }
  while (content.length > 0 && content[0] !== "-t2" && content[0] !== "-m") {
    firstArr.push(content.shift());
  }
  if (content.length > 0 && content[0] === "-t2") {
    content.shift();
  }
  while (content.length > 0 && content[0] !== "-t3" && content[0] !== "-m")
    secondArr.push(content.shift());
  if (content.length > 0 && content[0] === "-t3") {
    content.shift();
  }
  while (content.length > 0 && content[0] !== "-t4" && content[0] !== "-m")
    thirdArr.push(content.shift());
  if (content.length > 0 && content[0] === "-t4") {
    content.shift();
  }
  while (content.length > 0 && content[0] !== "-t5" && content[0] !== "-m")
    fourthArr.push(content.shift());
  if (content.length > 0 && content[0] === "-t5") {
    content.shift();
  }
  while (content.length > 0 && content[0] !== "-m")
    fifthArr.push(content.shift());
  if (content.length > 0 && content[0] === "-m") {
    isMock = true;
  }

  const str1 = firstArr.length === 0 ? "" : firstArr.join(" ");
  const str2 = secondArr.length === 0 ? "" : secondArr.join(" ");
  const str3 = thirdArr.length === 0 ? "" : thirdArr.join(" ");
  const str4 = fourthArr.length === 0 ? "" : fourthArr.join(" ");
  const str5 = fifthArr.length === 0 ? "" : fifthArr.join(" ");

  BotWork.getGeneratedMeme(id, str1, str2, str3, str4, str5, isMock)
    .then(res => {
      console.log(res);
      const attach = new Discord.Attachment(res);
      message.channel.send(attach);
    })
    .catch(err => {
      throw err;
    });
});
client.login(process.env.DC_TOKEN);
