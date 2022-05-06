const mysql = require('mysql');

const db = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'Tushar@2002',
    database: 'social_media'
})

module.exports = db;
