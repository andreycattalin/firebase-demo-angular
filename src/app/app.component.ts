import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CrudService } from './shared/services/crud.service';
import { Post } from './models/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items: Observable<any[]>;

  misPosts: Array<Post> = []

  constructor(private fire: AngularFirestore, private crudPosts: CrudService) {
    this.items = fire.collection('users').valueChanges();

    this.readAllPosts()

    this.getPost()
  }

  deletePost() {
    this.crudPosts.deletePost("AIUns5d7Sc5asb3Jv3HD").then(success => {
      console.log("Se ha eliminado correctamente")
    }).catch(error => {
      console.error("Problema eliminando")
    })
  }

  updatePost() {
    const publicacion: Post = {
      author: "mWjtPSwuTmQ13g1dg5Ic",
      content: "Lorem ipsum lo que sea...",
      title: "Nada de final",
      date: new Date()
    }

    this.crudPosts.updatePost("QAMVIzzRhhJR06iAwdCs", publicacion).then( success => {
      console.log("Todo ok pajaro")
      // window.location.reload()
    }).catch(error => {
      console.error("Algo muy loco ha pasado, error")
    })

  }

  getPost() {
    this.crudPosts.getPost("IPVvsmUt4ehuARCtzuj8").subscribe( data => {
      console.log("La publicación que quieres ver es", data.id, " y.. ", data.data())
    })
  }

  readAllPosts() {
    this.crudPosts.readAllPost().subscribe( data => {

      data.forEach( (doc: any) => {

        let myPost: Post = doc.data()
        myPost.id = doc.id

        this.misPosts.push(myPost)

      })

    })
  }

  createPost() {
    console.log("DALE")

    const publicacion: Post = {
      author: "mWjtPSwuTmQ13g1dg5Ic",
      content: "Lorem ipsum lo que sea...",
      title: "La mejor noticia del mundo",
      date: new Date()
    }

    this.crudPosts.newPost(publicacion).then( success => {
      console.log("To' ok!")
    }).catch(error => {
      console.error("Algo ha ido mal colega")
    })

  }


}
