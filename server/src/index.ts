import express,{Application} from 'express';
import indexRoutes from './routes/indexRoutes';
import usuarioRoutes from './routes/usuarioRoutes';
import fileRoutes from './routes/fileRoutes';
import morgan from 'morgan';
import cors from 'cors';
const multipart = require('connect-multiparty');

class Server{
    public app: Application;

    constructor(){
     this.app=  express();
     this.config();
     this.routes();
    }

    config(): void{
        this.app.set('port', process.env.PORT || 3000);

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(morgan('dev'));
        this.app.use(cors());
        //process.env.PWD = process.cwd();
        //this.app.use(express.static('uploads'));
        //configuracion para el problema de origenes cruzados
        this.app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
         res.setHeader(
         "Access-Control-Allow-Headers",
         "Origin, X-Requested-With, Content-Type, Accept, Authorization, AuthorizationReporter"
            );
         res.setHeader(
         "Access-Control-Allow-Methods",
         "GET, POST, PATCH, PUT, DELETE, OPTIONS"
         );
        next();
        });
        
              
    }

    routes(): void{
        this.app.use('/',indexRoutes);
        this.app.use('/user',usuarioRoutes);
        this.app.use('/upload',fileRoutes);


        console.log(process.env.PWD);
    }

    start(): void{
        this.app.listen(this.app.get('port'), ()=>{
            console.log('El servidor esta en el puerto: ', this.app.get('port'));
        });

        this.app.use(express.static('uploads'));
       // console.log('el servidor ha iniciado correctamente');
        
    }

}

const server = new Server();
server.start();