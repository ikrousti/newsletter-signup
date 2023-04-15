const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { url } = require("inspector");

const app= express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.listen(3000, function(){
    console.log("Server is running on port 3000!");
})

app.get("/", function(req, res){
res.sendFile(__dirname + "/signup.html")
})
app.post("/", function(req,res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    console.log(firstName, lastName, email);
    let data = {
        members:[
            {
                email_address: email,
                status:"subscribed",
                merge_fields: {
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    };
    const jsonData= JSON.stringify(data);
    const url= "https://us11.api.mailchimp.com/3.0/lists/b23f76bed3"

    const options = {
        method: "POST",
        auth:"ifi:dec8a85dbe76024c97d36d6f507b25e9-us11"
    }
 const request = https.request(url, options, function(response){
    if (response.statusCode==200) {
        res.sendFile(__dirname + '/success.html');
    } else{
        res.sendFile(__dirname + '/failure.html');
    }

    response.on("data", function(data){
    console.log(JSON.parse(data));
})
})
    request.write(jsonData);
    request.end();
});
app.post("/failure", function(req, res){
    res.redirect("/")
})

// dec8a85dbe76024c97d36d6f507b25e9-us11
// b23f76bed3