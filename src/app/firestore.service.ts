import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Loan } from "./models/loan.interface";
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

  getAdminInfo(userId: string): AngularFirestoreDocument<User> {
    return this.firestore.collection('admin').doc(userId);
  }

  getLoanList(): AngularFirestoreCollection<Loan> {
    return this.firestore.collection('applications');
  }

  getLoanDetails(loanId: string): AngularFirestoreDocument<Loan> {
    return this.firestore.collection(`applications`).doc(loanId);
  }

  getUserLoanDetails(userId: string): AngularFirestoreCollection<Loan> {
    return this.firestore.collection(`users`).doc(userId).collection(`loan`);
  }

  userDetails() {
    return this.auth.user
  }
}