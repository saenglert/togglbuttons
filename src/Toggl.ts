import request from "./Request";

interface Options {
  apiToken?: string;
  apiUrl?: string;
  reportsUrl?: string;
}

const DEFAULTS: Options = {
  apiToken: undefined,
  apiUrl: "https://www.toggl.com/api/v8/",
  reportsUrl: "https://toggl.com/reports/api/v2",
};

type TimeStamp = string;

interface TimeEntry {
  description: string;
  wid: number;
  pid?: number;
  tid?: number;
  billable?: boolean;
  start: TimeStamp;
  stop?: TimeStamp;
  created_with: string;
  tags?: string[];
  duronly?: boolean;
  at: TimeStamp;
}

interface Project {
  name: string;
  wid: number;
  cid?: number;
  active: boolean;
  is_private?: boolean;
  template?: boolean;
  template_id?: number;
  billable?: boolean;
  auto_estimates?: boolean;
  estimated_hours?: number;
  at: TimeStamp;
  color: number;
  rate?: number;
}

export default class Toggl {
  private options: Options;

  constructor(options: Options = DEFAULTS) {
    this.options = Object.assign(DEFAULTS, options);
  }

  public async authenticate() {
    if (!this.options.apiToken) {
      throw new Error("No ApiToken provided");
    }

    if (!this.options.apiUrl) {
        throw new Error("No apiUrl provided");
    }

    const response = await request(this.options.apiUrl, {
      auth: `${this.options.apiToken}:api_token`,
    });

    console.log(response);
  }
}
