import { RedditImageCommand } from './redditimage';

export default class DankmemeCommand extends RedditImageCommand {
  constructor() {
    super('dankmeme', 'Get a random dank meme.');
  }

  getLink(): string {
    return 'https://www.reddit.com/user/emdix/m/dankmemes/top/.json?sort=top&t=day&limit=500';
  }
}
