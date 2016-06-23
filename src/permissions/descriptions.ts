export const Descriptions: IDescriptions = {
  "user:voice": {
    text: "Allow the bot to process the users messages."
  },
  "game:join": {
    text: "Allow the user to join games."
  },
  "protection:bypass": {
    text: "Allow the user to bypass the protection module."
  },
  "channel:command:edit": {
    text: "Allow the user to edit commands."
  },
  "channel:command:delete": {
    text: "Allow the user to mark commands for deletion."
  },
  "channel:command:create": {
    text: "Allow the user to create commands."
  },
  "channel:quote:create": {
    text: "Allow the user to create quote."
  },
  "channel:quote:delete": {
    text: "Allow the user to mark a quote for deletion."
  },
  "channel:cooldown:bypass": {
    text: "Allow the user to bypass command cooldowns."
  },
  "game:start": {
    text: "Allow the user to start a game."
  },
  "game:end": {
    text: "Allow the user to end a game."
  },
  "protection:manage": {
    text: "Allow the user to mange the protection settings."
  },
  "channel:command:forcedelete": {
    text: "Allow the user to use the `-f` flag to force remove data."
  }
};

export interface IDescriptions {
  [name: string]: {
    text: string;
  }
}
