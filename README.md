# Bot Scaffold

## Getting up & running

Clone this repo

    git clone https://github.com/billba/bot-quickstart-js.git

In your repo, create a text file called .env with the following contents:

    PORT = 3978
    MICROSOFT_APP_ID = app_id_you_got_when_you_registered_your_bot
    MICROSOFT_APP_PASSWORD = app_password_you_got_when_you_registered_your_bot
    LUIS_MODEL = url_for_the_built-in_cortana_model_without_the_trailing_&q=

Install Node modules

    npm install

Run

    npm run watch
