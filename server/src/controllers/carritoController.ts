import { Request, Response } from 'express';
//import db from '../database';
import oracle from 'oracledb';
import keys from './keys'
import { promises } from 'fs';
//import nodemailer from 'nodemailer';
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');
const jwt = require('jsonwebtoken')



class CarritoController {
    public async search(req: Request, res: Response): Promise<any> { // TODOS LOS PRODUCTOS DE EL ID DE UN CARRITO
        const { id } = req.params;
        await oracle.getConnection(keys.database, function (err, connection) {
            if (err) {
                // Error connecting to DB
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error connecting to DB",
                    detailed_message: err.message
                }));
                return;
            }
            console.log('entra');
            connection.execute("SELECT * FROM DETALLE_CARRITO WHERE CARRITO_ID_CARRITO = :id", [req.params.id], {
                outFormat: oracle.OBJECT // Return the result as Object
            }, function (err, result) {
                if (err /*|| (result.rows.length < 1)*/) {
                    res.set('Content-Type', 'application/json');
                    var status = err ? 500 : 404;
                    res.status(status).send(JSON.stringify({
                        status: status,
                        message: err ? "Error getting the user profile" : "User doesn't exist",
                        detailed_message: err ? err.message : ""
                    }));
                } else {
                    console.log(result.rows)
                    res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                }
                // Release the connection
                connection.release(
                    function (err) {
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log("GET /api/carrito/" + req.params.id + " : Connection released");
                        }
                    });
            });
        });
        //res.json({text:'search'+ req.params.id}); 
    }
    public async searchCarrito(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        await oracle.getConnection(keys.database, function (err, connection) {
            if (err) {
                // Error connecting to DB
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error connecting to DB",
                    detailed_message: err.message
                }));
                return;
            }

            connection.execute("SELECT * FROM CARRITO  WHERE USUARIO_ID_USUARIO = :id ORDER BY ID_CARRITO DESC ", [req.params.id], {
                outFormat: oracle.OBJECT // Return the result as Object
            }, function (err, result) {
                if (err /*|| (result.rows.length < 1)*/) {
                    res.set('Content-Type', 'application/json');
                    var status = err ? 500 : 404;
                    res.status(status).send(JSON.stringify({
                        status: status,
                        message: err ? "Error getting the user profile" : "User doesn't exist",
                        detailed_message: err ? err.message : ""
                    }));
                } else {
                    res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                }
                // Release the connection
                connection.release(
                    function (err) {
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log("GET /api/carrito/search/carrito" + req.params.id + " : Connection released");
                        }
                    });
            });
        });
        //res.json({text:'search'+ req.params.id}); 
    }
    public async searchCompra(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        await oracle.getConnection(keys.database, function (err, connection) {
            if (err) {
                // Error connecting to DB
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error connecting to DB",
                    detailed_message: err.message
                }));
                return;
            }

            connection.execute("SELECT * FROM DETALLE_CARRITO WHERE CARRITO_ID_CARRITO = :id", [req.params.id], {
                outFormat: oracle.OBJECT // Return the result as Object
            }, function (err, result) {
                if (err /*|| (result.rows.length < 1)*/) {
                    res.set('Content-Type', 'application/json');
                    var status = err ? 500 : 404;
                    res.status(status).send(JSON.stringify({
                        status: status,
                        message: err ? "Error getting the user profile" : "User doesn't exist",
                        detailed_message: err ? err.message : ""
                    }));
                } else {
                    // AQUI TENDRIA QUE MANDAR TODOS LOS DATOS CON EL EMAIL SI NO ABAJO 
                    res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                }
                //AQUI VER BIEN ESO
                // Release the connection
                connection.release(
                    function (err) {
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log("GET /api/carrito/search/" + req.params.id + " : Connection released");
                        }
                    });
            });
        });
        //res.json({text:'search'+ req.params.id}); 
    }
    public async searchcarritoproducto(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        await oracle.getConnection(keys.database, function (err, connection) {
            if (err) {
                // Error connecting to DB
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error connecting to DB",
                    detailed_message: err.message
                }));
                return;
            }

            connection.execute("SELECT * FROM DETALLE_CARRITO WHERE CARRITO_ID_CARRITO =:CARRITO_ID_CARRITO AND PRODUCTO_ID_PRODUCTO = :id", [req.body.CARRITO_ID_CARRITO, req.params.id], {
                outFormat: oracle.OBJECT // Return the result as Object
            }, function (err, result) {
                if (err /*|| (result.rows.length < 1)*/) {
                    res.set('Content-Type', 'application/json');
                    var status = err ? 500 : 404;
                    res.status(status).send(JSON.stringify({
                        status: status,
                        message: err ? "Error getting the user profile" : "User doesn't exist",
                        detailed_message: err ? err.message : ""
                    }));
                } else {
                    // AQUI TENDRIA QUE MANDAR TODOS LOS DATOS CON EL EMAIL SI NO ABAJO 
                    res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                }
                //AQUI VER BIEN ESO
                // Release the connection
                connection.release(
                    function (err) {
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log("GET /api/carrito/search/producto" + req.params.id + " : Connection released");
                        }
                    });
            });
        });
        //res.json({text:'search'+ req.params.id}); 
    }

    public createCarrito(req: Request, res: Response) {

        oracle.getConnection(keys.database, function (err, connection) {
            if (err) {
                // Error connecting to DB
                res.set('Content-Type', 'application/json').status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error connecting to DB",
                    detailed_message: err.message
                }));
                return;
            }
            let now = new Date()
            connection.execute("INSERT INTO CARRITO(FECHA, TOTAL,USUARIO_ID_USUARIO) VALUES " +
                "(:FECHA, :TOTAL,:USUARIO_ID_USUARIO) ", [now, req.body.TOTAL, req.body.USUARIO_ID_USUARIO], {
                    autoCommit: true,
                    outFormat: oracle.OBJECT // Return the result as Object                      
                },
                function (err, result) {
                    if (err) {
                        // Error  
                        res.set('Content-Type', 'application/json');
                        res.status(400).send(JSON.stringify({
                            status: 400,
                            message: err.message.indexOf("ORA-00001") > -1 ? "User already exists" : "Input Error",
                            detailed_message: err.message
                        }));
                    } else {
                        // Successfully created the resource                        
                        res.status(201).set('Location', '/carrito/' + req.body.USUARIO_ID_USUARIO).end();
                    }

                    // Release the connection
                    connection.release(
                        function (err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("POST /carrito : Connection released");
                            }
                        });
                });

        })
    }

    public createDetalleCarrito(req: Request, res: Response) {

        oracle.getConnection(keys.database, function (err, connection) {
            if (err) {
                // Error connecting to DB
                res.set('Content-Type', 'application/json').status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error connecting to DB",
                    detailed_message: err.message
                }));
                return;
            }
            let now = new Date()
            console.log(req.body);
            connection.execute("INSERT INTO DETALLE_CARRITO(NOMBRE,CANTIDAD,PRECIO,SUBTOTAL,PRODUCTO_ID_PRODUCTO,CARRITO_ID_CARRITO) VALUES " +
                "(:NOMBRE, :CANTIDAD,:PRECIO, :SUBTOTAL,:PRODUCTO_ID_PRODUCTO,:CARRITO_ID_CARRITO) ",
                [req.body.NOMBRE, req.body.CANTIDAD, req.body.PRECIO, req.body.SUBTOTAL, req.body.PRODUCTO_ID_PRODUCTO, req.body.CARRITO_ID_CARRITO], {
                    autoCommit: true,
                    outFormat: oracle.OBJECT // Return the result as Object                      
                },
                function (err, result) {
                    if (err) {
                        // Error  
                        res.set('Content-Type', 'application/json');
                        res.status(400).send(JSON.stringify({
                            status: 400,
                            message: err.message.indexOf("ORA-00001") > -1 ? "User already exists" : "Input Error",
                            detailed_message: err.message
                        }));
                    } else {
                        // Successfully created the resource                        
                        res.status(201).set('Location', '/carrito/detallecarrito/' + req.body.PRODUCTO_ID_PRODUCTO).end();
                    }

                    // Release the connection
                    connection.release(
                        function (err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("POST /carrito/detallecarrito/ : Connection released");
                            }
                        });
                });

        })
    }

    public async deleteDetalleCarrito(req: Request, res: Response) {
        await oracle.getConnection(keys.database, function (err, connection) {
            if (err) {
                // Error connecting to DB
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error connecting to DB",
                    detailed_message: err.message
                }));
                return;
            }

            connection.execute("DELETE FROM DETALLE_CARRITO WHERE CARRITO_ID_CARRITO=:CARRITO_ID_CARRITO AND PRODUCTO_ID_PRODUCTO = :id ", [req.body.CARRITO_ID_CARRITO, req.params.id], {
                autoCommit: true,
                outFormat: oracle.OBJECT
            }, function (err, result) {
                if (err || result.rowsAffected === 0) {
                    // Error  
                    console.log(req.body)
                    res.set('Content-Type', 'application/json');
                    res.status(400).send(JSON.stringify({
                        status: 400,
                        message: err ? "Input Error" : "User doesn't exist",
                        detailed_message: err ? err.message : ""
                    }));
                } else {
                    // Resource successfully deleted. Sending an empty response body. 
                    res.status(204).end();
                    //res.status(204).end();
                }
                // Release the connection
                connection.release(
                    function (err) {
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log("DELETE /carrito/detallecarrito/" + req.params.id + " : Connection released");
                        }
                    });

            });
        });
        //res.json({text:'delete'+ req.params.id});
    }

    public async updateCarrito(req: Request, res: Response): Promise<void> {
        await oracle.getConnection(keys.database, function (err, connection) {
            if (err) {
                // Error connecting to DB
                res.set('Content-Type', 'application/json').status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error connecting to DB",
                    detailed_message: err.message
                }));
                return;
            }
            const { id } = req.params.id;
            connection.execute("UPDATE CARRITO set TOTAL =:TOTAL WHERE ID_CARRITO = :ID_CARRITO",
                [req.body.TOTAL, req.params.id], {
                    autoCommit: true,
                    outFormat: oracle.OBJECT
                }, function (err, result) {
                    if (err || result.rowsAffected === 0) {
                        // Error 
                        res.set('Content-Type', 'application/json');
                        res.status(400).send(JSON.stringify({
                            status: 400,
                            message: err ? "Input Error" : "User doesn't exist",
                            detailed_message: err ? err.message : ""
                        }));
                    } else {
                        // Resource successfully deleted. Sending an empty response body. 
                        res.status(204).end();
                    }
                    // Release the connection
                    connection.release(
                        function (err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("PUT /carrito/" + req.params.id + " : Connection released");
                            }
                        });

                });
        });
        // res.json({text:'update'+ req.params.id});
    }
    public async updatedetallecarrito(req: Request, res: Response): Promise<void> {
        await oracle.getConnection(keys.database, function (err, connection) {
            if (err) {
                // Error connecting to DB
                res.set('Content-Type', 'application/json').status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error connecting to DB",
                    detailed_message: err.message
                }));
                return;
            }
            const { id } = req.params.id;
            //console.log(req.params.id)
            //console.log(req.body)
            connection.execute("UPDATE DETALLE_CARRITO set CANTIDAD =:CANTIDAD , SUBTOTAL =:SUBTOTAL WHERE CARRITO_ID_CARRITO=:CARRITO_ID_CARRITO AND PRODUCTO_ID_PRODUCTO = :id",
                [req.body.CANTIDAD, req.body.SUBTOTAL, req.body.CARRITO_ID_CARRITO, req.params.id], {
                    autoCommit: true,
                    outFormat: oracle.OBJECT
                }, function (err, result) {
                    if (err || result.rowsAffected === 0) {
                        // Error 
                        res.set('Content-Type', 'application/json');
                        res.status(400).send(JSON.stringify({
                            status: 400,
                            message: err ? "Input Error" : "User doesn't exist",
                            detailed_message: err ? err.message : ""
                        }));
                    } else {
                        // Resource successfully deleted. Sending an empty response body. 
                        res.status(204).end();
                    }
                    // Release the connection
                    connection.release(
                        function (err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("PUT /productocantidad/" + req.params.id + " : Connection released");
                            }
                        });

                });
        });
        // res.json({text:'update'+ req.params.id});
    }

    public createFactura(req: Request, res: Response) {

        oracle.getConnection(keys.database, function (err, connection) {
            if (err) {
                // Error connecting to DB
                res.set('Content-Type', 'application/json').status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error connecting to DB",
                    detailed_message: err.message
                }));
                return;
            }
            let now = new Date()
            connection.execute("INSERT INTO FACTURA(DESCRIPCION,FECHA,CARRITO_ID_CARRITO) VALUES " +
                "(:DESCRIPCION, :FECHA,:USUARIO_ID_USUARIO) ", [req.body.DESCRIPCION, now, req.body.ID_CARRITO], {
                    autoCommit: true,
                    outFormat: oracle.OBJECT // Return the result as Object                      
                },
                function (err, result) {
                    if (err) {
                        // Error  
                        res.set('Content-Type', 'application/json');
                        res.status(400).send(JSON.stringify({
                            status: 400,
                            message: err.message.indexOf("ORA-00001") > -1 ? "User already exists" : "Input Error",
                            detailed_message: err.message
                        }));
                    } else {
                        // Successfully created the resource                        
                        res.status(201).set('Location', '/carrito/factura' + req.body.USUARIO_ID_USUARIO).end();
                    }

                    // Release the connection
                    connection.release(
                        function (err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("POST /carrito : Connection released");
                            }
                        });
                });

        })

        //nuevas consultas de detalle carrito para obtener todos los productos

        //mail
       /* let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            secure: true,
            port: '465',
            pool: true,
            auth: {
                user: 'canchemolinas@gmail.com',
                pass: 'colegio100'
                //xoauth2: xoauth2.createXOAuth2Generator({
                /* type: 'OAuth2',
                 user: 'canchemolinas@gmail.com',
                 serviceClient: '178571404911-b54p9v99857tmk7qdcp8b9vjc4rjlnvd.apps.googleusercontent.com',
                 privateKey: 'e2_HNslb8FUjtKM0uc6SG3MJ',
                 refreshToken: '1/BhCWxL7UO9vMV2iK-yzMieepeqQmVBTJ3aEVqkx6rCWFbpo6vsDl-fA342eY2vhI'
             //})*/
       /*     }
        })
       /* let now = new Date()
        let mailOptions = {
            from: 'Jorge <canchemolinas@gmail.com>',
            to: 'canchemolina@hotmail.com',//req.body.CORREO,
            subject: 'Factura de compra realizada en publishes and sells', // Línea del asunto 
            text: 'Factura',
            html: '<h1>Publishes and sells</h1> \n <h2>Factura: ID' + '</h2>\n <h5>Cliente:\n' + req.body.CLIENTE + '</h5>\n <h5>Carrito:' + req.body.ID_CARRITO + '</h5>\n <h5>Carrito:' + now + '</h5>\n \n</h3>' + req.body.JSONPRODUCTOS + '</h3>\n \n<h1>Total: Q.' + req.body.TOTAL + '</h1>'// cuerpo de texto sin formato 

        }
        /*let mailOptions = {
            from: 'Jorge <canchemolinas@gmail.com>',
            to: 'canchemolina@hotmail.com',//req.body.CORREO,
            subject: 'Activacion de Cuenta', // Línea del asunto 
            text: 'holi',
            html: '<h2>Publishes and sells</h2> \n <h1>Verificacion de Cuenta</h1>\n <h5>Hola\n Lo primero que necesitamos es validar tu dirección de email, así te daremos la mejor atención.</h5>\n <a href="http://localhost:4200/login" class="btn btn-primary stretched-link">Confirmar Correo</a> ',// cuerpo de texto sin formato 
            auth: {
                user: 'canchemolina@gmail.com',
                refreshToken: '1/BhCWxL7UO9vMV2iK-yzMieepeqQmVBTJ3aEVqkx6rCWFbpo6vsDl-fA342eY2vhI',
                accessToken: 'ya29.GlvtBju7RIgzXGo9GyYsyrXcToaou4xQhFkEsAV9Ouxd6moEITfS1hBK5rkL2NkPEf4DRa6Jm934dalmjgMNL9f2I42ZJJ7_3ZWJmavjagYEDYTseNbMff0hQ4cF',
                expires: 1484314697598
            }
        } 
        let mailOptions = {
            from: 'Jorge <canchemolinas@gmail.com>',
            to: req.body.CORREO,
            subject: 'Factura de compra realizada en publishes and sells', // Línea del asunto 
            text: 'Factura',
            html: '<p>FACTURA</p>',
            amp: `<!doctype html>
            <html ⚡4email>
              <head>
                <meta charset="utf-8">
                <style amp4email-boilerplate>body{visibility:hidden}</style>
                <script async src="https://cdn.ampproject.org/v0.js"></script>
                <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
              </head>
              <body>
                <p>Image: <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
                <p>GIF (requires "amp-anim" script in header):<br/>
                  <amp-anim src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/></p>
              </body>
            </html>`
        }*/

        /*transporter.sendMail(mailOptions, function (err: Error, res: Response) {
            if (err) {
                console.log(err);
            } else {
                console.log('Email Sent');
            }
        })*/
    }
    public enviarEmailFactura(req: Request, res: Response) {

        oracle.getConnection(keys.database, function (err, connection) {
            if (err) {
                // Error connecting to DB
                res.set('Content-Type', 'application/json').status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error connecting to DB",
                    detailed_message: err.message
                }));
                return;
            }
            let now = new Date()
            connection.execute("SELECT * FROM FACTURA WHERE CARRITO_ID_CARRITO = :CARRITO_ID_CARRITO", [req.params.id], {
                autoCommit: true,
                outFormat: oracle.OBJECT // Return the result as Object                      
            },
                function (err, result) {
                    if (err) {
                        // Error  
                        res.set('Content-Type', 'application/json');
                        res.status(400).send(JSON.stringify({
                            status: 400,
                            message: err.message.indexOf("ORA-00001") > -1 ? "User already exists" : "Input Error",
                            detailed_message: err.message
                        }));
                    } else {
                        // Successfully created the resource 
                        res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                    }

                    // Release the connection
                    connection.release(
                        function (err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("GET /carrito/FACTURA : Connection released");
                            }
                        });
                });

        })
    }
    public  enviarFactura(req: Request, res: Response){
        oracle.getConnection(keys.database, function (err, connection) {
            if (err) {
                // Error connecting to DB
                res.set('Content-Type', 'application/json').status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error connecting to DB",
                    detailed_message: err.message
                }));
                return;
            }
            let now = new Date()
            connection.execute("SELECT * FROM FACTURA WHERE CARRITO_ID_CARRITO = :CARRITO_ID_CARRITO", [req.body.ID_CARRITO], {
                autoCommit: true,
                outFormat: oracle.OBJECT // Return the result as Object                      
            },
                function (err, result) {
                    if (err) {
                        // Error  
                        res.set('Content-Type', 'application/json');
                        res.status(400).send(JSON.stringify({
                            status: 400,
                            message: err.message.indexOf("ORA-00001") > -1 ? "User already exists" : "Input Error",
                            detailed_message: err.message
                        }));
                    } else {
                        // Successfully created the resource 
                        res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                    }

                    // Release the connection
                    connection.release(
                        function (err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("GET /carrito/FACTURA : Connection released");
                            }
                        });
                });

        })

        //mail
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            secure: true,
            port: '465',
            pool: true,
            auth: {
                user: 'canchemolinas@gmail.com',
                pass: 'colegio100'
                //xoauth2: xoauth2.createXOAuth2Generator({
                /* type: 'OAuth2',
                 user: 'canchemolinas@gmail.com',
                 serviceClient: '178571404911-b54p9v99857tmk7qdcp8b9vjc4rjlnvd.apps.googleusercontent.com',
                 privateKey: 'e2_HNslb8FUjtKM0uc6SG3MJ',
                 refreshToken: '1/BhCWxL7UO9vMV2iK-yzMieepeqQmVBTJ3aEVqkx6rCWFbpo6vsDl-fA342eY2vhI'
             //})*/
            }
        })
        let now = new Date()
        let mailOptions = {
            from: 'Jorge <canchemolinas@gmail.com>',
            to: req.body.CORREO,
            subject: 'Factura de compra realizada en publishes and sells', // Línea del asunto 
            text: 'Factura',
            html: '<h1>Publishes and sells</h1> \n <h2>Factura:'+req.body.ID_FACTURA + '</h2>\n <h5>Cliente:\n' + req.body.CLIENTE + '</h5>\n <h5>Carrito:' + req.body.ID_CARRITO + '</h5>\n <h5>Carrito:' + now + '</h5>\n \n</h3>' + req.body.JSONPRODUCTOS + '</h3>\n \n<h1>Total: Q.' + req.body.TOTAL + '</h1>'// cuerpo de texto sin formato 

        }
        /*let mailOptions = {
            from: 'Jorge <canchemolinas@gmail.com>',
            to: 'canchemolina@hotmail.com',//req.body.CORREO,
            subject: 'Activacion de Cuenta', // Línea del asunto 
            text: 'holi',
            html: '<h2>Publishes and sells</h2> \n <h1>Verificacion de Cuenta</h1>\n <h5>Hola\n Lo primero que necesitamos es validar tu dirección de email, así te daremos la mejor atención.</h5>\n <a href="http://localhost:4200/login" class="btn btn-primary stretched-link">Confirmar Correo</a> ',// cuerpo de texto sin formato 
            auth: {
                user: 'canchemolina@gmail.com',
                refreshToken: '1/BhCWxL7UO9vMV2iK-yzMieepeqQmVBTJ3aEVqkx6rCWFbpo6vsDl-fA342eY2vhI',
                accessToken: 'ya29.GlvtBju7RIgzXGo9GyYsyrXcToaou4xQhFkEsAV9Ouxd6moEITfS1hBK5rkL2NkPEf4DRa6Jm934dalmjgMNL9f2I42ZJJ7_3ZWJmavjagYEDYTseNbMff0hQ4cF',
                expires: 1484314697598
            }
        } 
        let mailOptions = {
            from: 'Jorge <canchemolinas@gmail.com>',
            to: req.body.CORREO,
            subject: 'Factura de compra realizada en publishes and sells', // Línea del asunto 
            text: 'Factura',
            html: '<p>FACTURA</p>',
            amp: `<!doctype html>
            <html ⚡4email>
              <head>
                <meta charset="utf-8">
                <style amp4email-boilerplate>body{visibility:hidden}</style>
                <script async src="https://cdn.ampproject.org/v0.js"></script>
                <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
              </head>
              <body>
                <p>Image: <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
                <p>GIF (requires "amp-anim" script in header):<br/>
                  <amp-anim src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/></p>
              </body>
            </html>`
        }*/

        transporter.sendMail(mailOptions, function (err: Error, res: Response) {
            if (err) {
                console.log(err);
            } else {
                console.log('Email Sent');
            }
        })

    }


}

const carritoController = new CarritoController();
export default carritoController;
