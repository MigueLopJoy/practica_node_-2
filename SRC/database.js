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
            CREATE TABLE IF NOT EXISTS catalog (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255),
                description TEXT,
                price DECIMAL(10, 2),
                image_name VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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

async function checkAndInsertProducts() {
    const checkResults = await new Promise((resolve, reject) => {
        connection.query("SELECT * FROM catalog", (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results)
            }
        })
    })

    if (checkResults.length === 0) {
        try {
            await new Promise((resolve, reject) => {
                connection.query(
                    `INSERT INTO catalog (title, description, price, image_name)
                    VALUES
                        ('Producto 1', 'Descripción del producto 1', 19.99, 'product1.jpg'),
                        ('Producto 2', 'Descripción del producto 2', 24.99, 'product2.jpg'),
                        ('Producto 3', 'Descripción del producto 3', 15.99, 'product3.jpg'),
                        ('Producto 4', 'Descripción del producto 4', 12.99, 'product4.jpg'),
                        ('Producto 5', 'Descripción del producto 5', 6.99, 'product5.jpg');`,
                    (err) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve()
                        }
                    }
                )
            })
            console.log('Productos de ejemplo insertados exitosamente.')
        } catch (error) {
            console.error('Error al insertar productos:', error)
        }
    } else {
        console.log('Ya hay productos en la tabla.')
    }
}

async function initializeDatabase() {
    try {
        await connectToDatabase()
        await createDatabase()
        connection.changeUser({ database: 'nodejs' });
        await createTable()
        await checkAndInsertProducts()
    } catch (error) {
        console.error('Error al inicializar la base de datos:', error)
    }
}

module.exports = { initializeDatabase, connection }
