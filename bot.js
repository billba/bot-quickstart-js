'use strict';

require('dotenv').config();

const server = require('restify').createServer();
server.listen(process.env.port || process.env.PORT || 3978, '::', () =>
   console.log('%s listening to %s', server.name, server.url)
);

const builder = require('botbuilder');

const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

server.post('/api/messages', connector.listen());

const bot = new builder.UniversalBot(connector);

bot.dialog('/',
    (session) => {
        session.send("Hello, World.");
    }
);
