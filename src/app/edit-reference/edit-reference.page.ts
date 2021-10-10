import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {Router} from '@angular/router'
import { DatabaseService } from '../database.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-edit-reference',
  templateUrl: './edit-reference.page.html',
  styleUrls: ['./edit-reference.page.scss'],
})
export class EditReferencePage implements OnInit {

  id:any;
  username:any;

  // Default values
  titulopub: string;
  autores: string;
  tipopub: number;
  eventorevista: string;
  doi: string;
  anyopub: any;

  constructor(    
    public afAuth: AngularFireAuth, 
    public router: Router,
    public database:DatabaseService,
    public route: ActivatedRoute,
    public alertController: AlertController
    ){ 
      this.route.queryParams.subscribe(params => {
        this.id = params["id"];
        this.username = params["username"];
        this.titulopub = params['titulopub'];
        this.autores = params['autores'];
        this.tipopub = params['titulopub'];
        this.eventorevista = params['eventorevista'];
        this.doi = params['doi'];
        this.anyopub = params['anyopub'];
        console.log(this.username)
        console.log(this.id)

      });
    }

  ngOnInit() {

  }


  async editref(){

    const { titulopub, autores, tipopub, eventorevista, doi,  anyopub} = this
    let anyo:number;
    try{
      anyo = Number(this.anyopub.substring(0, 4));
    }
    catch{
          // Alert
      const alert = await this.alertController.create(
        {
        cssClass: 'my-custom-class',
        header: 'Year not found',
        subHeader: '',
        message: 'Try Must Select the year',
        buttons: ['OK']
        }
      );
      // Call Alert
      await alert.present();
      return 0
    }



		try 
    {
      console.log(this.titulopub, this.autores, this.tipopub, this.eventorevista, anyo)
      console.log(this.id)
      //console.log(typeof this.tipopub)

      let new_ref = {
        titulopub: this.titulopub,
        autores: this.autores,
        tipopub: this.tipopub,
        eventorevista: this.eventorevista,
        doi: this.doi,
        anyopub: anyo
      }

      
      const res_2 = await this.database.updateItem(this.username, this.id, new_ref ).then(res =>{
        console.log(res)
      }).catch(err => {
        return console.log(err)
      });
      

      // Go to home
      this.router.navigate(['/home'])

		} 
    catch(error) 
    {
      // Error
			console.log(error)
    }
    
  }

}
