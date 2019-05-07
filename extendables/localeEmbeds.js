const {

    Extendable,
} = require('klasa');

const { MessageEmbed } = require('discord.js');

module.exports = class extends Extendable {

    constructor(...args) {

        super(...args, {

            name: 'MessageEmbed',
            appliesTo: [MessageEmbed],
            enabled: true,
            klasa: false
        });
    }

    addLocalField(localizedHead, localizedBody, inlineValue, message) {

        let lang = message.language;

        let localizedName = lang.get(localizedHead);
        let localizedValue = lang.get(localizedBody);

        this.fields.push(this.constructor.checkField(localizedName, localizedValue, inlineValue));

        return this;
    }

    addLocalVarField(localizedHead, localizedBody, [headValues], [bodyValues], inlineValue, message) {

        let lang = message.language;

        let localizedName = lang.get(localizedHead, [headValues]);
        let localizedValue = lang.get(localizedBody, [bodyValues]);

        this.fields.push(this.constructor.checkField(localizedName, localizedValue, inlineValue));

        return this;
    }
};