import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public amount:any;
  public terms:any;
  public interest:any;
  public totalInterest:any;
  public payment:any;
  public activeLoanAcc:any;

  constructor() {
    this.amount = 10000
    this.interest = 0.0035;
    this.totalInterest = 0;
    this.terms = 0;
    this.payment = 0;
    this.activeLoanAcc = 250;
  }

  totalPayment(){
    this.totalInterest = this.amount * this.terms * this.interest
    this.payment = this.amount + this.totalInterest
  }

}
