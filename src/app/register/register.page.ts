import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public email: any;
  public password: any;
  public confirmPassword: any;
  public name: any;
  registerForm: FormGroup;
  isSubmitted = false;


  constructor(
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public router: Router,
    public afStore: AngularFirestore,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      name: ['', [Validators.required]]
    },
      {
        validator: this.matchPassword('password', 'confirmPassword'),
      }
    );
  }

  submit() {
    this.isSubmitted = true;
    if (this.registerForm.valid) {
      this.register();
    } else {
      this.showAlert('Error!', 'Please fill in all the required fields!');
    }
  }

  async register() {
    const { email, name, password, confirmPassword } = this;
    try {
      const res = await this.afAuth.createUserWithEmailAndPassword(email, confirmPassword);
      this.afStore.doc(`users/${res.user.uid}`).set({
        email,
        name
      });

      console.log(res);
      this.showAlert('Account Created!', 'Welcome to Loan!');
      this.router.navigate(['/tabs']);
    } catch (error) {
      console.dir(error);
      this.showAlert('Error', error.message);
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  matchPassword(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }
}