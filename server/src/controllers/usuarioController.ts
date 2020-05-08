import { Request, Response } from 'express';
import oracle from 'oracledb';
import keys from './keys'
const nodemailer = require('nodemailer');
import { promises } from 'fs';
var EventEmitter = require('events').EventEmitter;
var timer = new EventEmitter();
var count = 0;
const xoauth2 = require('xoauth2');
var id = "";


const jwt = require('jsonwebtoken')


class UsuarioController{

    //Listar todos los usuarios que se encuentran en la tabla de usuarios
    public async listandousuarios(req: Request, res: Response) {
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

            connection.execute("SELECT * FROM usuario", {}, {
                outFormat: oracle.OBJECT // Return the result as Object
            }, function (err, result) {
                if (err) {
                    res.set('Content-Type', 'application/json');
                    res.status(500).send(JSON.stringify({
                        status: 500,
                        message: "Error getting the user profile",
                        detailed_message: err.message
                    }));
                } else {
                    res.contentType('application/json').status(200).send(JSON.stringify(result.rows));;
                    //res.send(JSON.stringify(result.rowsAffected));
                    //res.send(JSON.stringify(result.rows));
                }
                // Release the connection
                connection.release(
                    function (err) {
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log("GET /user/users: se realizó el listado de usuarios");
                        }
                    });
            });
        })
       
    }

    //Buscar usuario por id
    public async search(req: Request, res: Response): Promise<any> {
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

            connection.execute("SELECT * FROM usuario WHERE ID_USUARIO = :id", [req.params.id], {
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
                            console.log("GET /api/usuario/" + req.params.id + " : Connection released");
                        }
                    });
            });
        });       
    }



    
    // si el correo existe
    public async searchUsuario(req: Request, res: Response): Promise<any> {
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

            connection.execute("SELECT * FROM usuario WHERE CORREO = :CORREO", [req.body.CORREO], {
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
                    //function generateToken(user) {
                    var u = {
                        username: req.body.CORREO,
                        id: req.body.ID_US
                    }
                    let token = jwt.sign(u, req.body.CLAVE_ACCESO, {
                        expiresIn: 60 * 60 * 24 // expires in 24 hours
                    })
                    //}
                    console.log(result.rows + token);
                    res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                }
                // Release the connection
                connection.release(
                    function (err) {
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log("POST  /api/usuario/search : Connection released");
                        }
                    });
            });
        });
        //res.json({text:'search'+ req.params.id}); 
    }

    //Para la creación de un usuario
    public create(req: Request, res: Response) {

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
            let now1 = new Date(req.body.FECHA_NACIMIENTO)
            var tipo_clase = Math.floor(Math.random() * 5) + 1;
            var tipoc = 0;
            var correo = '';
            if (tipo_clase == 1) {
                tipoc = 50000;
            } else if (tipo_clase == 2) {
                tipoc = 25000;
            } else if (tipo_clase == 3) {
                tipoc = 10000;
            } else if (tipo_clase == 4) {
                tipoc = 5000;
            } else if (tipo_clase == 5) {
                tipoc = 1000;
            }
              
            connection.execute("INSERT INTO usuario(NOMBRE, APELLIDO,CORREO, CLAVE_ACCESO, TELEFONO," +
                "FOTOGRAFIA, GENERO, FECHA_NACIMIENTO, FECHA_REGISTRO, DIRECCION, CREDITO_DISPONIBLE, GANANCIA_OBTENIDA," +
                "ESTADO, ROL_ID_ROL, CLASE_CLIENTE_ID) VALUES " +
                "(:NOMBRE, :APELLIDO,:CORREO, :CLAVE_ACCESO, :TELEFONO," +
                ":FOTOGRAFIA, :GENERO, :FECHA_NACIMIENTO, :FECHA_REGISTRO, :DIRECCION, :CREDITO_DISPONIBLE, :GANANCIA_OBTENIDA," +
                ":ESTADO, :ROL_ID_ROL, :CLASE_CLIENTE_ID ) ", [req.body.NOMBRE, req.body.APELLIDO, req.body.CORREO, req.body.CLAVE_ACCESO, //ganancia siempre comienza en 0
                req.body.TELEFONO, req.body.FOTOGRAFIA, req.body.GENERO, now1, now, req.body.DIRECCION, tipoc, 0, req.body.ESTADO, req.body.ROL_ID_ROL, tipo_clase], {

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
                        res.status(201).set('Location', '/usuario/' + req.body.USER_NAME).end();
                    }

                    // Release the connection
                    connection.release(
                        function (err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("POST /usuario : Connection released");
                            }
                        });
                });

        })
        //envio mail de confirmacion
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            secure: true,
            port: '465',
            pool: true,
            auth: {
                user: 'jorsala01@gmail.com',
                pass: '43420021'                
            }
        })
        let mailOptions = {
            from: 'AlieSell <jorsala01@gmail.com>',
            to: req.body.CORREO,
            subject: 'Activacion de Cuenta', // Línea del asunto 
            text: 'holi',
            html: '<h2>AlieSell</h2> \n <h1>Verificacion de Cuenta</h1>\n <h5>Hola\n Lo primero que necesitamos es validar tu dirección de email, así te daremos la mejor atención.</h5>\n' // cuerpo de texto sin formato 
        }

        transporter.sendMail(mailOptions, function (err: Error, res: Response) {
            if (err) {
                console.log('No se envio esa shit');
                console.log(err);
            } else {
                console.log('Email Sent');
            }
        }) 
    }
    //Eliminar un usuario
    public async delete(req: Request, res: Response) {
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

            connection.execute("DELETE FROM USUARIO WHERE ID_USUARIO = :id", [req.params.id], {
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
                }
                // Release the connection
                connection.release(
                    function (err) {
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log("DELETE /usuario/" + req.params.id + " : Connection released");
                        }
                    });

            });
        });
        //res.json({text:'delete'+ req.params.id});
    }

    //Actualiza un usuario (hecho por admin)
    public async update(req: Request, res: Response): Promise<void> {
        
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
            //const {id} = req.params.id;
            let now1 = new Date(req.body.FECHA_NACIMIENTO)
            connection.execute("UPDATE usuario set NOMBRE =:NOMBRE , APELLIDO =:APELLIDO , CORREO=:CORREO ,CLAVE_ACCESO =:CLAVE_ACCESO " +
                ",TELEFONO =:TELEFONO,FOTOGRAFIA=:FOTOGRAFIA,GENERO=:GENERO,FECHA_NACIMIENTO=:FECHA_NACIMIENTO ,DIRECCION=:DIRECCION ," +
                "CREDITO_DISPONIBLE=:CREDITO_DISPONIBLE ,ESTADO=:ESTADO,ROL_ID_ROL=:ROL_ID_ROL,CLASE_CLIENTE_ID=:CLASE_CLIENTE_ID WHERE ID_USUARIO = :ID_USUARIO",
                [req.body.NOMBRE, req.body.APELLIDO, req.body.CORREO, req.body.CLAVE_ACCESO, //ganancia siempre comienza en 0
                req.body.TELEFONO, req.body.FOTOGRAFIA, req.body.GENERO, now1, req.body.DIRECCION, req.body.CREDITO_DISPONIBLE,
                req.body.ESTADO, req.body.ROL_ID_ROL, req.body.CLASE_CLIENTE_ID, req.params.id], {

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
                                console.log("PUT /administrador/" + req.params.id + " : Connection released");
                            }
                        });

                });
        });
        // res.json({text:'update'+ req.params.id});
    }

    //update cliente
    public async updatecliente(req: Request, res: Response): Promise<void> {
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
           
            let now1 = new Date(req.body.FECHA_NACIMIENTO)
            connection.execute("UPDATE usuario set NOMBRE =:NOMBRE , APELLIDO =:APELLIDO , CORREO=:CORREO ,CLAVE_ACCESO =:CLAVE_ACCESO " +
                ",TELEFONO =:TELEFONO,FOTOGRAFIA=:FOTOGRAFIA,GENERO=:GENERO,FECHA_NACIMIENTO=:FECHA_NACIMIENTO ,DIRECCION=:DIRECCION WHERE ID_USUARIO = :id",
                [req.body.NOMBRE, req.body.APELLIDO, req.body.CORREO, req.body.CLAVE_ACCESO, //ganancia siempre comienza en 0
                req.body.TELEFONO, req.body.FOTOGRAFIA, req.body.GENERO, now1, req.body.DIRECCION, req.params.id], {

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
                                console.log("PUT /producto/" + req.params.id + " : Connection released");
                            }
                        });

                });
        });
        // res.json({text:'update'+ req.params.id});
    }

}
//FINAL DE LA CLASE

const usuarioController = new UsuarioController();
export default usuarioController;