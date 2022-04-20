const express = require('express');
const bodyParser = require ('body-parser');
const { create } = require ('express-handlebars');
const nodemailer = require ('nodemailer');
const path = require ('path');
const res = require('express/lib/response');
const PORT = 8080;

const app = express();
const hbs = create ({});

//View engine setup
app.engine('handlebars', hbs.engine);
app.set('view engine','handlebars');
app.set('views','./views');

//static folder
app.use('/public',express.static(path.join(__dirname,'public')));

//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());

app.get('/',(req,res) => {
    res.render('contact.handlebars',{layout:false});
});

//Post Route
app.post ('/send', (req,res) => {
    console.log ('parametre passe en req.body',req.body)

    const output = `
    <p> We have a news contact request </p>
    <h3> contact detail </h3>
    <ul>
        <li> Name: ${req.body.name} </li>
        <li> company: ${req.body.company} </li>
        <li> email: ${req.body.email} </li>
        <li> phone: ${req.body.phone} </li>
    </ul>
    <h3> message </h3>
        <p> ${req.body.message} </p>
    `;


// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'bouget.mathieu69@gmail.com', // generated ethereal user
      pass: 'LIEBherr38019!', // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = transporter.sendMail({
    from: '"HellsTest contact" <bouget.mathieu69@gmail.com', // sender address
    to: "julieaudelallemand@gmail.com, julieaudelallemand@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
});


app.listen(8080,()=>{
    console.log(`serveur running at http://localhost:${PORT}`)
});