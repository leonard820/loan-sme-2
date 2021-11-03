import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email = '';
  password = '';
  loginForm: FormGroup;
  isSubmitted = false;

  constructor( 
    public router:Router,
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    private afs: AngularFirestore,
    public formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required]]
    })
  }

  submit() {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      this.login();
    } else {
      this.showAlert('Error!', 'Please fill in all the required fields!');
    }
  }

  async login() {
    const {email, password} = this;
    try {
      console.log(email,password);
        const res = await this.afAuth.signInWithEmailAndPassword(email, password);
        this.router.navigate(['/tabs']);
        this.showAlert('Hi!', 'Welcome back to Loan');
        console.log(res);
    } catch (err) {
        console.dir(err);
        if (err.code === 'auth/user-not-found') {
          this.showAlert('Error', err.message);
        }
    }
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
