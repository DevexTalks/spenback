const mysql = require('mysql');

const pool = mysql.createPool({
    host: '34.29.238.110',
    port: 3306,
    database: 'neps_production',
    user: 'root',
    password: 'eg$mTn~8<JJ|rN5D'
}
);


pool.getConnection((err,connection)=> {
    if(err)
    throw err;
    console.log('🛢 Database connected successfully ✅');
    connection.release();
  });

module.exports = pool;