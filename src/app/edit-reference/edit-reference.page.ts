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
  aux_pubtype: number;
  aux_anyopu: number;

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
        this.tipopub = params['tipopub'];
        this.eventorevista = params['eventorevista'];
        this.doi = params['doi'];
        this.anyopub = JSON.parse(params['anyopub']);
        this.aux_pubtype = this.tipopub;
        //this.aux_anyopu = params['anyopub'];
        console.log(this.username)
        console.log(this.id)
      });
    }

  ngOnInit() {

  }

}


