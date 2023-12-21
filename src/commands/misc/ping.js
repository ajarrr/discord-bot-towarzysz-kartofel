const { PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'ping',
  description: 'Jak każdy czerwony umiem grać w ping-ponga',

  callback: async (client, interaction) => {
    await interaction.deferReply();

    const reply = await interaction.fetchReply();

    const ping = reply.createdTimestamp - interaction.createdTimestamp;

    interaction.editReply(
      `Pong! W Moskwie jest ${ping}ms`
    );

    console.log(`⚠️ ${interaction.user.tag} użył komendy PING`);

  },
};
