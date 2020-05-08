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
class ComentarioController {
    listandoComentarios(req, res) {
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
                connection.execute("SELECT * FROM COMENTARIO  WHERE COMENTARIO_ID_COMENTARIO IS NULL", {}, {
                    outFormat: oracledb_1.default.OBJECT // Return the result as Object
                }, function (err, result) {
                    if (err) {
                        res.set('Content-Type', 'application/json');
                        res.status(500).send(JSON.stringify({
                            status: 500,
                            message: "Error getting the user profile",
                            detailed_message: err.message
                        }));
                    }
                    else {
                        res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                        ;
                        //res.send(JSON.stringify(result.rowsAffected));
                        //res.send(JSON.stringify(result.rows));
                    }
                    // Release the connection
                    connection.release(function (err) {
                        if (err) {
                            console.error(err.message);
                        }
                        else {
                            console.log("GET /api/comentario: Connection released");
                        }
                    });
                });
            });
            //res.send('PRODUCTOS') 
        });
    }
    listandoComentariosproducto(req, res) {
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
                connection.execute("SELECT * FROM COMENTARIO  WHERE COMENTARIO_ID_COMENTARIO IS NULL AND PRODUCTO_ID_PRODUCTO = :id", [req.params.id], {
                    outFormat: oracledb_1.default.OBJECT // Return the result as Object
                }, function (err, result) {
                    if (err) {
                        res.set('Content-Type', 'application/json');
                        res.status(500).send(JSON.stringify({
                            status: 500,
                            message: "Error getting the user profile",
                            detailed_message: err.message
                        }));
                    }
                    else {
                        res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                        ;
                        //res.send(JSON.stringify(result.rowsAffected));
                        //res.send(JSON.stringify(result.rows));
                    }
                    // Release the connection
                    connection.release(function (err) {
                        if (err) {
                            console.error(err.message);
                        }
                        else {
                            console.log("GET /api/comentario: Connection released");
                        }
                    });
                });
            });
            //res.send('PRODUCTOS') 
        });
    }
    listandoComentariosStar5(req, res) {
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
                connection.execute("SELECT * FROM COMENTARIO  WHERE PONDERACION = 5 AND PRODUCTO_ID_PRODUCTO = :id", [req.params.id], {
                    outFormat: oracledb_1.default.OBJECT // Return the result as Object
                }, function (err, result) {
                    if (err) {
                        res.set('Content-Type', 'application/json');
                        res.status(500).send(JSON.stringify({
                            status: 500,
                            message: "Error getting the user profile",
                            detailed_message: err.message
                        }));
                    }
                    else {
                        res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                        ;
                        //res.send(JSON.stringify(result.rowsAffected));
                        //res.send(JSON.stringify(result.rows));
                    }
                    // Release the connection
                    connection.release(function (err) {
                        if (err) {
                            console.error(err.message);
                        }
                        else {
                            console.log("GET /api/comentario/star5/: Connection released");
                        }
                    });
                });
            });
            //res.send('PRODUCTOS') 
        });
    }
    listandoComentariosStar4(req, res) {
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
                connection.execute("SELECT * FROM COMENTARIO  WHERE PONDERACION = 4 AND PRODUCTO_ID_PRODUCTO = :id", [req.params.id], {
                    outFormat: oracledb_1.default.OBJECT // Return the result as Object
                }, function (err, result) {
                    if (err) {
                        res.set('Content-Type', 'application/json');
                        res.status(500).send(JSON.stringify({
                            status: 500,
                            message: "Error getting the user profile",
                            detailed_message: err.message
                        }));
                    }
                    else {
                        res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                        ;
                        //res.send(JSON.stringify(result.rowsAffected));
                        //res.send(JSON.stringify(result.rows));
                    }
                    // Release the connection
                    connection.release(function (err) {
                        if (err) {
                            console.error(err.message);
                        }
                        else {
                            console.log("GET /api/comentario/star4/: Connection released");
                        }
                    });
                });
            });
            //res.send('PRODUCTOS') 
        });
    }
    listandoComentariosStar3(req, res) {
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
                connection.execute("SELECT * FROM COMENTARIO  WHERE PONDERACION = 3 AND PRODUCTO_ID_PRODUCTO = :id", [req.params.id], {
                    outFormat: oracledb_1.default.OBJECT // Return the result as Object
                }, function (err, result) {
                    if (err) {
                        res.set('Content-Type', 'application/json');
                        res.status(500).send(JSON.stringify({
                            status: 500,
                            message: "Error getting the user profile",
                            detailed_message: err.message
                        }));
                    }
                    else {
                        res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                        ;
                        //res.send(JSON.stringify(result.rowsAffected));
                        //res.send(JSON.stringify(result.rows));
                    }
                    // Release the connection
                    connection.release(function (err) {
                        if (err) {
                            console.error(err.message);
                        }
                        else {
                            console.log("GET /api/comentario/star3/: Connection released");
                        }
                    });
                });
            });
            //res.send('PRODUCTOS') 
        });
    }
    listandoComentariosStar2(req, res) {
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
                connection.execute("SELECT * FROM COMENTARIO  WHERE PONDERACION = 2 AND PRODUCTO_ID_PRODUCTO = :id", [req.params.id], {
                    outFormat: oracledb_1.default.OBJECT // Return the result as Object
                }, function (err, result) {
                    if (err) {
                        res.set('Content-Type', 'application/json');
                        res.status(500).send(JSON.stringify({
                            status: 500,
                            message: "Error getting the user profile",
                            detailed_message: err.message
                        }));
                    }
                    else {
                        res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                        ;
                        //res.send(JSON.stringify(result.rowsAffected));
                        //res.send(JSON.stringify(result.rows));
                    }
                    // Release the connection
                    connection.release(function (err) {
                        if (err) {
                            console.error(err.message);
                        }
                        else {
                            console.log("GET /api/comentario/star2/: Connection released");
                        }
                    });
                });
            });
            //res.send('PRODUCTOS') 
        });
    }
    listandoComentariosStar1(req, res) {
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
                connection.execute("SELECT * FROM COMENTARIO  WHERE PONDERACION = 1  AND PRODUCTO_ID_PRODUCTO = :id", [req.params.id], {
                    outFormat: oracledb_1.default.OBJECT // Return the result as Object
                }, function (err, result) {
                    if (err) {
                        res.set('Content-Type', 'application/json');
                        res.status(500).send(JSON.stringify({
                            status: 500,
                            message: "Error getting the user profile",
                            detailed_message: err.message
                        }));
                    }
                    else {
                        res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                        ;
                        //res.send(JSON.stringify(result.rowsAffected));
                        //res.send(JSON.stringify(result.rows));
                    }
                    // Release the connection
                    connection.release(function (err) {
                        if (err) {
                            console.error(err.message);
                        }
                        else {
                            console.log("GET /api/comentario/star1/: Connection released");
                        }
                    });
                });
            });
            //res.send('PRODUCTOS') 
        });
    }
    listandoComentariosRespuesta(req, res) {
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
                connection.execute("SELECT * FROM COMENTARIO  WHERE COMENTARIO_ID_COMENTARIO IS NOT NULL AND PRODUCTO_ID_PRODUCTO = :id", [req.params.id], {
                    outFormat: oracledb_1.default.OBJECT // Return the result as Object
                }, function (err, result) {
                    if (err) {
                        res.set('Content-Type', 'application/json');
                        res.status(500).send(JSON.stringify({
                            status: 500,
                            message: "Error getting the user profile",
                            detailed_message: err.message
                        }));
                    }
                    else {
                        res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                        ;
                        //res.send(JSON.stringify(result.rowsAffected));
                        //res.send(JSON.stringify(result.rows));
                    }
                    // Release the connection
                    connection.release(function (err) {
                        if (err) {
                            console.error(err.message);
                        }
                        else {
                            console.log("GET /api/comentario: Connection released");
                        }
                    });
                });
            });
            //res.send('PRODUCTOS') 
        });
    }
    searchComentarioIndividual(req, res) {
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
                connection.execute("SELECT * FROM COMENTARIO WHERE USUARIO_ID_USUARIO = :id", [req.params.id], {
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
                            console.log("GET /api/comentario/search/" + req.params.id + " : Connection released");
                        }
                    });
                });
            });
            //res.json({text:'search'+ req.params.id}); 
        });
    }
    create(req, res) {
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
            connection.execute("INSERT INTO COMENTARIO(TITULO,FECHA,PONDERACION,DESCRIPCION,NOMBREUSUARIO,USUARIO_ID_USUARIO,COMENTARIO_ID_COMENTARIO,PRODUCTO_ID_PRODUCTO)VALUES " +
                "(:TITULO,:FECHA,:PONDERACION,:DESCRIPCION,:NOMBREUSUARIO,:USUARIO_ID_USUARIO,:COMENTARIO_ID_COMENTARIO,:PRODUCTO_ID_PRODUCTO) ", [req.body.TITULO, now, req.body.PONDERACION,
                req.body.DESCRIPCION, req.body.NOMBREUSUARIO, req.body.USUARIO_ID_USUARIO, req.body.COMENTARIO_ID_COMENTARIO, req.body.PRODUCTO_ID_PRODUCTO], {
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
                    res.status(201).set('Location', '/comentario/' + req.body.PRODUCTO_ID_PRODUCTO).end();
                }
                // Release the connection
                connection.release(function (err) {
                    if (err) {
                        console.error(err.message);
                    }
                    else {
                        console.log("POST /comentario : Connection released");
                    }
                });
            });
        });
        //console.log(req.body)
        //res.json({text:'post'});  
    }
    delete(req, res) {
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
                connection.execute("DELETE FROM COLOR WHERE ID_COMENTARIO = :id", [req.params.id], {
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
                            console.log("DELETE /comentario/" + req.params.id + " : Connection released");
                        }
                    });
                });
            });
            //res.json({text:'delete'+ req.params.id});
        });
    }
}
const comentarioController = new ComentarioController();
exports.default = comentarioController;
