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
const fs_1 = __importDefault(require("fs"));
class FileController {
    cargarImagen(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { pathFile } = req.body;
            fs_1.default.readFile(pathFile, 'base64', (err, data) => {
                if (err) {
                    console.log('ocurrio un error');
                }
                else {
                    res.status(200).json('data:image/png;base64,' + data.toString());
                }
            });
        });
    }
}
exports.fileController = new FileController();
