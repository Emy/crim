import { RedditImageCommand } from './redditimage';

export default class AnimemeCommand extends RedditImageCommand {

  constructor() {
    super('animeme', 'Get a random animeme.');
  }

  getLink(): string {
    return 'https://www.reddit.com/user/emdix/m/animemes/top/.json?sort=top&t=day&limit=500';
  }
}
