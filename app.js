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
});



app.listen(8080,()=>{
    console.log(`serveur running at http://localhost:${PORT}`)
});