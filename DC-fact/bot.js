const Discord = require("discord.js");
const client = new Discord.Client();
const DucCon = require("./methods");
var http = require("http");
const dc = new DucCon(10);
require("dotenv").config();
var spamer = undefined;
client.on("ready", () => {
  console.log("Ready to spam");
});
client.on("message", message => {
  const content = message.content.split(" ");
  const prefix = content.shift().toLowerCase();
  if (prefix !== "!fact") return;
  if (content.length <= 0) {
    message.channel.send("Type -h for a list of command");
    return;
  }
  if (content[0] === "-h") {
    message.channel.send({ embed: DucCon.getHelp() });
    return;
  }
  if (content[0] === "-get") {
    DucCon.getUselessFact()
      .then(res => {
        message.channel.send({
          embed: { title: "Did you know?", description: res }
        });
      })
      .catch(err => {
        throw err;
      });
    return;
  }

  if (content[0] === "-start" || content[0] === "-set") {
    var factChannel = client.channels.find(
      channel => channel.id === process.env.FACT_CHANNEL
    );

    if (content[0] === "-set") {
      content.shift();
      if (content.length === 0) {
        message.channel.send("Please specify a time duration in seconds");
        return;
      }
      if (!spamer) {
        const time = parseInt(content[0]);
        dc.setTime(time);
        message.channel.send("DC will spill heresy every " + time + " seconds");
      }
    }
    if (!spamer) {
      spamer = setInterval(() => {
        DucCon.getUselessFact()
          .then(res => {
            factChannel.send({
              embed: { title: "Did you know?", description: res }
            });
          })
          .catch(err => {
            throw err;
          });
      }, dc.time);
    } else {
      message.channel.send(
        "DC is talking. Make him stfu first before start a new monologue"
      );
      return;
    }
  }
  if (content[0] === "-stop") {
    clearInterval(spamer);
    spamer = undefined;
    message.channel.send("DC has stfu");
  }
});

client.login(process.env.FACTBOT_TOKEN);
http.createServer().listen(process.env.PORT || 4000, () => {
  console.log("DC start talking");
});
