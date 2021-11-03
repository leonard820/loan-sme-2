import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'],
})
export class CalculatorPage implements OnInit {

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

  ngOnInit() {
  }

  totalPayment(){
    this.totalInterest = this.amount * this.terms * this.interest
    this.payment = this.amount + this.totalInterest
  }
}
