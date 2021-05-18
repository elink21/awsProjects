
function executeChat()
{
    msg= document.getElementById("chatInput").value;
    const q = encodeURIComponent(msg);
    const uri = 'https://api.wit.ai/message?v=20200513&q=' + q;
    const auth = 'Bearer ' + '6JXIZHC3XWJJUDEQ4VKK6BEH47WDFJAM';
    
    fetch(uri, {
        headers: {
            Authorization: auth,
        }
    }).then(
        res => res.json()
    ).then(res=>{
        document.getElementById('jsonPre').innerHTML= JSON.stringify(res,undefined,2);
    });
}

