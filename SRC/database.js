const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'nodejs',
  password: '1234'
})

async function connectToDatabase() {
    return new Promise((resolve, reject) => {
        connection.connect((err) => {
            if (err) {
                reject(err)
            } else {
                console.log('Conectado a la base de datos')
                resolve()
            }
        })
    })
}

async function createDatabase() {
    return new Promise((resolve, reject) => {
        connection.query('CREATE DATABASE IF NOT EXISTS nodejs', (err, result) => {
            if (err) {
                reject(err)
            } else {
                console.log('Base de datos creada o ya existente')
                resolve()
            }
        })
    })
}

async function createTable() {
    return new Promise((resolve, reject) => {
        connection.query(`
            CREATE TABLE IF NOT EXISTS entries (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(100),
                text TEXT,
                date VARCHAR(15)
            );
        `, (err, result) => {
            if (err) {
                reject(err)
            } else {
                console.log('Tabla creada o ya existente')
                resolve()
            }
        })
    })
}

async function initializeDatabase() {
    try {
        await connectToDatabase()
        await createDatabase()
        connection.changeUser({ database: 'nodejs' });
        await createTable()
    } catch (error) {
        console.error('Error al inicializar la base de datos:', error)
    }
}

module.exports = { initializeDatabase, connection }
