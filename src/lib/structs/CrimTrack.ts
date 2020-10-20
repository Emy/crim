export default class CrimTrack {
  title: string;
  track: string;
  uri: string;
  length: number;
  position: number;
  isSeekable: boolean;
  ytIdentifier: string;
  uploader: string;
  requestedBy: string;

  constructor(options: CrimTrackOptions) {
    this.title = options.title;
    this.track = options.track;
    this.uri = options.uri;
    this.length = options.length;
    this.position = options.position;
    this.isSeekable = options.isSeekable;
    this.ytIdentifier = options.ytIdentifier;
    this.uploader = options.uploader;
    this.requestedBy = options.requestedBy;
  }
}

interface CrimTrackOptions {
  title: string;
  track: string;
  uri: string;
  length: number;
  position: number;
  isSeekable: boolean;
  ytIdentifier: string;
  uploader: string;
  requestedBy: string;
}
