const { PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'zart',
  description: 'Wysyła dzienną dawkę propagandy i humoru',

  permissionsRequired: [PermissionFlagsBits.SendMessages],
  botPermissions: [PermissionFlagsBits.SendMessages],

  callback: async (client, interaction) => {
    await interaction.deferReply();

    const messages = ["> *„Nieważne, kto głosuje, ważne, kto liczy głosy“* ~Józef Stalin",
    "> *„A ile dywizji ma papież?“* ~Józef Stalin",
     "> *„Wprowadzenie komunizmu w Polsce byłoby podobne do nałożenia siodła na krowę.“* ~Józef Stalin",
     "> *„Amerykanie są jak Rosjanki; im więcej ich tłuczesz, tym bardziej cię kochają.“* ~Józef Stalin",
     "> *„Ja mam ludzi mnogo!“* ~Józef Stalin",
     "> *„Trzeba dużo odwagi, żeby być tchórzem w Armii Czerwonej“* ~Józef Stalin",
     "> *„Strzelacie nie do nas, strzelacie do Armii Czerwonej“* ~Michaił Tuchaczewski",
     "> *„Będę się nazywał Meier, jeżeli nad Niemcami pojawi się chociaż jeden wrogi samolot“* ~Herman Meyer",
     "> *„Śmierć jednego to tragedia, miliona statystyka“* ~Józef Stalin"];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    interaction.editReply(randomMessage);

    console.log(`⚠️ ${interaction.user.tag} użył komendy ZART`);
    },
};
