import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AlertController} from '@ionic/angular'
import {Router} from '@angular/router'


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string = ""
	password: string = ""
	cpassword: string = ""

  userData: any;

  constructor(
    public afAuth: AngularFireAuth, 
    public router: Router,
    public alertController: AlertController,
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

  async register(){

    const { username, password, cpassword } = this
		// If passwords are not the same
    if(password !== cpassword) 
    {
      // Alert
      const alert = await this.alertController.create(
        {
        cssClass: 'my-custom-class',
        header: 'Password error',
        subHeader: '',
        message: 'Password must be the same',
        buttons: ['OK']
        }
      );
      // Call Alert
      await alert.present();
			return console.error("Passwords sholud be the same")
		}
		try 
    {
      // Try to create new user
			const res = await this.afAuth.createUserWithEmailAndPassword(username + '@referencesapp.com', password)
      console.log(res)
      // Go to home
      this.router.navigate(['/home'])
		} 
    catch(error) 
    {
      // Error
			console.log(error)
      if(error.code === 'auth/weak-password'){
        // Alert
        const alert = await this.alertController.create(
          {
          cssClass: 'my-custom-class',
          header: 'Password error',
          subHeader: '',
          message: 'Password must have at least 6 characters',
          buttons: ['OK']
          }
        );
        // Call Alert
        await alert.present();
      }

		}
    

  }

}
