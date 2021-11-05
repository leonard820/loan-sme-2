import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { FirestoreService } from '../firestore.service';
import { Loan } from '../models/loan.interface';

@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.page.html',
  styleUrls: ['./loan-details.page.scss'],
})
export class LoanDetailsPage implements OnInit {

  loanID: string;
  userID: string;
  amount: number;
  ID: any;
  public loanDetails: Observable<Loan>;

  constructor(
    public afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute,
    private firestoreService: FirestoreService,
    public alert: AlertController,
  ) { }

  ngOnInit() {
    this.loanID = this.route.snapshot.paramMap.get('LoanID');
    this.loanDetails = this.firestoreService.getLoanDetails(this.loanID).valueChanges();
    this.loanDetails.subscribe(data => {
      this.userID = data.UserID,
      this.amount = data.LoanAmount
    })
  }

  reject() {
    this.afStore.doc(`users/${this.userID}/loan/${this.loanID}`).update({
      Status: 'Rejected'
    });
    this.afStore.doc(`applications/${this.loanID}`).update({
      Status: 'Rejected'
    });

    this.showAlert('Success!', 'Loan Application Has Been Rejected!');
    this.router.navigate(['tabs2/admin-home/']);
  }

  approve() {
    this.afStore.doc(`users/${this.userID}/loan/${this.loanID}`).update({
      Status: 'Approved'
    });
    this.afStore.doc(`applications/${this.loanID}`).update({
      Status: 'Approved'
    });
    this.afStore.doc(`users/${this.userID}`).update({
      amount: this.amount
    });
    console.log(this.amount)
    this.showAlert('Success!', 'Loan Application Has Been Approved!');
    this.router.navigate(['tabs2/admin-home/']);
  }

  async showAlert (header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

}
