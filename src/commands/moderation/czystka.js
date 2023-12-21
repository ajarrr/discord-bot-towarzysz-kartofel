const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');

module.exports = {
    callback: async (client, interaction) => {
        if (!interaction.channel.permissionsFor(interaction.member).has('MANAGE_MESSAGES')) {
            return interaction.reply({content: 'Zejdz mi z oczu, Nie masz uprawnień do czystek', ephemeral: true});
        }
        const amount = interaction.options.getInteger('ilość');

        if (amount <= 0 || amount > 100) {
            return interaction.reply({content: `Towarzyszu w Związku nauczyli mnie tylko liczyć do 100`, ephemeral: true});
        } else {
            const fetched = await interaction.channel.messages.fetch({
                limit: amount,
            });

            const notTooOld = fetched.filter(msg => Date.now() - msg.createdTimestamp < 14 * 24 * 60 * 60 * 1000);

            if (notTooOld.size < fetched.size) {
                return interaction.reply({content: 'Towarzyszu nawet ja nie mam takiej mocy by usuwać wiadomości starszych niż ja', ephemeral: true});
            }

            interaction.channel.bulkDelete(notTooOld);
            interaction.reply({content: `Usunięto ${notTooOld.size} kapitalistycznych bzdur!`, ephemeral: true });
        }
        
        console.log(`⚠️ ${interaction.user.tag} użył komendy CZYSTKA`);
    },
    name: 'czystka',
    description: 'Pozbądź się kapitalistycznych bzdur',
    options: [ 
    {
        name: 'ilość',
        description: 'Ilość bzudr do usunięcia',
        type: ApplicationCommandOptionType.Integer,
        required: true,
    }
    ],
    permissionsRequired: [PermissionFlagsBits.ManageMessages],
    botPermissions: [PermissionFlagsBits.ManageMessages],
};
