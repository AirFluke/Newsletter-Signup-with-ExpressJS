const express = require("express");

const bodyParser = require("body-parser");
const https = require("https");

const request = require("request");



const app = express();

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}));

app.post("/", (req, res)=>{
    const firstName = req.body.FirstName
    const lastName = req.body.lastName
    const email = req.body.Email

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME:lastName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);
    
    const url = "https://us11.api.mailchimp.com/3.0/lists/fa9f15d521"
    const options = {
        method: "POST",
        auth : "airfluke:76a4f334a3935f2802bc10daa90d3f66-us11"
    }
    const request = https.request(url, options, (response)=>{

        if(response.statusCode===200){
            res.sendFile(__dirname + "/success.html")
        }else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", (data)=>{
            console.log(JSON.parse(data))
        })
    })
    request.write(jsonData);
    request.end();
});

app.post("/failure", (req, res)=>{
    res.redirect("/")
})

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/signup.html")
})

app.listen(process.env.PORT || 3000, ()=>{
    console.log("server is running on port 3000")
})

//API KEY
//76a4f334a3935f2802bc10daa90d3f66-us11

//fa9f15d521