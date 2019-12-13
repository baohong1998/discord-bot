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
  if (prefix !== "!meme") return;
  const memedStr = content.join(" ");
  BotWork.getMockSponge(memedStr)
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
