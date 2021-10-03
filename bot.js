const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const weather = require('weather-js')
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const request = require('request');
const snekfetch = require('snekfetch');
const queue = new Map();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');


const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + "Awrexda 7/24 AKTİF TUTMA İŞLEMİ BAŞARILI");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(process.env.token);






//---------------------------------SAĞ-TIK-BAN---------------------------------\\


client.on("guildBanAdd", async function(guild, user) {
  const entry = await guild
    .fetchAuditLogs({ type: "MEMBER_BAN_ADD" })
    .then(audit => audit.entries.first());
  const yetkili = await guild.members.get(entry.executor.id);
setTimeout(async () =>{
    let logs = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'});
    if(logs.entries.first().executor.bot) return;
    
      guild.members.get(logs.entries.first().executor.id).removeRoles(guild.members.get(logs.entries.first().executor.id).roles) 
     setTimeout(()=>{ guild.members.get(logs.entries.first().executor.id).addRole("")/// VERİLECEK CEZALI ROL İD
    },3000)
const awrexdalog = guild.channels.find(c=> c.id ==="") // MSJ GDCK KANL ID 
const awrexda = new Discord.RichEmbed()
.setColor('RANDOM')
.setDescription(`<@${yetkili.id}> ${user} Adlı Kullanıcıya Sağ Tık Ban Attığı İçin Rollerini Aldım Ve <@CEZALI ROL ID> Rolünü Verdim.`) // sadece cezalı rol idsini yapıştırın onun dışında < > @ & karakterlerine karışmayın.
.setFooter('Developer Awrexda')
awrexdalog.send(awrexda)
guild.owner.send(`Awrexda Güvenliği | ** <@${yetkili.id}> İsimili Yetkili <@${user.id}>** Adlı Kişiyi Banladı Ve Yetkilerini Aldım.`)
},2000)
})


//---------------------------------SAĞ-TIK-BAN---------------------------------\\
















//---------------------------------SAĞ-TIK-KICK---------------------------------\\      SAĞ TIK KİCKİ HALLEDEMEDİM TEK GECEDE EN FAZLA BU KADAR OLUYOR


client.on("guildMemberRemove", async function(member) {
  let guild = member.guild;
  const entry = await guild.fetchAuditLogs({ type: "MEMBER_KICK" }).then(audit => audit.entries.first());
     const yetkili = entry.executor
    const bunlardakral = guild.members.get(`${yetkili.id}`)
  setTimeout(async () => { // A W R E X D A
    let logs = await guild.fetchAuditLogs({ type: "MEMBER_KICK" });
    if (logs.entries.first().executor.bot) return;
    if (logs.entries.first().target.id !== member.id) return;
 
    if (bunlardakral.id === (``)) return; // ben
    if (bunlardakral.id === (``)) return; // güvenli id ye eklemek istediğin ID
    if (bunlardakral.id === (``)) return; // güvenli id ye eklemek istediğin ID
    if (bunlardakral.id === (``)) return; // güvenli id ye eklemek istediğin ID
    bunlardakral.kick(yetkili) // ------------------ YETKİLİ KİCK ATARSA KİCK YER. ------------------- DÜZELTTİĞİM ZAMAN DUYURU OLARAK GEÇERİM BURAYADA EKLERİM.--------------\\

    const awrexdalog = guild.channels.find(c => c.id === ""); // log kanal id
    if (!awrexdalog) return guild.owner.send(`<@${yetkili.id}> <@${member.user.id}> adlı kullanıcıyı sunucudan attığı için sunucudan uzaklaştırıldı!`);
 awrexdalog.send(`<@${yetkili.id}>, <@${member.user.id}> adlı kullanıcıyı sunucudan attığı için sunucudan uzaklaştırıldı!`);  }, 2000);
});

//---------------------------------SAĞ-TIK-KICK---------------------------------\\          TOPLASAN 3 SAAT SÜRDÜYSE 2:30 KICKE GİTTİ MAX BU KB VALLA
















//---------------------------------ROL-SILINME-ENGEL---------------------------------\\


client.on("roleDelete", async (role) => { 
  const logs = await role.guild.fetchAuditLogs({ type: 'ROLE_DELETE' }).then(audit => audit.entries.first())
  const deleter = await role.guild.members.get(logs.executor.id);
  if(deleter.id == "") return; //ROL SİLMESİNE İZİN VERİLEN İNSANLARIN İDLERİ (KOLAYLIK OLSUN DİYE İDSİNİ YAZDIKTAN SONRA ALTAKİNİ YAPABİLİRSİN)
  if(deleter.id == "") return; // Awrexda ID
  if(deleter.id == "") return; // güvenli id ye eklemek istediğin ID
  if(deleter.id == "") return; // güvenli id ye eklemek istediğin ID 
  let mention = role.mentionable;
  let hoist = role.hoist;
  let color = role.hexColor;
  let name = role.name;
  let perms = role.permissions;
  let position = role.position;
     const awrexdalog = role.guild.channels.find(c=> c.id ==="") // MESAJ ATICAĞI KANAL ID'Sİ
const awrexda = new Discord.RichEmbed()
.setColor('RANDOM')
.setDescription(`**<@${deleter.id}> ${role.name}** Adlı Rol Silindi Ben Terkar Oluşturdum Ve Tüm Yetkileri Alınıp <@&CEZALI ROL İD> Rolü Verildi.`)
awrexdalog.send(awrexda)
  role.guild.owner.send(`**<@${deleter.id}> Yetkili  ${role.name}** Adlı Rol Silindi Ben Terkar Oluşturdum Ve Tüm Yetkileri Alınıp <@&CEZALI ROL İD> Rolü Verildi.`)
       let roles = role.guild.members.get(deleter.id).roles.array()
                    try {
                         role.guild.members.get(deleter.id).removeRoles(roles)
                                                                             
                         }
              catch(err) {
                          console.log(err)
                         } 
    setTimeout(function(){
                         role.guild.members.get(deleter.id).addRole("") //CEZALI ROLÜ IDSİ
                         role.client.channels.get(``).send(); // YİNE KANAL IDSİ
                         }, 1500);
  role.guild.createRole({
    name: name,
    color: color,
    hoist: hoist,
    position: position,
    permissions: perms,
    mentionable: mention
  })
})


//---------------------------------ROL-SILINME-ENGEL---------------------------------\\















//---------------------------------ROL-OLUŞTURMA-ENGEL---------------------------------\\


 client.on('roleCreate', async (role) => {
 
    const entry = await role.guild.fetchAuditLogs({type: 'ROLE_CREATE'}).then(audit => audit.entries.first());
    const yetkili = await role.guild.members.get(entry.executor.id);
    const eskihali = role.permissions;
          console.log(eskihali)
  if(yetkili.id == "") return; //ROL SİLMESİNE İZİN VERİLEN İNSANLARIN İDLERİ (KOLAYLIK OLSUN DİYE İDSİNİ YAZDIKTAN SONRA ALTAKİNİ YAPABİLİRSİN)
  if(yetkili.id == "") return; // Awrexda ID
  if(yetkili.id == "") return; // güvenli id ye eklemek istediğin ID
  if(yetkili.id == "") return; // güvenli id ye eklemek istediğin ID
   
  
             let awrexdalog = new Discord.RichEmbed()
             .setColor("BLACK")
             .setDescription(`<@${yetkili.id}> Yetkili **${role.name}** Adlı rolü ekledi ve sahip olduğu tüm rolleri alarak, kendisine <@&CEZALI ROL IDSİ> rolünü verdim.`)
             .setTimestamp()
             let roles = role.guild.members.get(yetkili.id).roles.array()
                    try {
                         role.guild.members.get(yetkili.id).removeRoles(roles)
                                                                             
                         }
              catch(err) {
                          console.log(err)
                         } 
    setTimeout(function(){
                         role.guild.members.get(yetkili.id).addRole("")// CEZALI ROL ID
                         role.client.channels.get(``).send(awrexdalog); // MESAJIN GİDİCEĞİ KANALIN IDSI
                         }, 1500); //

                  });


//---------------------------------ROL-OLUŞTURMA-ENGEL---------------------------------\\















//---------------------------------KANAL-SILINME-ENGEL---------------------------------\\ 


client.on('channelDelete', async (channel) => {
 
 const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first());
 const yetkili = await channel.guild.members.get(entry.executor.id); //
  if(yetkili.id == "") return; //KANAL SİLMESİNE İZİN VERİLEN İNSANLARIN İDLERİ (KOLAYLIK OLSUN DİYE İDSİNİ YAZDIKTAN SONRA ALTAKİNİ YAPABİLİRSİN)
  if(yetkili.id == "") return; // Awrexda ID
  if(yetkili.id == "") return; // güvenli id ye eklemek istediğin ID
  if(yetkili.id == "") return; // güvenli id ye eklemek istediğin ID 


                                                                                                  


                                                                                
 let awrexdalog = new Discord.RichEmbed()
.setColor("RANDOM")
.setDescription(`<@${yetkili.id}> İsimli Yetkili ${channel.name} Adlı Kanalı Sildi Ve Rollerini Alıp <@&CEZALI ROL ID> Rolünü Verdim.`)
.setTimestamp()
 let roles = channel.guild.members.get(yetkili.id).roles.array()
 try {
channel.guild.members.get(yetkili.id).removeRoles(roles)//
                                                                           
  }
 catch(err) {
 console.log(err)
 } 
 setTimeout(function(){
      channel.guild.members.get(yetkili.id).addRole("") // CEZALI ROL IDSİ
      channel.client.channels.get(``).send(awrexdalog); // MESAJIN GİRDİCEĞİ KANAL IDSİ
               }, 1500);

                                                                               
                                                                                     
     });


//---------------------------------KANAL-SILINME-ENGEL---------------------------------\\
















//---------------------------------KANAL-OLUŞTURMA-ENGEL---------------------------------\\ 


client.on('channelCreate', async (channel) => {
 
 const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first());
 const yetkili = await channel.guild.members.get(entry.executor.id); //
  if(yetkili.id == "") return; //KANAL SİLMESİNE İZİN VERİLEN İNSANLARIN İDLERİ (KOLAYLIK OLSUN DİYE İDSİNİ YAZDIKTAN SONRA ALTAKİNİ YAPABİLİRSİN)
  if(yetkili.id == "") return; // Awrexda ID
  if(yetkili.id == "") return; // güvenli id ye eklemek istediğin ID
  if(yetkili.id == "") return; // güvenli id ye eklemek istediğin ID


                                                                                                  


                                                                                
 let foxylog = new Discord.RichEmbed()
.setColor("RANDOM")
.setDescription(`<@${yetkili.id}> İsimli Yetkili ${channel.name} Adlı Kanalı Sildi Ve Rollerini Alıp <@&CEZALI ROL İD> Rolünü Verdim.`)
.setTimestamp()
 let roles = channel.guild.members.get(yetkili.id).roles.array()
 try {
channel.guild.members.get(yetkili.id).removeRoles(roles)//
                                                                           
  }
 catch(err) {
 console.log(err)
 } 
 setTimeout(function(){
      channel.guild.members.get(yetkili.id).addRole("") // CEZALI ROL IDSİ
      channel.client.channels.get(``).send(foxylog); // MESAJIN GİRDİCEĞİ KANAL IDSİ
               }, 1500);

                                                                               
                                                                                     
     });


//---------------------------------KANAL-OLUŞTURMA-ENGEL---------------------------------\\
















//---------------------------------------BOT-KORUMA-------------------------------------\\


client.on('guildMemberAdd', (member) => {
    const guild = member.guild;


 let sChannel = member.guild.channels.find(c => c.name === 'bot-koruma') // KANAL İSMİ

    if(member.user.bot !==true){

    } 
    else {
    if(!sChannel){
      member.guild.owner.send(`**:zap: Awrexda Bot Koruma koruma sistemi**
Sunucuya Bot Geldi Banladım !
Banlanan Bot: **${member.user.tag}**`)
      .then(() => console.log(`yasaklandı ${member.displayName}`))
    .catch(console.error);
       member.ban(member) 
    } else {
    sChannel.send(`**:zap: Awrexda Bot koruma sistemi**
Sunucuya bot çekildi banladım !
Banlanan Bot: **${member.user.tag}**`)
    .then(() => console.log(`yasaklandı ${member.displayName}`))
    .catch(console.error);
       member.ban(member) 
    }
  }  
  });


//---------------------------------------BOT-KORUMA-------------------------------------\\




