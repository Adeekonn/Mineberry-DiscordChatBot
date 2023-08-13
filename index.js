
const mineflayer = require('mineflayer');
const { Client, Intents, MessageEmbed } = require('discord.js');
goFromLobby()
function goFromLobby() {
const bot = mineflayer.createBot({
  host: 'eu.mineberry.org',
  port: 25565,
  username: 'JojoSiwanOT',
});




const clientIntents = [
  Intents.FLAGS.GUILDS,         
  Intents.FLAGS.GUILD_MESSAGES, 
];

const discordToken = 'ENTER OWN TOKEN'; 
const discordChannelId = 'ENTER OWN CHANNEL'; 

const client = new Client({ intents: clientIntents }); 



client.on('message', (message) => {
  if (message.content === '!help') {
    const helpEmbed = new MessageEmbed()  
      .setTitle('OP SURVIVAL 1')
      .addField('!help', 'Display this help message')
      .addField('!status', 'Check the status of the Minecraft server')
      .addField('!players', 'List the players currently online')
      .setColor('#00ff00');
    message.channel.send({ embeds: [helpEmbed] });  
  }
});

client.on('message', async (message) => {
  if (message.content === '!status') {
    
    const isServerOnline = bot.players !== null;
    const statusMessage = isServerOnline ? 'Op Survival 1:  🟢 ' : 'Op Survival 1:  🔴 ';

    const statusEmbed = new MessageEmbed()
      .setTitle('Server Status')
      .setDescription(statusMessage)
      .setColor(isServerOnline ? '#00ff00' : '#ff0000');

    message.channel.send({ embeds: [statusEmbed] });
  }
});


client.on('message', async (message) => {
  if (message.content === '!players') {
    if (bot.players) {
      const players = Object.keys(bot.players).join(', ');
      message.channel.send(`Players online: ${players}`);
    } else {
      message.channel.send('No players are currently online.');
    }
  }
});












client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

let cooldown = false
var regex = /[^A-Za-z0-9 !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;

client.on('message', (message) => {
  if(cooldown) return;
  cooldown = true
  setTimeout(() => {
    cooldown = false
  }, 2000);

  if (message.channel.id === discordChannelId && !message.author.bot) {
    const minecraftMessage = `[Discord] ${message.author.username}: ${message.toString().replaceAll(regex, "").replaceAll("nigga", "***").replaceAll("nigger", "***").replaceAll("aternos", "*").replaceAll(".", "*").replaceAll("net", "*").replaceAll("mc", "*").replaceAll("me", "*").replaceAll(":", "*")}`;
    bot.chat(minecraftMessage);
  }
});


bot.on('login', function() {
  bot.chat(`/register qwertyuiop`)
  bot.chat(`/login qwertyuiop`)
  console.log("Login Sucessful")
});

bot.on('login', () => {
  console.log('Bot logged into Minecraft');
});

bot.once('spawn', () => {
  setTimeout(() => {
    bot.chat('/opsurv');
  }, 5000);
});


bot.on('message', (message) => {
  
  const formattedMessage = message.toString().trim();
  if (formattedMessage) {
      if (/^\[\w+\] \w+ {2}→ .*/.test(formattedMessage)) {
      }
      if (formattedMessage.startsWith('|| You were moved to lobby') || formattedMessage.startsWith('| Chat is muted in lobby.') || formattedMessage.startsWith('|| You were moved to lobby ▸ Internal Exception: io.netty.handler.codec.EncoderException: java.lang.NullPointerException')) {
          bot.quit()
          console.log("REJOINIGNIGNNGI")
          goFromLobby();
      }
  }
});

bot.on('message', (message) => {
  const formattedMessage = message.toString().trim().replaceAll("@", "");
  if (formattedMessage) {
    console.log(message.toAnsi());

    
    const discordChannel = client.channels.cache.get(discordChannelId);
    if (discordChannel) {
      discordChannel.send(formattedMessage);
    }
  }
});
bot.once('windowOpen', (win) => {
  bot.clickWindow(10, 1, 0);
});

client.login(discordToken);
}