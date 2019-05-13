import { Posts } from './../clases/post';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(private httpc: HttpClient) {}

  headers: HttpHeaders = new HttpHeaders({
    // 'Content-Type':  'application/json',
    // 'Authorization': 'my-auth-token'
    });

// List Tree Begin()
  getAllTree() {
       const urlApi = `http://localhost/new/server/web/`;
       return this.httpc.get(urlApi);
  }

// Add node Tree(objPost: Post [name, type, nameF, Folder])
  addNodeTree(objPost: Posts) {
        const urlApi = `http://localhost/new/server/web/nodo/adicionar`;
        return this.httpc.post(urlApi, objPost);
  }

// Move node Tree(objPost: Post [rutaO, rutaD, Folder])
  moveNodeTree(objPost: Posts) {
        const urlApi = `http://localhost/new/server/web/nodo/mover`;
        return this.httpc.post(urlApi, objPost);
  }

// Delete node Tree(objPost: Post [ruta, Folder])
  deleteNodeTree(objPost: Posts) {
        const urlApi = `http://localhost/new/server/web/nodo/eliminar`;
        return this.httpc.post(urlApi, objPost);
  }

}
