import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import {Router} from '@angular/router'
import { DatabaseService } from '../database.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-show-reference',
  templateUrl: './show-reference.page.html',
  styleUrls: ['./show-reference.page.scss'],
})
export class ShowReferencePage implements OnInit {
  id:any;
  username:any;

  // Default values
  titulopub: string;
  autores: string;
  tipopub: number;
  eventorevista: string;
  doi: string;
  anyopub: any;
  aux_pubtype: number;
  aux_anyopu: number;
  params: any;


  constructor(    
    public afAuth: AngularFireAuth, 
    public router: Router,
    public database:DatabaseService,
    public route: ActivatedRoute,
    public alertController: AlertController) 
    {
      this.route.queryParams.subscribe(params => {
        this.id = params["id"];
        this.username = params["username"];
        this.titulopub = params['titulopub'];
        this.autores = params['autores'];
        this.tipopub = params['tipopub'];
        this.eventorevista = params['eventorevista'];
        this.doi = params['doi'];
        this.anyopub = JSON.parse(params['anyopub']);
        this.aux_pubtype = this.tipopub;
        this.params = params
        //this.aux_anyopu = params['anyopub'];
        console.log(this.username)
        console.log(this.id)
     });
    }



  ngOnInit() {
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
              // Go to home
              this.router.navigate(['/home'])
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

  

}
