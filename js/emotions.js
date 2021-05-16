document.getElementById("fileToUpload").addEventListener(
    "change",
    function (event) {
        ProcessImage();
    },
    false
);


function detectEmotions(imageData) {
    AWS.region = "us-east-1";
    var rekognition = new AWS.Rekognition();
    var params = {
        Image: {
            Bytes: imageData,
        },
        Attributes: ["ALL"],
    };
    rekognition.detectFaces(params, function (err, data) {
        if (err) console.log(err, err.stack);
        // an error occurred
        else {
            const emotion = data.FaceDetails[0].Emotions[0].Type;
            const gender = data.FaceDetails[0].Gender.Value;
            const glasses = data.FaceDetails[0].Eyeglasses.Value;

            document.getElementById('emotionLabel').innerHTML = emotion;
            document.getElementById('genderLabel').innerHTML = gender;
            document.getElementById('glassesLabel').innerHTML = glasses;
        }
    });
}
//Loads selected image and unencodes image bytes for Rekognition DetectFaces API
function ProcessImage() {
    AnonLog();
    var control = document.getElementById("fileToUpload");
    var file = control.files[0];
    document.getElementById('preview').src = URL.createObjectURL(file);

    // Load base64 encoded image
    var reader = new FileReader();
    reader.onload = (function (theFile) {
        return function (e) {
            var img = document.createElement("img");
            var image = null;
            img.src = e.target.result;
            var jpg = true;
            try {
                image = atob(e.target.result.split("data:image/jpeg;base64,")[1]);
            } catch (e) {
                jpg = false;
            }
            if (jpg == false) {
                try {
                    image = atob(e.target.result.split("data:image/png;base64,")[1]);
                } catch (e) {
                    alert("Not an image file Rekognition can process");
                    return;
                }
            }
            //unencode image bytes for Rekognition DetectFaces API
            var length = image.length;
            imageBytes = new ArrayBuffer(length);
            var ua = new Uint8Array(imageBytes);
            for (var i = 0; i < length; i++) {
                ua[i] = image.charCodeAt(i);
            }
            //Call Rekognition
            detectEmotions(imageBytes)

        };
    })(file);
    reader.readAsDataURL(file);
}
//Provides anonymous log on to AWS services
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