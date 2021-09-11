const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
var hsts = require('hsts');
const path = require('path');
var xssFilter = require('x-xss-protection');
var nosniff = require('dont-sniff-mimetype');
const request = require('request');

const app = express();

app.use(cors());
app.use(express.static('assets'));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.disable('x-powered-by');
app.use(xssFilter());
app.use(nosniff());
app.set('etag', false);
app.use(
  helmet({
    noCache: true
  })
);
app.use(
  hsts({
    maxAge: 15552000 // 180 days in seconds
  })
);

app.use(
  express.static(path.join(__dirname, 'dist/softrams-racing'), {
    etag: false
  })
);

app.get('/api/members', (req, res) => {
  request('http://localhost:3000/members', (err, response, body) => {
    if (response.statusCode === 200) res.send(body)
    else res.sendStatus(404)
  })
});

// TODO: Dropdown!
app.get('/api/teams', (req, res) => {
  request('http://localhost:3000/teams', (err, response, body) => {
    if (response.statusCode === 200) res.send(body)
    else res.sendStatus(404)
  })
});

// Submit Form!
app.post('/api/addMember', (req, res) => {
  const newMember = req.body

  if (!newMember.id || !newMember.status || !newMember.jobTitle || !newMember.team || !newMember.firstName || !newMember.lastName) return res.sendStatus(403)

  request({
    url: 'http://localhost:3000/members', method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: newMember,
    json: true
  }, (err, response, body) => {
    if (!err) return res.send(body)
    else return res.sendStatus(400)
  })
})

app.put('/api/modifyMember', (req, res) => {
  const member = req.body

  request({
    url: `http://localhost:3000/members/${member.id}`, method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: member,
    json: true
  }, (err, response, body) => {
    if (!err) return res.send(body)
    else return res.sendStatus(400)
  })
})

app.delete('/api/deleteMember', (req, res) => {
  const member = req.body

  request({
    url: `http://localhost:3000/members/${member.id}`, method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
    body: member,
    json: true
  }, (err, response, body) => {
    if (!err) return res.send(body)
    else return res.sendStatus(400)
  })
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/softrams-racing/index.html'));
});

app.listen('8000', () => {
  console.log('Vrrrum Vrrrum! Server starting!');
});
