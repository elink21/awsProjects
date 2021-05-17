function AnonLog() {
    // Configure the credentials provider to use your identity pool
    AWS.config.region = "us-east-1";

    AWS.config.credentials = new AWS.Credentials(
        "AKIA5WVRPT4UJWH2XZOO",
        "uQT0GGeTLgXuHVSus2dnk1FMYy3jEg+Thdj4fxYy"
    );
    // Make the call to obtain credentials
    AWS.config.credentials.get(function () {
        // Credentials will be available when this function is called.
        var accessKeyId = AWS.config.credentials.accessKeyId;
        var secretAccessKey = AWS.config.credentials.secretAccessKey;
        var sessionToken = AWS.config.credentials.sessionToken;
    });
}

function comprehendA() {
    AnonLog();
    let text = document.getElementById("inputText").value;
    let lang = 'en';
    var comprehend = new AWS.Comprehend();

    var params = {
        TextList: [ /* required */
            text,
            /* more items */
        ]
    };

    comprehend.batchDetectDominantLanguage(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            lang = data['ResultList'][0].Languages[0].LanguageCode;
            document.getElementById('languageLabel').innerHTML = lang;
            console.log(lang);
        }           // successful response
    });

    params['LanguageCode'] = lang;

    const entities = [];

    comprehend.batchDetectEntities(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            var entityLabel = document.getElementById('entityLabel');
            entityLabel.innerHTML = "";
            const res = data.ResultList[0].Entities;
            for (const e of res) {
                entityLabel.innerHTML += e.Type + "-" + e.Text + "<br>";
                console.log(e.Type, e.Text);
            }
        }          // successful response
    });




    comprehend.batchDetectSyntax(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            const tokenLabel = document.getElementById('tokenLabel');
            tokenLabel.innerHTML = "";
            for (const token of data.ResultList[0].SyntaxTokens) {
                const text = token.Text;
                const TokenId = token.PartOfSpeech.Tag;
                tokenLabel.innerHTML += text + "=" + TokenId + "<br>";
                console.log(text, TokenId);
            }

        }         // successful response
    });

}

function comprehendB() {
    AnonLog();
    let text = document.getElementById("inputText").value;
    let lang = 'en';
    var comprehend = new AWS.Comprehend();

    var params = {
        TextList: [ /* required */
            text,
            /* more items */
        ]
    };

    params['LanguageCode'] = lang;
    comprehend.batchDetectSentiment(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            document.getElementById("moodLabel").innerHTML = data.ResultList[0].Sentiment;
        }           // successful response
    });


    var params = {
        LanguageCode: 'en', /* required */
        Text: text /* required */
    };

    const ideaLabel = document.getElementById('ideaLabel');
    ideaLabel.innerHTML = "";
    comprehend.detectKeyPhrases(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            for (let key of data.KeyPhrases) {
                ideaLabel.innerHTML += key.Text + "-" + key.Score + "<br>";
            }
        }           // successful response
    });
}





