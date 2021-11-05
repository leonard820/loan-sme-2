import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { FirestoreService } from '../firestore.service';
import { Loan } from '../models/loan.interface';
import { User } from '../models/user.interface';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.page.html',
  styleUrls: ['./loan.page.scss'],
})
export class LoanPage implements OnInit {

  public userInfo: Observable<User>;
  public loanDetails;
  uID: string;
  currentUser: any;

  constructor(
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public router:Router,
    public afStore: AngularFirestore,
    public formBuilder: FormBuilder,
    private firestoreService: FirestoreService,
  ) { }

  ngOnInit() {
    this.afAuth.user.subscribe(response => {
      if (response !== null) {
        this.currentUser = response;
        this.uID = this.currentUser.uid;
        this.loanDetails = this.firestoreService.getUserLoanDetails(this.uID).valueChanges();
        console.log(this.loanDetails)
      }
    }, error => {
      console.log(error);
    })
  }

}
