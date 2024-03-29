const mysql = require('mysql')

var pool = mysql.createPool({
    "connectionLimit": 1000,
    "user": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASS,
    "database": process.env.MYSQL_DATABASE,
    "host": process.env.MYSQL_HOST,
    "port": 3306
})

exports.execute = (query, params = []) => {
    
    console.log(query, params)

    return new Promise ((resolve, reject) => {
                
        pool.query(query, params, (error, result, fields) => {

            if (error) {

                reject(error)

            } else {

                resolve(result)
            }
        })
    })
}

exports.pool = pool;