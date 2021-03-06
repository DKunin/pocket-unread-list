'use strict';
const https = require('https');
const express = require('express');
const app = express();
const { POCKET_CONSUMER_KEY, POCKET_ACCESS_TOKEN } = process.env;
const port = 5050;

function httpsRequest(options) {
    return new Promise((resolve, reject) => {
        https.get(options, response => {
            let str = '';

            response.on('data', function(chunk) {
                str += chunk;
            });

            response.on('end', function() {
                resolve(JSON.parse(str));
            });
        }).on('error', e => {
            reject(e);
        });
    });
}

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

app.get('/api/pocket', function(req, res) {
    httpsRequest({
        host: 'getpocket.com',
        path: `/v3/get?consumer_key=${POCKET_CONSUMER_KEY}&access_token=${POCKET_ACCESS_TOKEN}&count=100`
    }).then(data => {
        const keys = Object.keys(data.list);
        const count = keys.length;
        const newList = keys
            .reduce(
                function(newArray, singleItem) {
                    const {
                        word_count,
                        sort_id,
                        given_title,
                        given_url
                    } = data.list[singleItem];
                    return newArray.concat({
                        word_count,
                        sort: sort_id,
                        title: given_title,
                        url: given_url
                    });
                },
                []
            )
            .sort((a, b) => {
                return a.sort - b.sort;
            });
        res.json({ count, list: newList });
    });
});

app.listen(port);
