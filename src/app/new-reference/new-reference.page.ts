import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-new-reference',
  templateUrl: './new-reference.page.html',
  styleUrls: ['./new-reference.page.scss'],
})
export class NewReferencePage implements OnInit {

  userData: any = '';
  email: string = "User";
  username: string = '' ;

  // Default values
  titulopub: string = "";
  autores: string = "";
  tipopub: number = 1;
  eventorevista: string = "";
  doi: string = "";
  anyopub: any = "2000";
  summary:string = '';

  constructor(
    public afAuth: AngularFireAuth, 
    public router: Router,
    private database: DatabaseService,
    ){ 
      // Verify if user is logged
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.userData = user;
          console.log(this.userData.email);
          this.username = this.userData.email.replace('@referencesapp.com','');
        } 
        else {
          console.log('user not logged in')
          this.router.navigate(['login']);
        }
      })
    }

  ngOnInit() {
  }


  async saveref(){

    const { titulopub, autores, tipopub, eventorevista, doi, anyopub, summary} = this

    let anyo:number = Number(this.anyopub.substring(0, 4));
		try 
    {

      console.log(this.titulopub, this.autores, this.tipopub, this.eventorevista, anyo, this.summary)
      //console.log(typeof anyo)
      //console.log(typeof this.tipopub)

      let new_ref = {
        titulopub: this.titulopub,
        autores: this.autores,
        tipopub: this.tipopub,
        eventorevista: this.eventorevista,
        doi: this.doi,
        anyopub: anyo,
        summary: this.summary
      }

      const res_2 = await this.database.create_ref(this.username, new_ref).then(res =>{
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
