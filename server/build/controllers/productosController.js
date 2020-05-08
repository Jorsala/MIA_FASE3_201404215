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
class ProductosController {
    listandoproductos(req, res) {
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
                var tmp = "";
                console.log(req.body.TIPOORDENAMIENTO);
                if (req.body.TIPOORDENAMIENTO == 'Asc') {
                    if (req.body.ORDENAMIENTO == 'Fecha') {
                        tmp = "ORDER BY FECHA_PUBLICACION ASC";
                        /*}else if(req.body.ORDENAMIENTO=="Puntuaciones"){ // PORQUE AUN NO LO TENGO
                            tmp = "ORDER BY PUNTUACIONES ASC"*/
                    }
                    else if (req.body.ORDENAMIENTO == 'Precio') {
                        tmp = "ORDER BY PRECIO ASC";
                    }
                }
                else if (req.body.TIPOORDENAMIENTO == 'Desc') {
                    if (req.body.ORDENAMIENTO == "Fecha") {
                        tmp = "ORDER BY FECHA_PUBLICACION DESC";
                        /*}else if(req.body.ORDENAMIENTO=="Puntuaciones"){ // PORQUE AUN NO LO TENGO
                            tmp = "ORDER BY PUNTUACIONES DESC"*/
                    }
                    else if (req.body.ORDENAMIENTO == 'Precio') {
                        tmp = "ORDER BY PRECIO DESC";
                    }
                }
                else {
                    tmp = "";
                    console.log('vali');
                }
                console.log(tmp);
                var tmpCONEXION = "SELECT * FROM PRODUCTO " + tmp;
                console.log(tmpCONEXION);
                connection.execute(tmpCONEXION, {}, {
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
                            console.log("GET /api/productos: Connection released");
                        }
                    });
                });
            });
            //res.send('PRODUCTOS') 
        });
    }
    listandoLIKENOMBRE(req, res) {
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
                var patron = req.params.id;
                patron = "'%" + patron + "%'";
                console.log(patron);
                var tmp = "";
                console.log(req.body.TIPOORDENAMIENTO);
                if (req.body.TIPOORDENAMIENTO == 'Asc') {
                    if (req.body.ORDENAMIENTO == 'Fecha') {
                        tmp = "ORDER BY FECHA_PUBLICACION ASC";
                        /*}else if(req.body.ORDENAMIENTO=="Puntuaciones"){ // PORQUE AUN NO LO TENGO
                            tmp = "ORDER BY PUNTUACIONES ASC"*/
                    }
                    else if (req.body.ORDENAMIENTO == 'Precio') {
                        tmp = "ORDER BY PRECIO ASC";
                    }
                }
                else if (req.body.TIPOORDENAMIENTO == 'Desc') {
                    if (req.body.ORDENAMIENTO == "Fecha") {
                        tmp = "ORDER BY FECHA_PUBLICACION DESC";
                        /*}else if(req.body.ORDENAMIENTO=="Puntuaciones"){ // PORQUE AUN NO LO TENGO
                            tmp = "ORDER BY PUNTUACIONES DESC"*/
                    }
                    else if (req.body.ORDENAMIENTO == 'Precio') {
                        tmp = "ORDER BY PRECIO DESC";
                    }
                }
                else {
                    tmp = "";
                    console.log('vali');
                }
                console.log(tmp);
                connection.execute("SELECT * FROM PRODUCTO WHERE NOMBRE  LIKE " + patron + tmp, {}, {
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
                            console.log("GET /api/productos/LIKENOMBRE/" + req.params.id + " : Connection released");
                        }
                    });
                });
            });
        });
    }
    listandoLikeNombreCategoria(req, res) {
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
                var patron = req.body.PATRON;
                patron = "'%" + patron + "%'";
                console.log(patron);
                var temp = req.body.CATEGORIA;
                console.log(temp);
                var tmp = "";
                console.log(req.body.TIPOORDENAMIENTO);
                if (req.body.TIPOORDENAMIENTO == 'Asc') {
                    if (req.body.ORDENAMIENTO == 'Fecha') {
                        tmp = "ORDER BY FECHA_PUBLICACION ASC";
                        /*}else if(req.body.ORDENAMIENTO=="Puntuaciones"){ // PORQUE AUN NO LO TENGO
                            tmp = "ORDER BY PUNTUACIONES ASC"*/
                    }
                    else if (req.body.ORDENAMIENTO == 'Precio') {
                        tmp = "ORDER BY PRECIO ASC";
                    }
                }
                else if (req.body.TIPOORDENAMIENTO == 'Desc') {
                    if (req.body.ORDENAMIENTO == "Fecha") {
                        tmp = "ORDER BY FECHA_PUBLICACION DESC";
                        /*}else if(req.body.ORDENAMIENTO=="Puntuaciones"){ // PORQUE AUN NO LO TENGO
                            tmp = "ORDER BY PUNTUACIONES DESC"*/
                    }
                    else if (req.body.ORDENAMIENTO == 'Precio') {
                        tmp = "ORDER BY PRECIO DESC";
                    }
                }
                else {
                    tmp = "";
                    console.log('vali');
                }
                console.log(tmp);
                var consulta = "SELECT p.id_producto ,p.descripcion,p.precio,p.nombre,p.imagen,p.fecha_publicacion  FROM categoria c INNER JOIN producto p  ON p.id_producto = c.producto_id_producto  AND  p.nombre LIKE  " + patron + " WHERE c.nombre = '" + temp + "' " + tmp;
                //"SELECT p.id_producto,p.descripcion,p.precio,p.nombre,p.imagen FROM CATEGORIA c INNER JOIN PRODUCTO p ON p.id_producto = c.producto_id_producto AND p.nombre LIKE "+
                // patron +" WHERE c.NOMBRE ="+ temp
                connection.execute(consulta, {}, {
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
                        //console.log(result);
                        res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                    }
                    // Release the connection
                    connection.release(function (err) {
                        if (err) {
                            console.error(err.message);
                        }
                        else {
                            console.log("GET /api/productos/likenombrecategoria/" + req.params.id + " : Connection released");
                        }
                    });
                });
            });
        });
    }
    listandoCategoria(req, res) {
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
                /*var patron:string = req.body.PATRON;
                patron = "'%"+patron+"%'";
                console.log(patron);
                var temp:string = req.body.CATEGORIA;
                console.log(temp);*/
                var tmp = " ";
                console.log(req.body.TIPOORDENAMIENTO);
                if (req.body.TIPOORDENAMIENTO == 'Asc') {
                    if (req.body.ORDENAMIENTO == 'Fecha') {
                        tmp = "ORDER BY FECHA_PUBLICACION ASC";
                        /*}else if(req.body.ORDENAMIENTO=="Puntuaciones"){ // PORQUE AUN NO LO TENGO
                            tmp = "ORDER BY PUNTUACIONES ASC"*/
                    }
                    else if (req.body.ORDENAMIENTO == 'Precio') {
                        tmp = "ORDER BY PRECIO ASC";
                    }
                }
                else if (req.body.TIPOORDENAMIENTO == 'Desc') {
                    if (req.body.ORDENAMIENTO == "Fecha") {
                        tmp = "ORDER BY FECHA_PUBLICACION DESC";
                        /*}else if(req.body.ORDENAMIENTO=="Puntuaciones"){ // PORQUE AUN NO LO TENGO
                            tmp = "ORDER BY PUNTUACIONES DESC"*/
                    }
                    else if (req.body.ORDENAMIENTO == 'Precio') {
                        tmp = "ORDER BY PRECIO DESC";
                    }
                }
                else {
                    tmp = "";
                    console.log('vali');
                }
                console.log(tmp);
                var parametro = req.params.id;
                var parametrotemp = "'" + parametro + "'";
                var tmpusuario2;
                if (typeof (req.body.ID_USUARIO) != "undefined") {
                    var tmpusuario = req.body.ID_USUARIO;
                    console.log(tmpusuario);
                    tmpusuario2 = "AND p.usuario_id_usuario = " + tmpusuario;
                }
                else {
                    tmpusuario2 = "";
                    console.log('es inventario no productos en venta');
                }
                var consulta = "SELECT p.id_producto ,p.descripcion,p.precio,p.nombre,p.imagen,p.fecha_publicacion  FROM categoria c INNER JOIN producto p  ON p.id_producto = c.producto_id_producto WHERE c.nombre =" + parametrotemp + tmpusuario2 + tmp;
                //"SELECT p.id_producto,p.descripcion,p.precio,p.nombre,p.imagen FROM CATEGORIA c INNER JOIN PRODUCTO p ON p.id_producto = c.producto_id_producto AND p.nombre LIKE "+
                // patron +" WHERE c.NOMBRE ="+ temp
                //console.log(consulta); 
                connection.execute(consulta, {}, {
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
                        //console.log(result);
                        res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                    }
                    // Release the connection
                    connection.release(function (err) {
                        if (err) {
                            console.error(err.message);
                        }
                        else {
                            console.log("GET /api/productos/categoria/" + req.params.id + " : Connection released");
                        }
                    });
                });
            });
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
                var tmp = "";
                if (req.body.TIPOORDENAMIENTO == "Asc") {
                    if (req.body.ORDENAMIENTO == "Fecha") {
                        tmp = "ORDER BY FECHA_PUBLICACION ASC";
                        /*}else if(req.body.ORDENAMIENTO=="Puntuaciones"){ // PORQUE AUN NO LO TENGO
                            tmp = "ORDER BY PUNTUACIONES ASC"*/
                    }
                    else if (req.body.ORDENAMIENTO == "Precio") {
                        tmp = "ORDER BY PRECIO ASC";
                    }
                }
                else if (req.body.TIPOORDENAMIENTO == "Desc") {
                    if (req.body.ORDENAMIENTO == "Fecha") {
                        tmp = "ORDER BY FECHA_PUBLICACION DESC";
                        /*}else if(req.body.ORDENAMIENTO=="Puntuaciones"){ // PORQUE AUN NO LO TENGO
                            tmp = "ORDER BY PUNTUACIONES DESC"*/
                    }
                    else if (req.body.ORDENAMIENTO == "Precio") {
                        tmp = "ORDER BY PRECIO DESC";
                    }
                }
                else {
                    tmp = "";
                }
                console.log(tmp);
                connection.execute("SELECT * FROM producto WHERE USUARIO_ID_USUARIO = :id " + tmp, [req.params.id], {
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
                            console.log("GET /api/productos/searchs/" + req.params.id + " : Connection released");
                        }
                    });
                });
            });
            //res.json({text:'search'+ req.params.id}); 
        });
    }
    searchProducto(req, res) {
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
                connection.execute("SELECT * FROM producto WHERE ID_PRODUCTO = :id", [req.params.id], {
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
                            console.log("GET /api/productos/search/" + req.params.id + " : Connection released");
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
            //console.log(req.body);
            connection.execute("INSERT INTO producto VALUES " +
                "(:ID_PRODUCTO, :NOMBRE,:DESCRIPCION, :IMAGEN, :PRECIO," +
                ":FECHA_PUBLICACION, :CANTIDAD_DISPONIBLE, :USUARIO_ID_USUARIO) ", [req.body.ID_PRODUCTO, req.body.NOMBRE, req.body.DESCRIPCION,
                req.body.IMAGEN, req.body.PRECIO, now, req.body.CANTIDAD_DISPONIBLE,
                req.body.USUARIO_ID_USUARIO], {
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
                    res.status(201).set('Location', '/productos/' + req.body.USER_NAME).end();
                }
                // Release the connection
                connection.release(function (err) {
                    if (err) {
                        console.error(err.message);
                    }
                    else {
                        //console.log('entro en posts')
                        console.log("POST /productos : Connection released");
                    }
                });
            });
        });
        //console.log('entro en post')
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
            let now = new Date();
            console.log(req.body);
            connection.execute("CALL INSERTAR_PRODUCTO(:ID_PRODUCTO, :NOMBRE,:DESCRIPCION, :IMAGEN, :PRECIO," +
                ":FECHA_PUBLICACION, :CANTIDAD_DISPONIBLE, :USUARIO_ID_USUARIO) ", [req.body.ID_PRODUCTO, req.body.NOMBRE, req.body.DESCRIPCION,
                req.body.IMAGEN, req.body.PRECIO, now, req.body.CANTIDAD_DISPONIBLE,
                req.body.USUARIO_ID_USUARIO], {
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
                    res.status(201).set('Location', '/productos/' + req.body.USER_NAME).end();
                }
                // Release the connection
                connection.release(function (err) {
                    if (err) {
                        console.error(err.message);
                    }
                    else {
                        //console.log('entro en posts')
                        console.log("POST /productos/carga : Connection released");
                    }
                });
            });
        });
        //console.log('entro en post')
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
                connection.execute("DELETE FROM producto WHERE ID_PRODUCTO = :id", [req.params.id], {
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
                            console.log("DELETE /producto/" + req.params.id + " : Connection released");
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
                connection.execute("UPDATE producto set NOMBRE =:NOMBRE, DESCRIPCION =:DESCRIPCION , IMAGEN =:IMAGEN , PRECIO=:PRECIO ,CANTIDAD_DISPONIBLE =:CANTIDAD_DISPONIBLE  WHERE ID_PRODUCTO = :id", [req.body.NOMBRE, req.body.DESCRIPCION,
                    req.body.IMAGEN, req.body.PRECIO, req.body.CANTIDAD_DISPONIBLE, req.params.id], {
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
                            console.log("PUT /producto/" + req.params.id + " : Connection released");
                        }
                    });
                });
            });
            // res.json({text:'update'+ req.params.id});
        });
    }
    updateproducto(req, res) {
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
                connection.execute("UPDATE PRODUCTO set CANTIDAD_DISPONIBLE =:CANTIDAD_DISPONIBLE WHERE ID_PRODUCTO = :ID_PRODUCTO", [req.body.CANTIDAD_DISPONIBLE, req.params.id], {
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
                            console.log("PUT /productocantidad/" + req.params.id + " : Connection released");
                        }
                    });
                });
            });
            // res.json({text:'update'+ req.params.id});
        });
    }
}
const productosController = new ProductosController();
exports.default = productosController;
