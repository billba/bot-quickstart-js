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
    new builder
    .IntentDialog({ recognizers: [new builder.LuisRecognizer(process.env.LUIS_APP_MODEL)] })
    .matches('builtin.intent.communication.send_text', [
        (session, args) => {
            let message = builder.EntityRecognizer.findEntity(args.entities, 'builtin.communication.message');
            message = message && message.entity;
            let contact_name = builder.EntityRecognizer.findEntity(args.entities, 'builtin.communication.contact_name');
            contact_name = contact_name && contact_name.entity;
            session.send(`You asked to send the message "${message}" to "${contact_name}"`);
        }
    ])
    .onDefault(
        (session) => {
            session.send("I am a very simple bot. Try asking me to send a message.");
        }
    )
);