import { MessageEmbed } from 'discord.js';
import { Command, CommandStore, KlasaClient, KlasaMessage, TextPrompt, Usage } from 'klasa';
import { LoadTrackResponse } from 'shoukaku';
import FiloClient from './../../../lib/client';

export default class extends Command {
  client: FiloClient;
  constructor(client: FiloClient, store: CommandStore, file: string[], dir: string) {
    super(client, store, file, dir, {
      enabled: true,
      runIn: ['text'],
      requiredPermissions: ['EMBED_LINKS'],
      aliases: ['p'],
      cooldown: 0,
      description: (lang) => lang.get('PLAY_DESCRIPTION'),
      usage: '<track:...string>',
      usageDelim: ' ',
    });
  }

  async run(msg: KlasaMessage, [song]: [string]) {
    if (!msg.member.voice.channel) return msg.send('You are not in a VoiceChannel right now.');
    const node = this.client.shoukaku.getNode();
    const tracks = await node.rest.resolve(song, 'youtube');
    if (!tracks) return msg.send('No tracks found.');
    if (Array.isArray(tracks)) {
      const dispatcher = await this.client.queue.handleTrack(node, tracks.shift(), msg);
      tracks.forEach((track) => {
        this.client.queue.handleTrack(node, track, msg);
      });
      msg.send('Added Playlist...');
      if (dispatcher) await dispatcher.play();
      return null;
    }

    // Should be a LoadTrackResponse at this point.
    const ltr = tracks as LoadTrackResponse;
    if (Array.isArray(ltr.tracks)) {
      ltr.tracks = ltr.tracks.slice(0, 5);
      const embed = new MessageEmbed()
        .setTitle('Music search')
        .setDescription('Type in the number of the track you wanna play...');
      let counter = 1;
      for (const track of ltr.tracks) {
        embed.addField(`**#${counter++}** ${track.info.title}`, track.info.author);
      }
      await msg.send(embed);
      const usage = new Usage(msg.client as KlasaClient, '(selection:selection)', ' ');
      usage.createCustomResolver('selection', (arg: string) => {
        const tracknumber = parseInt(arg);
        if (tracknumber > 0 && tracknumber <= ltr.tracks.length) return tracknumber;
        throw `Track number doesn't exist`;
      });
      const prompt = new TextPrompt(msg, usage, { limit: 3 });
      const response = (await prompt.run('Please select the Track')) as number;
      const dispatcher = await this.client.queue.handleTrack(node, ltr.tracks[response - 1], msg);
      msg.send(`Added **${ltr.tracks[response - 1].info.title}** to the queue!`);
      if (dispatcher) await dispatcher.play();
    }
  }
}
