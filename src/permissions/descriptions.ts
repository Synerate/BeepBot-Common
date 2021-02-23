export const Descriptions: IDescriptions = {
    'user:voice': {
        text: 'Allow the bot to process the users messages.'
    },
    'game:join': {
        text: 'Allow the user to join games.'
    },
    'protection:bypass': {
        text: 'Allow the user to bypass the protection module.'
    },
    'channel:command:edit': {
        text: 'Allow the user to edit commands.'
    },
    'channel:command:delete': {
        text: 'Allow the user to mark commands for deletion.'
    },
    'channel:command:create': {
        text: 'Allow the user to create commands.'
    },
    'channel:quote:create': {
        text: 'Allow the user to create quote.'
    },
    'channel:quote:delete': {
        text: 'Allow the user to mark a quote for deletion.'
    },
    'channel:cooldown:bypass': {
        text: 'Allow the user to bypass command cooldowns.'
    },
    'game:start': {
        text: 'Allow the user to start a game.'
    },
    'game:end': {
        text: 'Allow the user to end a game.'
    },
    'protection:manage': {
        text: 'Allow the user to mange the protection settings.'
    },
    'channel:command:forcedelete': {
        text: 'Allow the user to use the `-f` flag to force remove data.'
    },
    'command:run:regular': {
        text: 'Allow the user to run regular level commands.'
    },
    'command:run:moderator': {
        text: 'Allow the user to run mod level commands.'
    },
    'command:run:owner': {
        text: 'Allow the user to run owner level commands.'
    },
    'command:run:developer': {
        text: 'Allow the user to run developer level commands.'
    },
    'channel:regulars:manage': {
        text: 'Allows the user to mange the regulars listing.'
    },
    'channel:command:restore': {
        text: 'Allow the user to restore data which has been marked for deletion.'
    },
    'bot:command:status': {
        text: 'Allow the user to see run statistic commands about the bot.'
    },
    'channel:ticker:manage': {
        text: 'Allow the user to manage tickers.'
    },
    'channel:variables:manage': {
        text: 'Allow the user to manage variables.'
    },
    '*': {
        text: 'Gives the user all permissions globally on the bot.'
    },
    'platform:send:custom': {
        text: 'Allow the user to send a response from the bot to another connected platform.'
    },
};

export interface IDescriptions {
    [name: string]: {
        text: string;
    }
}
