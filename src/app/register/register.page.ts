import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AlertController} from '@ionic/angular'
import {Router} from '@angular/router'
import { DatabaseService } from '../database.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string = ""
	password: string = ""
  email: string = ""
  name: string = ""
	cpassword: string = ""


  userData: any;

  constructor(
    public afAuth: AngularFireAuth, 
    public router: Router,
    public alertController: AlertController,
    private database: DatabaseService,
    ) 
    {
      // Verify if user is logged
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.userData = user;
          console.log(this.userData)
          console.log(JSON.stringify(this.userData))
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

    const { username, password, cpassword, email, name } = this
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
    if (email === "") {
      // Alert
      const alert = await this.alertController.create(
        {
        cssClass: 'my-custom-class',
        header: 'Email empty',
        subHeader: '',
        message: 'You must provide an email',
        buttons: ['OK']
        }
      );
      // Call Alert
      await alert.present();
      return console.error("Email not provided")
    }
		try 
    {
      // Try to create new user
			const res = await this.afAuth.createUserWithEmailAndPassword(username + '@referencesapp.com', password)
      console.log(res)

      let new_user = {
        email:this.email,
        name:this.name,
        username: this.username,
        //password:this.password,
      }

      const res_2 = await this.database.create('users', this.username, new_user).then(res =>{
        console.log(res_2)
      }).catch(err => {
        console.log(err)
      });

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
		
    //auth/email-already-in-use
    if(error.code === 'auth/email-already-in-use'){
      // Alert
      const alert = await this.alertController.create(
        {
        cssClass: 'my-custom-class',
        header: 'user already exists',
        subHeader: '',
        message: 'Try login instead of create new user',
        buttons: ['OK']
        }
      );
      // Call Alert
      await alert.present();
    }
    }
    

  }

}
