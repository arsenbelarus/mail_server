const express = require('express')
const app = express()
const nodemailer = require("nodemailer");
const cors = require("cors")
const bodyParser = require("body-parser")

/*const corsOptions = {
    origin: ['http://localhost:3000', 'https://arsenbelarus.github.io/portfolio'],
    credentials: true,
};*/
app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
});
app.use(cors(/*corsOptions*/))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


let port = process.env.PORT || 3010
let smtp_login = process.env.LOGIN || "a.voskanyan1@gmail.com"
let smtp_password = process.env.PASSWORD || "v2786856"

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: smtp_login, // generated ethereal user
        pass: smtp_password // generated ethereal password
    },
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/sendMessage', async (req, res) => {
    let {name, email, phone, message} = req.body
    let info = await transporter.sendMail({
        from: '"My portfolio page" <a.voskanyan1@gmail.com>', // sender address
        to: "arsenbelarus@gmail.com", // list of receivers
        subject: "Message from portfolio", // Subject line
        html: `<b>This message has recently been sent from my Portfolio page</b>
               <div><strong>Name: </strong>${name}</div>
               <div><strong>Email: </strong>${email}</div>
               <div><strong>Phone: </strong>${phone}</div>
               <div><strong>Message: </strong>${message}</div>`
    });
    res.send("Message sent")
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})