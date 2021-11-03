import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { User } from "./models/user.interface";

@Injectable({
  providedIn: "root",
})
export class FirestoreService {
  constructor(
    public firestore: AngularFirestore,
    public auth: AngularFireAuth
  ) {}
  loginWithEmail(data) {
    return this.auth.signInWithEmailAndPassword(data.email, data.password);
  }

  signup(data) {
    return this.auth.createUserWithEmailAndPassword(data.email, data.password);
  }

  saveDetails(data) {
    return this.firestore.collection("users").doc(data.uid).set(data);
  }
  getDetails(data) {
    return this.firestore.collection("users").doc(data.uid).valueChanges();
  }

  getUserInfo(userId: string): AngularFirestoreDocument<User> {
    return this.firestore.collection('users').doc(userId);
  }

  userDetails() {
    return this.auth.user
  }
}