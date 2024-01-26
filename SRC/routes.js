    const fs = require('fs'),
        path = require('path'),
        querystring = require('querystring'),
        { readHeader, readFooter } = require('./fileUtils.js'),
        { connection } = require('./database.js')

    const routes = {
    '/': async (req, res) => {
        readHeader(header => {
            res.write(header)
            fs.readFile("./../PUBLIC/index.html", (err, data) => {
                if (err) throw err
                res.write(data)

                readFooter(footer => {
                    res.write(footer)
                    res.end("")
                })
            })
        })
    },
    '/home': async (req, res) => {
        readHeader(header => {
            res.write(header)
            fs.readFile("./../PUBLIC/index.html", (err, data) => {
                if (err) throw err
                res.write(data)

                readFooter(footer => {
                    res.write(footer)
                    res.end("")
                })
            })
        })
    },
    '/contact': async (req, res) => {
        readHeader(header => {
        res.write(header)

        fs.readFile("./../PUBLIC/ASSETS/HTML/contact.html", (err, data) => {
            if (err) throw err
            res.write(data)

            readFooter(footer => {
                res.write(footer)
                res.end("")
            })
        })
        })
    },
    '/process': async (req, res) => {
        let data = ''
        req.on('data', chunk => {
            data += chunk.toString()
        })
        req.on('end', () => {
            const formData = querystring.parse(data),       
            dataString = `Nombre: ${formData.name}\nCorreo: ${formData.email}\nMensaje: ${formData.message}\n`

            files.appendFile('./../REGISTER/datos.txt', dataString, (err) => {
                if (err) {
                    console.error(err)
                    res.writeHead(500, { 'Content-Type': 'text/html' })
                    res.write('Error interno del servidor')
                    res.end('');
                } else {
                    files.readFile('contact.html', (err, data) => {
                        res.writeHead(200, { 'Content-Type': 'text/html' })
                        res.write(data)
                        res.end('')
                    })
                }
            })
        })
    },
    '/catalog': async (req, res) => {
        readHeader(header => {
            res.write(header)
                
                    connection.query(`
                            SELECT * FROM catalog
                        `, (err, result, fields) => {
                        if (err) throw err
                        res.write(`<div class="container"><div class="row">`)
                        for (let i = 0; i < result.length; i++) {                            
                            res.write(`
                                <div class="col-md-4 mb-4">
                                    <div class="card">
                                        <img src="PUBLIC/ASSETS/MEDIA/IMGS/${result[i].image_name}" class="card-img-top" alt="Producto ${i + 1}">
                                        <div class="card-body">
                                            <h5 class="card-title">Producto ${i + 1}</h5>
                                            <p class="card-text">${result[i].description}</p>
                                            <p class="card-text">Precio: $${result[i].price}</p>
                                            <a href="#" class="btn btn-primary">Ver detalles</a>
                                        </div>
                                    </div>
                                </div>
                            `)
                        }
                        res.write(`</div></div>`)
                    })
                    readFooter(footer => {
                        res.write(footer)
                        res.end("")
                    })
            })
    },
    'default': async (req, res) => {
        readHeader(header => {
            res.write(header)
            fs.readFile("./PUBLIC/ASSETS/HTML/notfound.html", (err, data) => {
                if (err) throw err
                res.write(data)
        
                readFooter(footer => {
                    res.write(footer)
                    res.end("")
                })
                })
        })
    },
    }

    async function handleRequest(req, res, fullRoute) {
    const routeHandler = routes[fullRoute.pathname] || routes['default']
    await routeHandler(req, res)
    }

    module.exports = { handleRequest }
