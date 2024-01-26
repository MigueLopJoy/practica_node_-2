    const fs = require('fs')
    const querystring = require('querystring')
    const { readHeader, readFooter } = require('./fileUtils.js')
    const { connection } = require('./database.js')

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
            const formData = querystring.parse(body),       
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
    '/about': async (req, res) => {
        readHeader(header => {
        res.write(header)

        fs.readFile("./../PUBLIC/ASSETS/HTML/about.html", (err, data) => {
            if (err) throw err
            res.write(data)

            readFooter(footer => {
                res.write(footer)
                res.end("")
            })
        })
        })
    },
    '/blog': async (req, res) => {
        readHeader(header => {
        res.write(header)

        fs.readFile("./../PUBLIC/ASSETS/HTML/blog.html", (err, data) => {
            if (err) throw err
            res.write(data)

            connection.query(`SELECT * FROM entries`, (err, result, fields) => {
            if (err) throw err
            for (let i = 0; i < result.length; i++) {
                res.write(`
                <article>
                    <h3>${result[i].titulo}</h3>
                    <time>${result[i].fecha}</time>
                    <p>${result[i].texto}</p>
                </article>
                `)
            }

            readFooter(footer => {
                res.write(footer)
                res.end("")
            })
            })
        });
        })
    },
    'default': async (req, res) => {
        fs.readFile("./../PUBLIC/ASSETS/HTML/notfound.html", (err, data) => {
        if (err) throw err
        res.write(data)

        readFooter(footer => {
            res.write(footer)
            res.end("")
        })
        })
    },
    }

    async function handleRequest(req, res, fullRoute) {
    const routeHandler = routes[fullRoute.pathname] || routes['default']
    await routeHandler(req, res)
    }

    module.exports = { handleRequest }
