"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import db from '../database';
const oracledb_1 = __importDefault(require("oracledb"));
const keys_1 = __importDefault(require("./keys"));
class ChatController {
    search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield oracledb_1.default.getConnection(keys_1.default.database, function (err, connection) {
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
                    outFormat: oracledb_1.default.OBJECT // Return the result as Object
                }, function (err, result) {
                    if (err /*|| (result.rows.length < 1)*/) {
                        res.set('Content-Type', 'application/json');
                        var status = err ? 500 : 404;
                        res.status(status).send(JSON.stringify({
                            status: status,
                            message: err ? "Error getting the user profile" : "User doesn't exist",
                            detailed_message: err ? err.message : ""
                        }));
                    }
                    else {
                        res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                    }
                    // Release the connection
                    connection.release(function (err) {
                        if (err) {
                            console.error(err.message);
                        }
                        else {
                            console.log("GET /api/chat/search/chats/" + req.params.id + " : Connection released");
                        }
                    });
                });
            });
            //res.json({text:'search'+ req.params.id}); 
        });
    }
    searchUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield oracledb_1.default.getConnection(keys_1.default.database, function (err, connection) {
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
                    outFormat: oracledb_1.default.OBJECT // Return the result as Object
                }, function (err, result) {
                    if (err /*|| (result.rows.length < 1)*/) {
                        res.set('Content-Type', 'application/json');
                        var status = err ? 500 : 404;
                        res.status(status).send(JSON.stringify({
                            status: status,
                            message: err ? "Error getting the user profile" : "User doesn't exist",
                            detailed_message: err ? err.message : ""
                        }));
                    }
                    else {
                        res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                    }
                    // Release the connection
                    connection.release(function (err) {
                        if (err) {
                            console.error(err.message);
                        }
                        else {
                            console.log("GET /api/chat/users/" + req.params.id + " : Connection released");
                        }
                    });
                });
            });
            //res.json({text:'search'+ req.params.id}); 
        });
    }
    searchMensajesChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield oracledb_1.default.getConnection(keys_1.default.database, function (err, connection) {
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
                    outFormat: oracledb_1.default.OBJECT // Return the result as Object
                }, function (err, result) {
                    if (err /*|| (result.rows.length < 1)*/) {
                        res.set('Content-Type', 'application/json');
                        var status = err ? 500 : 404;
                        res.status(status).send(JSON.stringify({
                            status: status,
                            message: err ? "Error getting the user profile" : "User doesn't exist",
                            detailed_message: err ? err.message : ""
                        }));
                    }
                    else {
                        res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                    }
                    // Release the connection
                    connection.release(function (err) {
                        if (err) {
                            console.error(err.message);
                        }
                        else {
                            console.log("GET /api/chat/mensajes/" + req.params.id + " : Connection released");
                        }
                    });
                });
            });
            //res.json({text:'search'+ req.params.id}); 
        });
    }
    searchChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield oracledb_1.default.getConnection(keys_1.default.database, function (err, connection) {
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
                    outFormat: oracledb_1.default.OBJECT // Return the result as Object
                }, function (err, result) {
                    if (err /*|| (result.rows.length < 1)*/) {
                        res.set('Content-Type', 'application/json');
                        var status = err ? 500 : 404;
                        res.status(status).send(JSON.stringify({
                            status: status,
                            message: err ? "Error getting the user profile" : "User doesn't exist",
                            detailed_message: err ? err.message : ""
                        }));
                    }
                    else {
                        res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                    }
                    // Release the connection
                    connection.release(function (err) {
                        if (err) {
                            console.error(err.message);
                        }
                        else {
                            console.log("GET /api/chat/search/IDchats/" + req.params.id + " : Connection released");
                        }
                    });
                });
            });
            //res.json({text:'search'+ req.params.id}); 
        });
    }
    createChat(req, res) {
        oracledb_1.default.getConnection(keys_1.default.database, function (err, connection) {
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
                "(:ESTADO,:FECHA, :USUARIO_ID_USUARIO, :USUARIO_ID_USUARIO1, :NOMBREHELPDESK ,:NOMBRE) ", [req.body.ESTADO, fech, req.body.USUARIO_ID_USUARIO,
                req.body.USUARIO_ID_USUARIO1, req.body.NOMBREHELPDESK, req.body.NOMBRE], {
                autoCommit: true,
                outFormat: oracledb_1.default.OBJECT // Return the result as Object  
            }, function (err, result) {
                if (err) {
                    // Error
                    res.set('Content-Type', 'application/json');
                    res.status(400).send(JSON.stringify({
                        status: 400,
                        message: err.message.indexOf("ORA-00001") > -1 ? "User already exists" : "Input Error",
                        detailed_message: err.message
                    }));
                }
                else {
                    // Successfully created the resource
                    res.status(201).set('Location', '/chat/' + req.body.USER_NAME).end();
                }
                // Release the connection
                connection.release(function (err) {
                    if (err) {
                        console.error(err.message);
                    }
                    else {
                        console.log("POST /chat : Connection released");
                    }
                });
            });
        });
        //console.log(req.body)
        //res.json({text:'post'});  
    }
    createMensajesChat(req, res) {
        oracledb_1.default.getConnection(keys_1.default.database, function (err, connection) {
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
                "(:DESCRIPCION, :FECHA, :CHAT_ID_CHAT,:USUARIO_ID_USUARIO,:NOMBRE) ", [req.body.DESCRIPCION, fech, req.body.CHAT_ID_CHAT,
                req.body.USUARIO_ID_USUARIO, req.body.NOMBRE], {
                autoCommit: true,
                outFormat: oracledb_1.default.OBJECT // Return the result as Object  
            }, function (err, result) {
                if (err) {
                    // Error
                    res.set('Content-Type', 'application/json');
                    res.status(400).send(JSON.stringify({
                        status: 400,
                        message: err.message.indexOf("ORA-00001") > -1 ? "User already exists" : "Input Error",
                        detailed_message: err.message
                    }));
                }
                else {
                    // Successfully created the resource
                    res.status(201).set('Location', '/chat/mensaje/' + req.body.USER_NAME).end();
                }
                // Release the connection
                connection.release(function (err) {
                    if (err) {
                        console.error(err.message);
                    }
                    else {
                        console.log("POST /chat/mensaje : Connection released");
                    }
                });
            });
        });
    }
    deletechat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield oracledb_1.default.getConnection(keys_1.default.database, function (err, connection) {
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
                    outFormat: oracledb_1.default.OBJECT
                }, function (err, result) {
                    if (err || result.rowsAffected === 0) {
                        // Error  
                        console.log(req.body);
                        res.set('Content-Type', 'application/json');
                        res.status(400).send(JSON.stringify({
                            status: 400,
                            message: err ? "Input Error" : "User doesn't exist",
                            detailed_message: err ? err.message : ""
                        }));
                    }
                    else {
                        // Resource successfully deleted. Sending an empty response body. 
                        res.status(204).end();
                    }
                    // Release the connection
                    connection.release(function (err) {
                        if (err) {
                            console.error(err.message);
                        }
                        else {
                            console.log("DELETE /chat/" + req.params.id + " : Connection released");
                        }
                    });
                });
            });
            //res.json({text:'delete'+ req.params.id});
        });
    }
    deletemensaje(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield oracledb_1.default.getConnection(keys_1.default.database, function (err, connection) {
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
                    outFormat: oracledb_1.default.OBJECT
                }, function (err, result) {
                    if (err || result.rowsAffected === 0) {
                        // Error  
                        console.log(req.body);
                        res.set('Content-Type', 'application/json');
                        res.status(400).send(JSON.stringify({
                            status: 400,
                            message: err ? "Input Error" : "User doesn't exist",
                            detailed_message: err ? err.message : ""
                        }));
                    }
                    else {
                        // Resource successfully deleted. Sending an empty response body. 
                        res.status(204).end();
                    }
                    // Release the connection
                    connection.release(function (err) {
                        if (err) {
                            console.error(err.message);
                        }
                        else {
                            console.log("DELETE /chat/mensajes/" + req.params.id + " : Connection released");
                        }
                    });
                });
            });
            //res.json({text:'delete'+ req.params.id});
        });
    }
    updateEstado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield oracledb_1.default.getConnection(keys_1.default.database, function (err, connection) {
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
                connection.execute("UPDATE CHAT set ESTADO =:ESTADO WHERE ID_CHAT = :id", ['Resuelto', req.params.id], {
                    autoCommit: true,
                    outFormat: oracledb_1.default.OBJECT
                }, function (err, result) {
                    if (err || result.rowsAffected === 0) {
                        // Error 
                        res.set('Content-Type', 'application/json');
                        res.status(400).send(JSON.stringify({
                            status: 400,
                            message: err ? "Input Error" : "User doesn't exist",
                            detailed_message: err ? err.message : ""
                        }));
                    }
                    else {
                        // Resource successfully deleted. Sending an empty response body. 
                        res.status(204).end();
                    }
                    // Release the connection
                    connection.release(function (err) {
                        if (err) {
                            console.error(err.message);
                        }
                        else {
                            console.log("PUT /chat/" + req.params.id + " : Connection released");
                        }
                    });
                });
            });
            // res.json({text:'update'+ req.params.id});
        });
    }
    searchHelpDesk(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield oracledb_1.default.getConnection(keys_1.default.database, function (err, connection) {
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
                    outFormat: oracledb_1.default.OBJECT // Return the result as Object
                }, function (err, result) {
                    if (err /*|| (result.rows.length < 1)*/) {
                        res.set('Content-Type', 'application/json');
                        var status = err ? 500 : 404;
                        res.status(status).send(JSON.stringify({
                            status: status,
                            message: err ? "Error getting the user profile" : "User doesn't exist",
                            detailed_message: err ? err.message : ""
                        }));
                    }
                    else {
                        res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                    }
                    // Release the connection
                    connection.release(function (err) {
                        if (err) {
                            console.error(err.message);
                        }
                        else {
                            console.log("GET /api/chat/helpdesk/" + req.params.id + " : Connection released");
                        }
                    });
                });
            });
            //res.json({text:'search'+ req.params.id}); 
        });
    }
    puntuacion(req, res) {
        oracledb_1.default.getConnection(keys_1.default.database, function (err, connection) {
            if (err) {
                // Error connecting to DB
                res.set('Content-Type', 'application/json').status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error connecting to DB",
                    detailed_message: err.message
                }));
                return;
            }
            let now = new Date();
            connection.execute("INSERT INTO PUNTUACION(PUNTUACION,USUARIO_ID_USUARIO)VALUES " +
                "(:PUNTUACION,:USUARIO_ID_USUARIO) ", [req.body.PUNTUACION, req.body.USUARIO_ID_USUARIO], {
                autoCommit: true,
                outFormat: oracledb_1.default.OBJECT // Return the result as Object  
            }, function (err, result) {
                if (err) {
                    // Error
                    res.set('Content-Type', 'application/json');
                    res.status(400).send(JSON.stringify({
                        status: 400,
                        message: err.message.indexOf("ORA-00001") > -1 ? "User already exists" : "Input Error",
                        detailed_message: err.message
                    }));
                }
                else {
                    // Successfully created the resource
                    res.status(201).set('Location', '/puntuacion/' + req.body.PRODUCTO_ID_PRODUCTO).end();
                }
                // Release the connection
                connection.release(function (err) {
                    if (err) {
                        console.error(err.message);
                    }
                    else {
                        console.log("POST /puntuacion : Connection released");
                    }
                });
            });
        });
        //console.log(req.body)
        //res.json({text:'post'});  
    }
}
const chatController = new ChatController();
exports.default = chatController;
