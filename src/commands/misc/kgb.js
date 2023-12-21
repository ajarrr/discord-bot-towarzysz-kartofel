const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */

  callback: async (client, interaction) => {

    const mentionable = interaction.options.get('towarzysz').value;
    
      const targetUser = await interaction.guild.members.fetch(mentionable);

      const messages = [`KGB ma cię na oku https://tenor.com/view/vladimir-putin-wink-president-of-russia-gif-14869234`,
    'Widziałeś Ukraine? U ciebie będzie podobnie https://media.giphy.com/media/KzKXmxsMue4CSxzYBK/giphy.gif',
    'Stalin cie żegna towarzyszu, podobno byłeś dobrym komuchem https://c.tenor.com/BVpAQ6Dusg8AAAAC/tenor.gif',
    `Czy wiesz że Stalin zabił tylko jednego człowieka ze snajperki? Podobno nazywał się ${targetUser} https://c.tenor.com/HAIQw5G4am0AAAAC/tenor.gif`,
    '139.170.131.108 to twoje ip? Nie? To niedługo będzie https://c.tenor.com/jCk8c5_Q4J0AAAAC/tenor.gif',
    'Każdy może zostać komunistą, nawet kot https://c.tenor.com/evoSxqcmKCYAAAAd/tenor.gif',
    'Stalin nie tylko był wodzem Związku Radzieckiego, a także czarodziejem - ||potrafił sprawić aby ludzie znikali|| https://c.tenor.com/ZA2_zAb0ZvAAAAAd/tenor.gif',
    'Czy wiedziałeś że w białorusi jeden ziemniak kosztuje 6.48 zł? https://media.giphy.com/media/U1rlk8zdcAwbm/giphy.gif',
    'Czy wiedziałeś że 1 robux kosztuje $0.0125, a rubel $0.011 https://media.giphy.com/media/15wC7XdIXN5q8o6fr9/giphy-downsized-large.gif',
    ];

      const randomMessage = messages[Math.floor(Math.random() * messages.length)];

      targetUser.send(randomMessage);
  
      interaction.reply({content: `Użytkownik został ostrzeżony!🫡`, ephemeral: true});
      
      console.log(`⚠️ ${interaction.user.tag} użył komendy KGB`);
  },

  name: 'kgb',
  description: 'Ostrzeż Towarzysza',
  options: [
    {
      name: 'towarzysz',
      description: 'Towarzysz do odstrzału',
      type: ApplicationCommandOptionType.Mentionable,
      required: true,
    },
  ],
};
