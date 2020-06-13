const botSettings = require("./botsettings.json")
const Discord = require("discord.js");
const fs = require("fs");
const ytdl = require("ytdl-core");
const request = require("request");
const client = new Discord.Client();
const prefix = botSettings.prefix;
const DBL = require("dblapi.js");
const dbl = new DBL(process.env.dblapi, client);
const PREFIX = '/';
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();




const ms = require("ms");
let selfId = '';

bot.on('ready', () => {
    console.log(`Logged in!`);
    selfId = bot.user.id;
    bot.user.setStatus('available')
    bot.user.setPresence({
        game: {
            name: 'On The Holy Server',
            type: "Playing",


        }
    });
});


fs.readdir("./cmds", (err, files) => {
    if(err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0) {
        console.log("No commands found to load!");
        return;
    }

    console.log(`Loading ${jsfiles.length} commands!`);

    jsfiles.forEach((f, i) => {
        let props = require(`./cmds/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});

bot.on('message', message => {
  if (!message.guild) return;
  if (message.content.startsWith('/kick')) {
    if (!message.member.roles.find("name", "Swearsie Police")){
      message.channel.send('You need the \`Swearsie Police\` role to use this command.');
          return;
    }
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member.kick({
          reason: 'They were bad!',
        }).then(() => {
          message.reply(":wave: " + member.displayName + " has been successfully kicked :point_right: ");
        }).catch(err => {
          message.reply('I was unable to kick the member');
          console.error(err);
        });
      } else {
        message.reply('That user isn\'t in this guild!');
      }
    } else {
      message.reply('You didn\'t mention the user to kick!');
    }
  }
});
bot.on('message', message => {
  if (!message.guild) return;
  if (message.content.startsWith('/ban')) {
    if (!message.member.roles.find("name", "Admin")){
      message.channel.send('You need the \`Admin\` role to use this command.');
          return;
    }
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member.ban({
          reason: 'They were bad!',
        }).then(() => {
          message.reply(":wave: " + member.displayName + " has been successfully banned :point_right: ");
        }).catch(err => {
          message.reply('I was unable to ban the member');
          console.error(err);
        });
      } else {
        message.reply('That user isn\'t in this guild!');
      }
    } else {
      message.reply('You didn\'t mention the user to ban!');
    }
  }
});
bot.on('message', message => {
if (message.content.toLowerCase() == "nigger" || message.content.toLowerCase() == "negger"|| message.content.toLowerCase() == "nogger"|| message.content.toLowerCase() == "nagger") {
    message.reply("Dont say such a bad word! <@252670200317607937> Please add 1 Dollar to the swear jar!");
  }
  if (message.content == "/swearjar") {
    message.reply("You can add to the swear jar here: https://docs.google.com/document/d/1mb-lUMhhK7fgF7cEAP2pPOrVOJw0c6l0vC5ePa26ubU/edit")
  }
  if (message.content == "/killmyself") {
    message.reply("pls no")
  }
  if (message.content == "/killyourself") {
    message.reply("pls no dont bully me i hav so much to live for")
  }






});
bot.on('message', message => {
    let msg = message.content.toUpperCase();
    let sender = message.author; //
    let cont = message.content.slice(prefix.length).split(" ");
    let args = cont.slice(1);
if (msg.startsWith(prefix + 'PURGE')) {
    async function purge() {
        message.delete();
        if (!message.member.roles.find("name", "Swearsie Police")) {
            message.channel.send('You need the \`Swearsie Police\` role to use this command.');
            return;
        }
        if (isNaN(args[0])) {
            message.channel.send('Please use a number as your arguments. \n Usage: ' + prefix + 'purge <amount>');
            return;
        }
        const fetched = await message.channel.fetchMessages({limit: args[0]});
        console.log(fetched.size + ' messages found, deleting...');

        message.channel.bulkDelete(fetched)
            .catch(error => message.channel.send(`Error: ${error}`));
    }
    purge();
}
});



bot.on('message', (message) => {
    const content = message.content;
    const channel = message.channel;

    if (content === '/ping') {

        const start = Date.now();

        // Hey PHPStorm, shut up
        // noinspection JSUnresolvedVariable, JSUnresolvedFunction
        bot.rest.methods.getUser(selfId, false)
            .then(() => {
                const passed = Date.now() - start;

                // noinspection JSIgnoredPromiseFromCall
                channel.send(`Pong! Your ping is: \`${passed}\``);
            })
            .catch(console.error);
    }
});
bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if(!command.startsWith(prefix)) return;

    let cmd = bot.commands.get(command.slice(prefix.length));
    if(cmd) cmd.run(bot, message, args);

});



bot.login('Njc2MzM1OTM5MjI4MDA4NDQ4.XuOF-g.PbkpNpiUTM9Mu_mkb2pbOUPgVbs');
