import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { FirestoreService } from '../firestore.service';
import { User } from '../models/user.interface';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.page.html',
  styleUrls: ['./admin-home.page.scss'],
})
export class AdminHomePage implements OnInit {

  public loanList;
  public userInfo: Observable<User>;

  uID: string;
  currentUser: any;

  constructor(
    private firestoreService: FirestoreService,
    private afAuth: AngularFireAuth,
    private router: Router,
    public alert: AlertController
  ) { }

  ngOnInit() {
    this.loanList = this.firestoreService.getLoanList().valueChanges();
  }

  viewDetails(loanID) {
    console.log(loanID);
    this.router.navigate(['/loan-details/' + loanID]);
}

}
