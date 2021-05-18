AnonLog();
var dynamodb = new AWS.DynamoDB();


function getTableNames() {

    const cont = document.getElementById('tablesContainer');
    cont.innerHTML = "";

    var params = {
    };
    dynamodb.listTables(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            console.log(data.TableNames);
            cont.innerHTML = "<ul>"

            for (let table of data.TableNames) {
                let t = `<li class='table'>${table}</li> <br>`
                cont.innerHTML += t;
            }
            cont.innerHTML += "</ul>";
            console.log("Tables updated");
        }           // successful response

    });


}


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


function createTable() {
    /* This example creates a table named Music. */
    let tableName = document.getElementById('tableName').value;

    var params = {
        AttributeDefinitions: [
            {
                AttributeName: "Artist",
                AttributeType: "S"
            },
            {
                AttributeName: "SongTitle",
                AttributeType: "S"
            }
        ],
        KeySchema: [
            {
                AttributeName: "Artist",
                KeyType: "HASH"
            },
            {
                AttributeName: "SongTitle",
                KeyType: "RANGE"
            }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        },
        TableName: tableName
    };
    dynamodb.createTable(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data);           // successful response

    });

    getTableNames();
}



getTableNames();