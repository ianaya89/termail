var inquirer = require('inquirer');
var nodemailer = require('nodemailer');
var colors = require('colors');

require('dotenv').load();

var to = {
  type: 'input',
  name: 'to',
  message: 'to ?'
};

var from = {
  type: 'input',
  name: 'from',
  message: 'from ?'
};

var subject = {
  type: 'input',
  name: 'subject',
  message: 'subject ?'
};

var body = {
  type: 'input',
  name: 'body',
  message: 'body ?'
};

var html = {
  type: 'confirm',
  name: 'html',
  message: 'html ?'
};

var confirm = {
  type: 'confirm',
  name: 'confirm',
  message: 'You are going to send an email, are you sure ?'
};

inquirer.prompt([from, to, subject, body, html, confirm], function(answers) {

  if (!answers.confirm) {
    console.log('Email aborted'.red);
    return;
  }

  var opt = {
    from: answers.from,
    to: answers.to,
    subject: answers.subject
  };

  if (answers.html) {
    opt.html = answers.body;
  }
  else {
    opt.text = answers.body;
  }

  console.log('Sending email...');

  sendEmail(opt);
});

function sendEmail(opt) {
  var transporter = nodemailer.createTransport({
    service: process.env.PROVIDER,
    auth: {
      user: process.env.FROM,
      pass: process.env.PASS
    }
  });

  transporter.sendMail(opt, function(error, info){
    if(error){
      return console.log(JSON.stringify(error).red);
    }

    console.log('Email sent succesfully: '.green + info.response);
  });
}
