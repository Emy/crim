class EventHandlers {
  static onEvent(param) {
    if (param instanceof Error || param instanceof Object) console.error(param);
    this.leave();
  }
}

class Dispatcher {
  constructor(options) {
    this.client = options.client;
    this.guild = options.guild;
    this.textChanel = options.textChannel;
    this.player = options.player;
    this.queue = [];
    this.playing = null;

    this.onEvent = EventHandlers.onEvent.bind(this);

    this.player.on('end', () => {
      this.play().catch((error) => {
        console.error(error);
        this.leave();
      });
    });
    this.player.on('closed', this.onEvent);
    this.player.on('error', this.onEvent);
    this.player.on('nodeDisconnect', this.onEvent);
    this.player.on('trackException', this.onEvent);
  }

  async leave() {
    this.player.disconnect();
    this.client.queue.delete(this.guild.id);
  }

  async play() {
    if (!this.client.queue.has(this.guild.id) || !this.queue.length) return this.leave();
    this.current = this.queue.shift();
    await this.player.playTrack(this.current.track);
    this.playing = true;
    this.textChanel.send(`Playing: ${this.current.info.title}`);
  }

  async addTrack(track) {
    this.queue.push(track);
  }
}

export default Dispatcher;
