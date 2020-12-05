const express = require("express");
const fetch = require("node-fetch");
const app = express();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "eb1122-2",
  api_key: "794149432517886",
  api_secret:	"rp0yJRWlnfOatmdJ1_GGQ_dzzr0"
})

app.use(express.static(__dirname + '/views'));

app.set('view engine', 'ejs');


function HandleError(req, res, errorcode) {
  console.log(errorcode)
  // respond with html page
  if (req.accepts('html') == "html") {
    console.log(errorcode, errorcode == 418)
    if (errorcode == 418) {
      res.render('Error', {url: req.url, ErrorCode: errorcode, GifAlt: "I AM A TEAPOT",GifLink: "https://media0.giphy.com/media/XJtpTFGatDgDTJhLtr/giphy.gif"});
      return;
    }
    res.render('Error', {url: req.url, ErrorCode: errorcode, GifAlt: "random pic", GifLink: "https://www.ikea.cn/cn/en/images/products/oumbaerlig-pot-with-lid__0710343_PE727464_S5.JPG"});
    return;
  }

  // respond with json
  if (req.accepts('json') == "json") {
    res.send({ code: errorcode });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send(`Error ${errorcode}: Not found`);
}


cloudinary.image("l.gif", {width: 250, flags: "animated", fetch_format: "auto", crop: "scale", resource_type: "video"})

app.get('/api', (req, res, next) => {

});
app.get('/api/roblox', (req, res, next) => {

});
app.get('/api/roblox/Url/', async (req, res, next) => {
  console.log(req.query.url)

  urlPath = req.query.url

  if (urlPath == null) {
    res.redirect(Error/404)
  }

  const UrlSplit = urlPath.toLowerCase().trim().split(/:?\/+/g);
  const UrlBeging = UrlSplit.slice(0, 2);
  
  if (/(http)s?/.test(UrlBeging[0]) == true && /(roblox.com)/.test(UrlBeging[1])) {
    try {

    } catch (error) {
      res.redirect(Error/500)
    }
    const fetchRespose = await fetch(urlPath)
    const fetchJson = await fetchRespose.json()
    
    res.send(fetchJson)
    //console.log(fetchJson)
  } else {
    res.redirect(Error/404)
  }
  
}),
/*
app.get('/api/roblox/Url/', async (req, res, next) => {
  //urlPath = req.query.url
  console.log(req.query)
  
  const UrlSplit = urlPath.toLowerCase().trim().split(/:?\/+/g);
  const UrlBeging = UrlSplit.slice(0, 2);
  
  if (/(http)s?/.test(UrlBeging[0]) == true && /(roblox.com)/.test(UrlBeging[1])) {
    const fetchRespose = await fetch(urlPath)
    const fetchJson = await fetchRespose.json()
    
    res.send(fetchJson)
    console.log(fetchJson)
  } else {
    res.sendStatus(404);
  }
}),*/
app.get('/code-editor', (req, res, next) => {
  if (req.accepts('html') == "html") {
    res.render('Editor', {})
    return;
  }

  // respond with json
  if (req.accepts('json') == "json") {
    res.redirect("/api");
    return;
  }

  // default to plain-text. send()
  

  setTimeout(() => { res.redirect("/"); }, 3000);

}),
app.get('/', (req, res, next) => {
  if (req.accepts('html') == "html") {
    res.render('Home', {CodeEditorLink: req.protocol + '://' + req.get('host') + "/code-editor"})
    
    urlPath = req.protocol + '://' + req.get('host') + "/code-editor"
    UrlSplit = urlPath.trim().split(/:?\/+/g);
    return;

  }

  // respond with json
  if (req.accepts('json') == "json") {
    res.redirect("/api");
    return;
  }

  // default to plain-text. send()
  res.type('txt').send("linkes: " + req.protocol + '://' + req.get('host') + "/code-editor");
}),
/* Status Code Handling */ 
app.get('/Error/:Errornumber', (req, res) => {
  HandleError(req, res, req.params.Errornumber)
}),
app.all('*', (req, res) => {
  res.status(404);
  HandleError(req, res, 404)
})

app.listen(3000)

/*
const express = require("express");
const app = express();


app.get('/', (req, res) => {
  res.send("lol");
});

app.all('*', (req, res, next) => {
  
});

app.listen(3000);
*/