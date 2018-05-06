"use strict";

const express = require('express');
const path = require('path');
const userAgent  = require('useragent');
const es6SupportedBrowsers = require('./browsers.json');

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
const app = new express();

function isOldUserAgent(req) {
    let agent = userAgent.parse(req.headers['user-agent']);

    let oldBrowser = es6SupportedBrowsers.filter((browserInfo) => {
        if (browserInfo.family === agent.family) {
            return agent.major < browserInfo.major;
        }

        return false;
    });

    return oldBrowser.length;
}

app.use(express.static(path.join(__dirname, 'production')));

app.get('bundle.js', function (req, res, next) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    next();
});

app.get('bundle-es5.js', function (req, res, next) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    next();
});

app.get('*', (req, res) => {
    if (isOldUserAgent(req)) {
        res.sendFile(path.join(__dirname + '/production/index-es5.html'));
    } else {
        res.sendFile(path.join(__dirname + '/production/index-es6.html'));
    }
});

app.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    console.info(`Server running on http://localhost:${port} ${env}`);
});
