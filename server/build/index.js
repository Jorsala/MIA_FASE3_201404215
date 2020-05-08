"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const usuarioRoutes_1 = __importDefault(require("./routes/usuarioRoutes"));
const fileRoutes_1 = __importDefault(require("./routes/fileRoutes"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const multipart = require('connect-multiparty');
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        //process.env.PWD = process.cwd();
        //this.app.use(express.static('uploads'));
        //configuracion para el problema de origenes cruzados
        this.app.use((req, res, next) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, AuthorizationReporter");
            res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
            next();
        });
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/user', usuarioRoutes_1.default);
        this.app.use('/upload', fileRoutes_1.default);
        console.log(process.env.PWD);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('El servidor esta en el puerto: ', this.app.get('port'));
        });
        this.app.use(express_1.default.static('uploads'));
        // console.log('el servidor ha iniciado correctamente');
    }
}
const server = new Server();
server.start();
