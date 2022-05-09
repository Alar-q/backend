let USD = 400;
require('axios')
    .request({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/convertcurrency',
        params: {have: 'USD', want: 'KZT', amount: '1'},
        headers: {
            'X-Api-Key': 'CwmHgYHBvosDzLi32OG5CA==lnmfoH6sm876fFlF'
        }
    })
    .then(function (response) {
        if(response.data.new_amount)
            USD = Number.parseFloat(response.data.new_amount);
        console.log("usd to kzt:", USD);
    })
    .catch(function (error) {
        console.error("error", error);
    });

const express = require('express');

const router = express.Router();

// define the home page route
router
    .route('/')
    .get((req, res) => {
        res.render('index', {usd: USD});
    });

module.exports = router;