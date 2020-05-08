import { Request, Response } from 'express';
//import db from '../database';
import oracle, { fetchAsString } from 'oracledb';
import keys from './keys'
import { promises } from 'fs';
class ChatController {
    public async search(req: Request, res: Response): Promise<any> { // chat de el id del help desk o usuario
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

            connection.execute("SELECT * FROM CHAT WHERE USUARIO_ID_USUARIO = :id", [req.params.id], {
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
                            console.log("GET /api/chat/search/chats/" + req.params.id + " : Connection released");
                        }
                    });
            });
        });
        //res.json({text:'search'+ req.params.id}); 
    }
    public async searchUser(req: Request, res: Response): Promise<any> { // chat de el id del help desk
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

            connection.execute("SELECT * FROM CHAT WHERE USUARIO_ID_USUARIO1 = :id ", [req.params.id], {
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
                            console.log("GET /api/chat/users/" + req.params.id + " : Connection released");
                        }
                    });
            });
        });
        //res.json({text:'search'+ req.params.id}); 
    }
    public async searchMensajesChat(req: Request, res: Response): Promise<any> { // BUSCA LOS MENSAJES DEL CHAT
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
            connection.execute("SELECT * FROM MENSAJE WHERE CHAT_ID_CHAT = :id ORDER BY ID_MENSAJE ASC", [req.params.id], {
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
                            console.log("GET /api/chat/mensajes/" + req.params.id + " : Connection released");
                        }
                    });
            });
        });
        //res.json({text:'search'+ req.params.id}); 
    }
    public async searchChat(req: Request, res: Response): Promise<any> { // busco un chat en si 
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

            connection.execute("SELECT * FROM CHAT WHERE ID_CHAT = :id", [req.params.id], {
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
                            console.log("GET /api/chat/search/IDchats/" + req.params.id + " : Connection released");
                        }
                    });
            });
        });
        //res.json({text:'search'+ req.params.id}); 
    }

    public createChat (req: Request,res: Response){
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
            let fech = new Date();
            connection.execute("INSERT INTO CHAT(ESTADO,FECHA,USUARIO_ID_USUARIO,USUARIO_ID_USUARIO1,NOMBREHELPDESK,NOMBRE) VALUES " +
                "(:ESTADO,:FECHA, :USUARIO_ID_USUARIO, :USUARIO_ID_USUARIO1, :NOMBREHELPDESK ,:NOMBRE) ", [req.body.ESTADO,fech ,req.body.USUARIO_ID_USUARIO,
                    req.body.USUARIO_ID_USUARIO1,req.body.NOMBREHELPDESK,req.body.NOMBRE], {
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
                        res.status(201).set('Location', '/chat/' + req.body.USER_NAME).end();
                    }
                    // Release the connection
                    connection.release(
                        function (err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("POST /chat : Connection released");
                            }
                        });
                });
        })


        //console.log(req.body)
        //res.json({text:'post'});  
    }

    public createMensajesChat(req: Request,res: Response){
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
            let fech = new Date();
            connection.execute("INSERT INTO MENSAJE(DESCRIPCION,FECHA,CHAT_ID_CHAT,USUARIO_ID_USUARIO,NOMBRE) VALUES " +
                "(:DESCRIPCION, :FECHA, :CHAT_ID_CHAT,:USUARIO_ID_USUARIO,:NOMBRE) ", [req.body.DESCRIPCION,fech ,req.body.CHAT_ID_CHAT,
                    req.body.USUARIO_ID_USUARIO,req.body.NOMBRE], {
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
                        res.status(201).set('Location', '/chat/mensaje/' + req.body.USER_NAME).end();
                    }
                    // Release the connection
                    connection.release(
                        function (err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("POST /chat/mensaje : Connection released");
                            }
                        });
                });
        })
    }
    public async deletechat(req: Request,res: Response){
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
     
             connection.execute("DELETE FROM CHAT WHERE ID_CHAT = :id", [req.params.id], {
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
                             console.log("DELETE /chat/" + req.params.id + " : Connection released");
                         }
                     });
     
             });
         });
         //res.json({text:'delete'+ req.params.id});
     }
     public async deletemensaje(req: Request,res: Response){
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
     
             connection.execute("DELETE FROM MENSAJE WHERE CHAT_ID_CHAT = :id", [req.params.id], {
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
                             console.log("DELETE /chat/mensajes/" + req.params.id + " : Connection released");
                         }
                     });     
             });
         });
         //res.json({text:'delete'+ req.params.id});
     }
     public async updateEstado(req: Request,res: Response): Promise<void>{
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
            const {id} =req.params.id;
            connection.execute("UPDATE CHAT set ESTADO =:ESTADO WHERE ID_CHAT = :id", ['Resuelto',req.params.id], {
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
                            console.log("PUT /chat/" + req.params.id + " : Connection released");
                        }
                    });
    
            });
        });
        // res.json({text:'update'+ req.params.id});
    }
    public async searchHelpDesk(req: Request, res: Response): Promise<any> { // CUENTO EL NUMERO DE CHAT ASIGNASDO A ESTE HELP DESK
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
            connection.execute("SELECT COUNT(ID_CHAT) AS NO FROM CHAT WHERE USUARIO_ID_USUARIO = :id", [req.params.id], {
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
                            console.log("GET /api/chat/helpdesk/" + req.params.id + " : Connection released");
                        }
                    });
            });
        });
        //res.json({text:'search'+ req.params.id}); 
    }
    public puntuacion (req: Request,res: Response){
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
            let now= new Date()
            connection.execute("INSERT INTO PUNTUACION(PUNTUACION,USUARIO_ID_USUARIO)VALUES " +
                "(:PUNTUACION,:USUARIO_ID_USUARIO) ", [req.body.PUNTUACION,req.body.USUARIO_ID_USUARIO], {
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
                        res.status(201).set('Location', '/puntuacion/' + req.body.PRODUCTO_ID_PRODUCTO).end();
                    }
                    // Release the connection
                    connection.release(
                        function (err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("POST /puntuacion : Connection released");
                            }
                        });
                });
        })


        //console.log(req.body)
        //res.json({text:'post'});  
    }
}
const chatController = new ChatController();
export default chatController;