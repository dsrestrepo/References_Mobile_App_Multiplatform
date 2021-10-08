import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {Router} from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public afAuth: AngularFireAuth, public router: Router) {}

  SignOut() {
    //https://www.positronx.io/ionic-firebase-authentication-tutorial-with-examples/
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['login']);
    })
  }

}
