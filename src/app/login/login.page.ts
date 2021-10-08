import { Component, OnInit } from '@angular/core';
import {AlertController} from '@ionic/angular'
import {Router} from '@angular/router'

import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = "";
  password: string = "";

  userData: any;


  constructor(
    public afAuth: AngularFireAuth, 
    public alertController: AlertController,    
    public router: Router
    ) 
  {
    // Verify if user is logged
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        console.log(this.userData)
        console.log(JSON.stringify(this.userData))
        this.router.navigate(['/home'])
        //localStorage.setItem('user', JSON.stringify(this.userData));
        //JSON.parse(localStorage.getItem('user'));
      } else {
        //localStorage.setItem('user', null);
        //JSON.parse(localStorage.getItem('user'));
        console.log('user not logged in')
      }
    })
  }

  ngOnInit() {
  }




  async login()
  {
    const { username, password } = this
		try 
    {
			// Sign In with email and password:   
			const res = await this.afAuth.signInWithEmailAndPassword(username + '@referencesapp.com', password)
      // Go to home
      this.router.navigate(['/home'])
		} 

    // Error:
    catch(err) 
    {
			//console.dir(err)
      // If user not found show error:
      if(err.code === "auth/user-not-found") 
      {
				console.log("User not found")
        // Alert
        const alert = await this.alertController.create(
          {
          cssClass: 'my-custom-class',
          header: 'User not found',
          subHeader: '',
          message: 'Try Again or Register as new user',
          buttons: ['OK']
          }
        );
        // Call Alert
        await alert.present();
			}

      if (err.code === 'auth/wrong-password')
      {
        console.log("User not found")
        // Alert
        const alert = await this.alertController.create(
          {
          cssClass: 'my-custom-class',
          header: 'incorrect password',
          subHeader: '',
          message: 'Try Again',
          buttons: ['OK']
          }
        );
        // Call Alert
        await alert.present();
			}

		}
  }
}
