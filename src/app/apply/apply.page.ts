import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { FirestoreService } from '../firestore.service';
import { User } from '../models/user.interface';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.page.html',
  styleUrls: ['./apply.page.scss'],
  providers: [DatePipe]
})
export class ApplyPage implements OnInit {

  public email:any;
  public name:any;
  public loan:any;
  public phone:any;
  public ic:any;
  public gender:any;
  public address:any;
  public job:any;
  public company:any;
  public salary:any;
  public userInfo: Observable<User>;
  uID: string;
  currentUser: any;
  currentDateTime: any;
  
  applyForm: FormGroup;
  isSubmitted = false;

  constructor(
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public router:Router,
    public afStore: AngularFirestore,
    public formBuilder: FormBuilder,
    private firestoreService: FirestoreService,
    public datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.afAuth.user.subscribe(response => {
      if (response !== null) {
        this.currentUser = response;
        this.uID = this.currentUser.uid;
        //this.email = this.currentUser.email;
        this.userInfo = this.firestoreService.getUserInfo(this.uID).valueChanges();
      }
    }, error => {
      console.log(error);
    })
   
    this.applyForm = this.formBuilder.group({
      email: [''],
      name: [''],
      loan: ['',[Validators.required,Validators.min(1000),Validators.max(200000)]],
      phone: ['',[Validators.required,Validators.pattern('[0-9]{3}-[0-9]{7,8}')]],
      ic: ['',[Validators.required,Validators.pattern('[0-9]{6}-[0-9]{2}-[0-9]{4}')]],
      gender: ['',[Validators.required]],
      address: ['',[Validators.required]],
      job: ['',[Validators.required]],
      company: ['',[Validators.required]],
      salary: ['',[Validators.required]]
    })
  }

  submit(){
    this.isSubmitted = true;
    console.log(this.applyForm.value);
    if(this.applyForm.valid){
      this.apply();
    }else{
      this.showAlert('Error!', 'Please fill in all the required fields!');
    }
  }

  apply() {
    const { email, name, loan, phone, ic, gender, address, job, company, salary } = this;
    this.currentDateTime = this.datePipe.transform(new Date(), 'yyyyMMddHHmmss');
    // Create new order in Order collection
    this.afStore.doc(`applications/${this.currentDateTime}`).set({
      UserID: this.uID,
      LoanID: this.currentDateTime,
      Email: email,
      Name: name,
      LoanAmount: loan,
      Phone: phone,
      IC: ic,
      Gender: gender,
      Address: address,
      Job: job,
      Company: company,
      Salary: salary
    });
    this.showAlert('Success!', 'Your Loan Application Has Been Submitted!');
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
