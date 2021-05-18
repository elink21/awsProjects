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


AnonLog();

var params = {
    FormatVersion: "aws_v1",
    ServiceCode: ""
};
var pricing = new AWS.Pricing({ apiVersion: '2017-10-15' });


pricing.describeServices(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else {
        let services = data.Services;
        document.getElementById('serviceSelect');
        let select = document.getElementById('serviceSelect');
        select.innerHTML = "";
        for (let s of services) {
            let option = `<option value="${s.ServiceCode}">${s.ServiceCode}</option>`
            select.innerHTML += option;
        }

    }           // successful response

});

function updateInfo(ServiceCode) {
    var params = {
        AttributeName: "usageType",
        MaxResults: 1,
        ServiceCode: ServiceCode
    };
    pricing.getAttributeValues(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            console.log(data.AttributeValues[0].Value);
            document.getElementById('usageLabel').innerHTML = data.AttributeValues[0].Value;

        }           // successful response
    });

    params.AttributeName = 'location';

    pricing.getAttributeValues(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            console.log(data.AttributeValues[0].Value);
            document.getElementById('locationLabel').innerHTML = data.AttributeValues[0].Value;
        }           // successful response
    });

    params.AttributeName = 'locationType';

    pricing.getAttributeValues(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            console.log(data.AttributeValues[0].Value);
            document.getElementById('locationTypeLabel').innerHTML = data.AttributeValues[0].Value;
        }           // successful response
    });

    params.AttributeName = 'operation';

    pricing.getAttributeValues(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            console.log(data.AttributeValues[0].Value);
            document.getElementById('operationLabel').innerHTML = data.AttributeValues[0].Value;
        }           // successful response
    });




}