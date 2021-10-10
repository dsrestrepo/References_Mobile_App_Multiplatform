import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AngularFirestore} from '@angular/fire/compat/firestore'

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private firestore: AngularFirestore) { }

  // Create something in database:
  async create(collection, id, data)
  {
    try{
      //return await this.firestore.collection(collection).add(data);
      // We use set to create item with custom Id
      // https://stackoverflow.com/questions/48541270/how-to-add-document-with-custom-id-to-firestore
      return await this.firestore.collection(collection).doc(id).set(data)
    }
    catch(error){
      console.log('error in create:', error);
    }
  }

    // Create something in database:
    async create_ref(collection, data)
    {
      try{
        return await this.firestore.collection(collection).add(data);
      }
      catch(error){
        console.log('error in create:', error);
      }
    }
  
  // Get item from database:
  async getAll(collection)
  {
    try{
      return await this.firestore.collection(collection, ref => ref.orderBy('titulopub')).snapshotChanges();
    }
    catch(error){
      console.log('error in getAll:', error);
    }
  }

  // Get item from database:
  async getItem(collection, id)
  {
    try{
      return await this.firestore.collection(collection).doc(id).get();
    }
    catch(error){
      console.log('error in create:', error);
    }
  }

  // Get item from database:
  async delete(collection, id)
  {
    try{
      return await this.firestore.collection(collection).doc(id).delete();
    }
    catch(error){
      console.log('error in delete:', error);
    }
  }

  // Get item from database:
  async updateItem(collection, id, item_data)
  {
    try{
      return await this.firestore.collection(collection).doc(id).set(item_data);
    }
    catch(error){
      console.log('error in getItem:', error);
    }
  }

}
