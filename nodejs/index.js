const express=require('express');
const app=express();
const webpush = require("web-push");
const bodyParser = require("body-parser");
const port=5000;

app.use(express.static('public'));
app.use(bodyParser.json());

/*const publicVapidKey =
  "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
const privateVapidKey = "3KzvKasA2SoCxsp0iIG_o9B0Ozvl1XDwI63JRKNIWBM";*/

/*webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);*/
app.post('/push',(req,res)=>{
    const subscription = req.body;

    res.status(200).json({});

    const payload = JSON.stringify({
        title: "Mozilla Firefox",
        body: "Click to reach the mozilla website",
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Firefox_Project_Logo%2C_2019.svg/180px-Firefox_Project_Logo%2C_2019.svg.png"
    });

    // Pass object into sendNotification
    webpush
        .sendNotification(subscription, payload)
        .catch(err => console.error(err));
});
app.listen(port, () => console.log(`Server started on port ${port}`));