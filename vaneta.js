const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

client.on("ready", () => {
    console.log(`Bot has started`); 
    client.user.setActivity(`hentai`, {type:"WATCHING"});
  });
            
client.on("message", async message => {
    if(message.author.bot) return;
    if(message.content.indexOf(config.prefix) !== 0) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
      if(message.channel.id !== "456815468938788866") {
      if(!message.member.roles.some(r=>["🛡Owner🛡", "Co-Owner", "🔨Developer🔨"].includes(r.name)) )
            return(message.reply("post it on <#456815468938788866>"))
      }
  
    var fortunes = [
      "yes",
      "no",
      "maybe",
      "fuck u"
    ]
    if(command === "ping") {
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
      }
    if(command === "buy") {
        let embed = new Discord.RichEmbed()
        .setColor(0xf44141)
        .setDescription("Vaneta is not on sale at the moment.")
        message.channel.sendEmbed(embed)
      }
    if(command === "say") {
      if(!message.member.roles.some(r=>["🛡Owner🛡", "Co-Owner", "🔨Developer🔨"].includes(r.name)) )
      return(
        error = new Discord.RichEmbed()
        .setColor(0xed3434)
        .addField("Error", "Sorry, you don't have permissions to use this!"),
        message.channel.sendEmbed(error)
      );  
        const strx = args.join(" ");
        message.delete().catch(O_o=>{}); 
        message.channel.send(strx);
      }

      if(command === "kick") {
        if(!message.member.hasPermission("KICK_MEMBERS"))
        return(
          error = new Discord.RichEmbed()
          .setColor(0xed3434)
          .addField("Error", "Sorry, you don't have permissions to use this!"),
          message.channel.sendEmbed(error)
        );         
        let member = message.mentions.members.first();
        if(!member)
        return(
          error = new Discord.RichEmbed()
          .setColor(0xed3434)
          .addField("Error", "Please mention a valid member of this server"),
          message.channel.sendEmbed(error)
        ); 
        if(!member.kickable) 
        return(
          error = new Discord.RichEmbed()
          .setColor(0xed3434)
          .addField("Error", "I can't do this"),
          message.channel.sendEmbed(error)
        );     
        let reason = args.slice(1).join(' ');
        if(!reason) reason = "No reason provided";
        
        
        await member.kick(reason)
          .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
          let embed = new Discord.RichEmbed()
          .setColor(0x21dd43)
          .setDescription(`${member} has been kicked by ${message} because: ${reason}`)
          message.channel.sendEmbed(embed)
    
      }
      if(command === "embed") {
        const strx = args.join(" ");
        if(!strx) return;
        let msgx = args.slice(1).join(' ');
        if(!msgx) return;
        message.delete().catch(O_o=>{}); 

        let embed = new Discord.RichEmbed()
        .setColor(strx)
        .setDescription(msgx)
        message.channel.sendEmbed(embed)
      }
      if(command === "ban") {
        if(!message.member.hasPermission("BAN_MEMBERS"))
        return(
          error = new Discord.RichEmbed()
          .setColor(0xed3434)
          .addField("Error", "Sorry, you don't have permissions to use this!"),
          message.channel.sendEmbed(error)
        );  

        let member = message.mentions.members.first();
        if(!member)
        return(
          error = new Discord.RichEmbed()
          .setColor(0xed3434)
          .addField("Error", "Please mention a valid member of this server"),
          message.channel.sendEmbed(error)
        ); 
        if(!member.bannable) 
        return(
          error = new Discord.RichEmbed()
          .setColor(0xed3434)
          .addField("Error", "I can't do this"),
          message.channel.sendEmbed(error)
        );     
        let reason = args.slice(1).join(' ');
        if(!reason) reason = "No reason provided";
        
        await member.ban(reason)
          .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
        let embed = new Discord.RichEmbed()
        .setColor(0x21dd43)
        .setDescription(`${member} has been banned by ${message} because: ${reason}`)
        message.channel.sendEmbed(embed)
      }
      
      if(command === "clear") {
        if(!message.member.hasPermission("MANAGE_MESSAGES"))
        return(
          error = new Discord.RichEmbed()
          .setColor(0xed3434)
          .addField("Error", "Sorry, you don't have permissions to use this!"),
          message.channel.sendEmbed(error)
        );         
        const deleteCount = parseInt(args[0], 10);
        
        if(!deleteCount || deleteCount < 2 || deleteCount > 100)
        return(
          error = new Discord.RichEmbed()
          .setColor(0xed3434)
          .addField("Error", "Please provide a number between 2 and 100 for the number of messages to delete"),
          message.channel.sendEmbed(error)
        );  
                message.channel.bulkDelete(deleteCount)
          .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
      }
    
      if(command === "zeploit") {
        let clientrole = config.clientrole
          if(message.member.roles.has(clientrole))
          return(
            error = new Discord.RichEmbed()
            .setColor(0xed3434)
            .addField("Error", "You already have the clients role."),
            message.channel.sendEmbed(error)
          );            
          let db = config.clients
          if(!db.includes(message.author.id)) 
          return(
            error = new Discord.RichEmbed()
            .setColor(0xed3434)
            .addField("Error", "Sorry, this command is for Zeploit buyers only."),
            message.channel.sendEmbed(error)
          );
          message.member.addRole(clientrole)
          let embed = new Discord.RichEmbed()
          .setColor(0x5ad829)
          .addField("Success", "Now you have the buyers role.")
          message.channel.sendEmbed(embed)

      }
      if(command === "8ball") {
        const strx = args.join(" ");
        if(!strx) return;
        message.reply(fortunes[Math.floor(Math.random() * fortunes.length)]);
      }
     if(command === "addbuyer") {
        if(!message.member.hasPermission("ADMINISTRATOR"))
        return(
          error = new Discord.RichEmbed()
          .setColor(0xed3434)
          .addField("Error", "Sorry, you don't have permissions to use this!"),
          message.channel.sendEmbed(error)
        );          
        let clientrole = config.clientrole
        let member = message.mentions.members.first();
        if(!member)
        return(
          error = new Discord.RichEmbed()
          .setColor(0xed3434)
          .addField("Error", "Please mention a valid member of this server"),
          message.channel.sendEmbed(error)
        );         
        message.member.addRole(clientrole)
        let embed = new Discord.RichEmbed()
        .setColor(0x21dd43)
        .setDescription(`${member} is now a buyer`)
        message.channel.sendEmbed(embed)
     }
     if(command === "removebuyer") {
        if(!message.member.hasPermission("ADMINISTRATOR"))
        return(
          error = new Discord.RichEmbed()
          .setColor(0xed3434)
          .addField("Error", "Sorry, you don't have permissions to use this!"),
          message.channel.sendEmbed(error)
        );  
        let clientrole = config.clientrole
        let member = message.mentions.members.first();
        if(!member)
        return(
          error = new Discord.RichEmbed()
          .setColor(0xed3434)
          .addField("Error", "Please mention a valid member of this server"),
          message.channel.sendEmbed(error)
        );         
        message.member.removeRole(clientrole)
        let embed = new Discord.RichEmbed()
        .setColor(0x21dd43)
        .setDescription(`${member} is no longer a buyer`)
        message.channel.sendEmbed(embed)
     }
     if(command === "unban") {
        if(!message.member.hasPermission("ADMINISTRATOR"))
        return(
          error = new Discord.RichEmbed()
          .setColor(0xed3434)
          .addField("Error", "Sorry, you don't have permissions to use this!"),
          message.channel.sendEmbed(error)
        );    
        const ied = args.join(" ");
        message.guild.unban(ied)
        message.channel.send(`<@${ied}> was unbanned`)
     }
     if(command === "credits") {
         message.channel.sendMessage("Bot created by Astolfo#5859")
     }
     if(command === "userinfo") {
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!member)
          return message.reply("Please mention a valid member of this server");
         let embed = new Discord.RichEmbed()
         .addField("User", member)
         .addField("ID", member.id)
         .addField("Highest Role", member.highestRole)
         .addField("Joined at", member.joinedAt)
         .setThumbnail(member.user.avatarURL)
         message.channel.sendEmbed(embed)
     }
     if(command === "ratewaifu") {
      const strx = args.join(" ");
      if(!strx) return message.reply("what's your waifu ?")
      Math.floor((Math.random() * 10) + 1);
      message.channel.send(`**${message.member.displayName}**, ${strx} is ${Math.floor((Math.random() * 10) + 1)}/10`)
     }
     if(command === "help") {
       const embed = new Discord.RichEmbed()
       .addField("Commands", ";zeploit - Get your client role back \n;ban <@mention>\n;kick <@mention>\n;say [text]\n;addbuyer <@mention>\n;removebuyer <@mention>\n;unban <id>\n;credits\n;ping\n;say <text>\n;embed <color> <message>\n;8ball <message>\n;ratewaifu <waifu> \n;eval <code\n;buy")
       .setFooter("Bot created by Astolfo#5859")
       message.channel.sendEmbed(embed)
     }
  function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
  
      if(command === "eval") {
      if(message.author.id !== "406486987176935434") 
      return(
        error = new Discord.RichEmbed()
        .setColor(0xed3434)
        .addField("Error", "Sorry, you don't have permissions to use this!"),
        message.channel.sendEmbed(error)
      );      
      try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
      if(command === "gay") {
    let member = message.mentions.members.first();
      if(!member)
        return message.reply("Please mention a valid member of this server");
    let embed = new Discord.RichEmbed()
    .setColor(0xf442ce)
    .setDescription(`${member} is **${Math.floor(Math.random() * 100) + 1}%** gay`)
    message.channel.sendEmbed(embed)
  }
    });

    client.login(config.token)
