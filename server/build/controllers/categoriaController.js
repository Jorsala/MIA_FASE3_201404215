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
class CategoriaController {
    listandocategorias(req, res) {
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
                connection.execute("SELECT DISTINCT NOMBRE FROM CATEGORIA", {}, {
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
                            console.log("GET /api/categoria: Connection released");
                        }
                    });
                });
            });
            //res.send('PRODUCTOS') 
        });
    }
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
                console.log(req.params.id);
                connection.execute("SELECT * FROM CATEGORIA WHERE PRODUCTO_ID_PRODUCTO = :id", [req.params.id], {
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
                            console.log("GET /api/categoria/" + req.params.id + " : Connection released");
                        }
                    });
                });
            });
            //res.json({text:'search'+ req.params.id}); 
        });
    }
    searchnombre(req, res) {
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
                //console.log(req.body.PRODUCTO_ID_PRODUCTO)
                connection.execute("SELECT * FROM CATEGORIA WHERE PRODUCTO_ID_PRODUCTO = :PRODUCTO_ID_PRODUCTO", [req.body.PRODUCTO_ID_PRODUCTO], {
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
                            console.log("GET /api/categoria/idproducto/" + req.body.PRODUCTO_ID_PRODUCTO + " : Connection released");
                        }
                    });
                });
            });
            //res.json({text:'search'+ req.params.id}); 
        });
    }
    searchCategoria(req, res) {
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
                connection.execute("SELECT * FROM CATEGORIA WHERE ID_CATEGORIA = :id", [req.params.id], {
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
                            console.log("GET /api/categoria/search/" + req.params.id + " : Connection released");
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
            connection.execute("INSERT INTO CATEGORIA(NOMBRE,DESCRIPCION,CATEGORIA_ID_CATEGORIA,PRODUCTO_ID_PRODUCTO) VALUES " +
                "(:NOMBRE,:DESCRIPCION, :CATEGORIA_ID_CATEGORIA, :PRODUCTO_ID_PRODUCTO) ", [req.body.NOMBRE, req.body.DESCRIPCION,
                req.body.CATEGORIA_ID_CATEGORIA, req.body.PRODUCTO_ID_PRODUCTO], {
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
                    res.status(201).set('Location', '/categoria/' + req.body.USER_NAME).end();
                }
                // Release the connection
                connection.release(function (err) {
                    if (err) {
                        console.error(err.message);
                    }
                    else {
                        console.log("POST /categoria : Connection released");
                    }
                });
            });
        });
        //console.log(req.body)
        //res.json({text:'post'});  
    }
    createcarga(req, res) {
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
            connection.execute("CALL INSERTAR_CATEGORIA(:NOMBRE,:DESCRIPCION, :CATEGORIA_ID_CATEGORIA, :PRODUCTO_ID_PRODUCTO) ", [req.body.NOMBRE, req.body.DESCRIPCION,
                req.body.CATEGORIA_ID_CATEGORIA, req.body.PRODUCTO_ID_PRODUCTO], {
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
                    res.status(201).set('Location', '/categoria/' + req.body.USER_NAME).end();
                }
                // Release the connection
                connection.release(function (err) {
                    if (err) {
                        console.error(err.message);
                    }
                    else {
                        console.log("POST /categoria : Connection released");
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
                connection.execute("DELETE FROM CATEGORIA WHERE ID_CATEGORIA = :id", [req.params.id], {
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
                            console.log("DELETE /categoria/" + req.params.id + " : Connection released");
                        }
                    });
                });
            });
            //res.json({text:'delete'+ req.params.id});
        });
    }
    update(req, res) {
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
                connection.execute("UPDATE CATEGORIA set NOMBRE =:NOMBRE, DESCRIPCION =:DESCRIPCION , CATEGORIA_ID_CATEGORIA =:CATEGORIA_ID_CATEGORIA , PRODUCTO_ID_PRODUCTO=:PRODUCTO_ID_PRODUCTO WHERE ID_CATEGORIA = :id", [req.body.NOMBRE, req.body.DESCRIPCION,
                    req.body.CATEGORIA_ID_CATEGORIA, req.body.PRODUCTO_ID_PRODUCTO, req.params.id], {
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
                            console.log("PUT /categoria/" + req.params.id + " : Connection released");
                        }
                    });
                });
            });
            // res.json({text:'update'+ req.params.id});
        });
    }
}
const categoriaController = new CategoriaController();
exports.default = categoriaController;
