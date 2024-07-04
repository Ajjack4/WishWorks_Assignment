const Pool = require('pg').Pool;

const pool = new Pool({
    user:'postgres',
    password:'Ajin4594',
    host:'localhost',
    port:5432,
    database:'estate'
});

module.exports =pool;