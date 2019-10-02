const { Extendable } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Extendable {
  constructor(...args) {
    super(...args, {
      enabled: true,
      appliesTo: [MessageEmbed],
    });
  }

  setProvidedBy(provider) {
    const providedBy = this.lang.get('FOOTER_PROVIDED_BY');
    this.setFooter(
        this.footer.text + ` | ${providedBy} ${provider}`,
        this.footer.iconURL
    );
    return this;
  };

  setEmoteTitle(sender, receiver, type, isFriendly) {
    const friendlyReaction = ['OwO', 'UwU', 'awoo', ':3', '^~^'];
    const angryReaction = ['>.>', '>.<', '>:(', 'baka!'];
    let suffix;
    if (isFriendly) {
      suffix = friendlyReaction[Math.floor((Math.random()*friendlyReaction.length))];
    } else {
      suffix = angryReaction[Math.floor((Math.random()*angryReaction.length))];
    }
    this.setTitle(this.lang.get('EMOTE_TITLE',
        sender,
        this.lang.get(type),
        receiver,
        suffix,
    ));
    return this;
  };

  send() {
    return this.msg.send(this);
  };
};
