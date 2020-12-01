const express = require("express");
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  
  res.setHeader('Content-type','text/html')
  res.send('<p>Go to some invalid url like <a href="https://Roblox-Tools.errorbotthe2nd.repl.co/randomlink">here!<\a><\p>');
});

app.all('*', (req, res, next) => {
  res.status(404);
  res.render('Error', {ErrorCode: 404});
})

app.listen(3000);

/*
const express = require("express");
const app = express();


app.get('/', (req, res) => {
  res.send("lol");
});

app.all('*', (req, res, next) => {
  res.status(404);
  res.render('Error', {ErrorCode: 404});
  res.send();

  // respond with html page
  if (req.accepts('html') == "html") {
    res.render('Error', {url: req.url, ErrorCode: 404});
    return;
  }

  // respond with json
  if (req.accepts('json') == "json") {
    res.send({ error: 404 });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Error 404: Not found');
});

app.listen(3000);
*/