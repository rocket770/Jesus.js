const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '/';
const PREFIX = '/';

const ms = require("ms");
let selfId = '';

client.on('ready', () => {
    console.log(`Logged in!`);
    selfId = client.user.id;
    client.user.setStatus('available')
    client.user.setPresence({
        game: {
            name: 'On The Holy Server',
            type: "Playing",


        }
    });
});
client.on('message', message => {
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
client.on('message', message => {
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
client.on('message', message => {
if (message.content.toLowerCase() == "nigger" || message.content.toLowerCase() == "negger"|| message.content.toLowerCase() == "nogger"|| message.content.toLowerCase() == "nagger") {
    message.reply("Dont say such a bad word! <@252670200317607937> Please add 1 Dollar to the swear jar!");
  }
  if (message.content == "/swearjar") {
    message.reply("You can add to the swear jar here: https://docs.google.com/document/d/1mb-lUMhhK7fgF7cEAP2pPOrVOJw0c6l0vC5ePa26ubU/edit")
  }
});
client.on('message', message => {
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

client.on('message', message => {
    let args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case 'mute':
        if (!message.member.roles.find("name", "Swearsie Police")){
          message.channel.send('You need the \`Swearsie Police\` role to use this command.');
              return
            }
            var person  = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
            if(!person) return  message.reply("I Can't seem to find that person")

            let mainrole = message.guild.roles.find(role => role.name === "Pokemon Master");
            let role = message.guild.roles.find(role => role.name === "NO");


            if(!role) return message.reply("I Couldn't find the \`NO\` role.")


            let time = args[2];
            if(!time){
                return message.reply("You didnt specify a time!");
            }

            person.removeRole(mainrole.id)
            person.addRole(role.id);


            message.channel.send(`@${person.user.tag} has now been muted for ${ms(ms(time))}`)

            setTimeout(function(){

                person.addRole(mainrole.id)
                person.removeRole(role.id);
                //console.log(role.id)
                message.channel.send(`@${person.user.tag} has been unmuted.`)
            }, ms(time));


        break;
    }


});
client.on('message', (message) => {
    const content = message.content;
    const channel = message.channel;

    if (content === '/ping') {

        const start = Date.now();

        // Hey PHPStorm, shut up
        // noinspection JSUnresolvedVariable, JSUnresolvedFunction
        client.rest.methods.getUser(selfId, false)
            .then(() => {
                const passed = Date.now() - start;

                // noinspection JSIgnoredPromiseFromCall
                channel.send(`Pong! Your ping is: \`${passed}\``);
            })
            .catch(console.error);
    }
});


client.login('Njc2MzM1OTM5MjI4MDA4NDQ4.XkJq5w.l-hqebGbjKeYDiUFqPOflvNFNdo');
