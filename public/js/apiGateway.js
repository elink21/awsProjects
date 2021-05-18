data = [
    {
        "id": 1,
        "type": "dog",
        "price": 249.99
    },
    {
        "id": 2,
        "type": "cat",
        "price": 124.99
    },
    {
        "id": 3,
        "type": "fish",
        "price": 0.99
    }
];
function makeRequest() {
    const id = document.getElementById("idField").value;
    const Http = new XMLHttpRequest();

    const url = `http://petstore.execute-api.us-east-1.amazonaws.com/petstore/pets/${id}`;

    Http.open("GET", url);
    Http.setRequestHeader('Access-Control-Allow-Headers', '*');
    Http.setRequestHeader('Content-type', 'application/ecmascript');
    Http.setRequestHeader('Access-Control-Allow-Origin', '*');
    //Http.send();


    Http.onreadystatechange = (e) => {
        const res = JSON.parse(Http.responseText);

    }
    document.getElementById('jsonPre').innerHTML = JSON.stringify(data[id], undefined, 2);
}