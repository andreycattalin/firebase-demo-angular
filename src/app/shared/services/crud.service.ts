import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Post } from '../../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private fireStore: AngularFirestore) { }

  // Crear un objeto en la collection 'posts' con id automático
  newPost(data: Post) {
    return this.fireStore.collection('posts').add(data)
  }

  // Leer todos los documentos de la collection 'posts'
  readAllPost() {
    return this.fireStore.collection('posts').get()
  }

  // Obtener un documento por el id
  getPost(id: string) {
    return this.fireStore.collection('posts').doc(id).get()
  }

  updatePost(id: string, data: Post){
    return this.fireStore.collection('posts').doc(id).update(data)
  }

  deletePost(id: string) {
    return this.fireStore.collection('posts').doc(id).delete()
  }

}
