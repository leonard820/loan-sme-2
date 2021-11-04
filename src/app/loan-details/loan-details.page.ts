import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FirestoreService } from '../firestore.service';
import { Loan } from '../models/loan.interface';

@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.page.html',
  styleUrls: ['./loan-details.page.scss'],
})
export class LoanDetailsPage implements OnInit {

  public loanDetails: Observable<Loan>;

  constructor(
    public afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute,
    private firestoreService: FirestoreService
  ) { }

  ngOnInit() {
    const loanID: string = this.route.snapshot.paramMap.get('LoanID');
    this.loanDetails = this.firestoreService.getLoanDetails(loanID).valueChanges();
  }

}
