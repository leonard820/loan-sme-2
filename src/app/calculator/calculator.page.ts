import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'],
})
export class CalculatorPage implements OnInit {

  public amount:number;
  public terms = 0;
  public activeLoanAcc = 250;
  public interest = 0.0035;
  public totalInterest = 0;
  public monthlyPayment = 0;
  public totalPayment = 0;

  calculateForm: FormGroup;
  isSubmitted = false;
  
  constructor(
    public formBuilder: FormBuilder,
    public alert: AlertController
  ) { }

  ngOnInit() {
    this.calculateForm = this.formBuilder.group({
      amount: [0,[Validators.required,Validators.min(1000),Validators.max(200000)]],
      terms: [],
      activeLoanAcc: [],
      interest: [],
      totalInterest: [],
      monthlyPayment: [],
      totalPayment: [],
    })
  }

  submit(){
    this.isSubmitted = true;
    if(this.calculateForm.valid){
      this.calculate();
    }else{
      this.showAlert('Error!', 'Please fill in all the required fields!');
    }
  }

  calculate(){
    this.totalInterest = (this.amount + this.activeLoanAcc) * this.interest * this.terms;
    this.totalPayment = this.amount + this.activeLoanAcc + this.totalInterest;
    this.monthlyPayment = this.totalPayment / this.terms;
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
