import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {NavigationExtras, Router} from '@angular/router'
import { AlertController } from '@ionic/angular';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  userData: any = '';
  email: string = "User";
  username: string = '' ;
  reflist = [];

  constructor(
    public afAuth: AngularFireAuth, 
    public router: Router,
    public database:DatabaseService,
    public alertController: AlertController
    ) 
  {
    // Verify if user is logged
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        //console.log(this.userData.email);
        this.username = this.userData.email.replace('@referencesapp.com','');
        this.get_references_list(this.username)
      } else {
        console.log('user not logged in')
        this.router.navigate(['login']);
      }
    })
  }

  ngOnInit() {
  }


  async get_references_list(collection_name){
    //console.log(collection_name);
    this.database.getAll(collection_name).then(firebaseResponse =>{
      firebaseResponse.subscribe(users_list_ref =>{
        console.log(users_list_ref)
        this.reflist = users_list_ref.map(ref =>{
          let reference = ref.payload.doc.data();
          reference['id'] = ref.payload.doc.id;
          return reference
        });
        console.log(this.reflist);
        //users_list_ref.forEach(ref => console.log(ref.payload.doc.data()));
    })});
  }
    
  
  async delete_reference(id){
    console.log(this.username);
    console.log(id);
    
    // Alert
    const alert = await this.alertController.create(
      {
      cssClass: 'my-custom-class',
      header: 'Delete reference',
      subHeader: '',
      message: 'Your reference will be deleted',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            return console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            this.database.delete(this.username, id).then(res =>{
              console.log("reference deleted")
            }).catch(err => {
              console.log(err)
            });

          }
        }
      ]
      }
    );
    // Call Alert
    await alert.present();
  }

  

  async edit_reference(id, reference){

    let navigationExtras: NavigationExtras = {
      queryParams: {
          id: id,
          username: this.username,
          titulopub: reference.titulopub,
          autores: reference.autores,
          tipopub: reference.tipopub,
          eventorevista: reference.eventorevista,
          doi: reference.doi,
          anyopub: JSON.stringify(reference.anyopub)
          
      }
  };
    this.router.navigate(['edit-reference'], navigationExtras)
  }

  async show_reference(id, reference){

    let navigationExtras: NavigationExtras = {
      queryParams: {
          id: id,
          username: this.username,
          titulopub: reference.titulopub,
          autores: reference.autores,
          tipopub: reference.tipopub,
          eventorevista: reference.eventorevista,
          doi: reference.doi,
          anyopub: JSON.stringify(reference.anyopub)
          
      }
  };
    this.router.navigate(['show-reference'], navigationExtras)
  }



  async SignOut() {
    //https://www.positronx.io/ionic-firebase-authentication-tutorial-with-examples/
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['login']);
    })
  }

}
