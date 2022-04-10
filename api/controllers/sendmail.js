const nodemailer = require("nodemailer");

//sender information
const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "tsikyproject@outlook.com",
      pass: "Tsiky03!"
    }
});


module.exports.sendMail = function(req, res) {

    const options = {
        from: "tsikyproject@outlook.com",
        cc: req.body.cc,
        to:  req.body.to,
        subject: req.body.subject,
        text: req.body.text
    };

    transporter.sendMail(options, function(err, info){
        if(err){
            console.log(err);
            res.json(err);
            return;
        }
        console.log("Sent " + info.response);
        res.json("Sent " + info.response);
    });
}