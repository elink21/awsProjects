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

function ProcessImage() {



  // Load base64 encoded image
  var control = document.getElementById("fileToUpload");
  var file = control.files[0];
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
      DetectText(imageBytes);

    };
  })(file);
  reader.readAsDataURL(file);
}




function DetectText(imageBytes) {
  AnonLog();
  var textract = new AWS.Textract({apiVersion: '2018-06-27'});

  var params = {
    Document: { /* required */
      Bytes: imageBytes,
    }
  };
  textract.detectDocumentText(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else {
      let res= document.getElementById("result");
      res.innerHTML="";
      let blocks= data.Blocks;
      console.log(blocks);
      for(let block of blocks)
      {
        if(block.BlockType=="LINE")
        {
          res.innerHTML+=block.Text+"<br>"
        }
      }
    }
               // successful response
  });
}


document.getElementById("fileToUpload").addEventListener(
  "change",
  function (event) {
    ProcessImage();
  },
  false
);

