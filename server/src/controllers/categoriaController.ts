import { Request, Response } from 'express';
//import db from '../database';
import oracle from 'oracledb';
import keys from './keys'
import { promises } from 'fs';
class CategoriaController {
    public async listandocategorias(req: Request, res: Response) {
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

            connection.execute("SELECT DISTINCT NOMBRE FROM CATEGORIA", {}, {
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
                            console.log("GET /api/categoria: Connection released");
                        }
                    });
            });
        })
        //res.send('PRODUCTOS') 
    }

    public async search(req: Request, res: Response): Promise<any> { // categorias del producto
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
            console.log(req.params.id)
            connection.execute("SELECT * FROM CATEGORIA WHERE PRODUCTO_ID_PRODUCTO = :id", [req.params.id], {
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
                            console.log("GET /api/categoria/" + req.params.id + " : Connection released");
                        }
                    });
            });
        });
        //res.json({text:'search'+ req.params.id}); 
    }
    public async searchnombre(req: Request, res: Response): Promise<any> { // categorias del producto
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
            //console.log(req.body.PRODUCTO_ID_PRODUCTO)
            connection.execute("SELECT * FROM CATEGORIA WHERE PRODUCTO_ID_PRODUCTO = :PRODUCTO_ID_PRODUCTO", [req.body.PRODUCTO_ID_PRODUCTO], {
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
                            console.log("GET /api/categoria/idproducto/" + req.body.PRODUCTO_ID_PRODUCTO + " : Connection released");
                        }
                    });
            });
        });
        //res.json({text:'search'+ req.params.id}); 
    }

    public async searchCategoria(req: Request, res: Response): Promise<any> { // BUSCA POR CATEGORIA
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

            connection.execute("SELECT * FROM CATEGORIA WHERE ID_CATEGORIA = :id", [req.params.id], {
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
                            console.log("GET /api/categoria/search/" + req.params.id + " : Connection released");
                        }
                    });
            });
        });
        //res.json({text:'search'+ req.params.id}); 
    }

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
            connection.execute("INSERT INTO CATEGORIA(NOMBRE,DESCRIPCION,CATEGORIA_ID_CATEGORIA,PRODUCTO_ID_PRODUCTO) VALUES " +
                "(:NOMBRE,:DESCRIPCION, :CATEGORIA_ID_CATEGORIA, :PRODUCTO_ID_PRODUCTO) ", [req.body.NOMBRE, req.body.DESCRIPCION,
                req.body.CATEGORIA_ID_CATEGORIA, req.body.PRODUCTO_ID_PRODUCTO], {
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
                        res.status(201).set('Location', '/categoria/' + req.body.USER_NAME).end();
                    }
                    // Release the connection
                    connection.release(
                        function (err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("POST /categoria : Connection released");
                            }
                        });
                });
        })


        //console.log(req.body)
        //res.json({text:'post'});  
    }

    public createcarga(req: Request, res: Response) {
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
            connection.execute("CALL INSERTAR_CATEGORIA(:NOMBRE,:DESCRIPCION, :CATEGORIA_ID_CATEGORIA, :PRODUCTO_ID_PRODUCTO) ", [req.body.NOMBRE, req.body.DESCRIPCION,
            req.body.CATEGORIA_ID_CATEGORIA, req.body.PRODUCTO_ID_PRODUCTO], {
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
                        res.status(201).set('Location', '/categoria/' + req.body.USER_NAME).end();
                    }
                    // Release the connection
                    connection.release(
                        function (err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("POST /categoria : Connection released");
                            }
                        });
                });
        })


        //console.log(req.body)
        //res.json({text:'post'});  
    }

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

            connection.execute("DELETE FROM CATEGORIA WHERE ID_CATEGORIA = :id", [req.params.id], {
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
                            console.log("DELETE /categoria/" + req.params.id + " : Connection released");
                        }
                    });

            });
        });
        //res.json({text:'delete'+ req.params.id});
    }

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
            const { id } = req.params.id;
            connection.execute("UPDATE CATEGORIA set NOMBRE =:NOMBRE, DESCRIPCION =:DESCRIPCION , CATEGORIA_ID_CATEGORIA =:CATEGORIA_ID_CATEGORIA , PRODUCTO_ID_PRODUCTO=:PRODUCTO_ID_PRODUCTO WHERE ID_CATEGORIA = :id", [req.body.NOMBRE, req.body.DESCRIPCION,
            req.body.CATEGORIA_ID_CATEGORIA, req.body.PRODUCTO_ID_PRODUCTO, req.params.id], {
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
                                console.log("PUT /categoria/" + req.params.id + " : Connection released");
                            }
                        });

                });
        });
        // res.json({text:'update'+ req.params.id});
    }

}

const categoriaController = new CategoriaController();
export default categoriaController;
