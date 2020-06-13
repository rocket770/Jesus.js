module.exports.run = async (bot, message, args) => {
    if(!message.member.roles.find("name", "Swearsie Police")) return message.channel.send('You need the \`Swearsie Police\` role to use this command.');

        let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if(!toMute) return message.channel.sendMessage("Please mention an user or ID to mute!");

        let role = message.guild.roles.find(r => r.name === "Jesus Mute")
        
        if(!role || !toMute.roles.has(role.id)) return message.channel.sendMessage("This user is not muted!");

        await toMute.removeRole(role);
        message.channel.sendMessage("The user has been unmuted!");

        message.delete();

     }
    
        module.exports.help = {
            name: "unmute"
        }