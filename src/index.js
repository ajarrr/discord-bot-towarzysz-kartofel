require('dotenv').config();
const { Client, IntentsBitField, GatewayIntentBits, ActivityType  } = require('discord.js');
const mongoose = require('mongoose');
const eventHandler = require('./handlers/eventHandler');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildVoiceStates
  ],
});

(async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGODB_URI, { keepAlive: true });
    console.log('☎️ Łączenie z wywiadem. . .');

    eventHandler(client);
    
  } catch (error) {
    console.log(`⛔ Ten błąd zagłusza połączenie: ${error}`);
  }
})();

client.login(process.env.TOKEN);
