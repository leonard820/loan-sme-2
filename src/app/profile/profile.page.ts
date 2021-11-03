import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FirestoreService } from '../firestore.service';
import { User } from '../models/user.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public userInfo: Observable<User>;
  currentUser: any;
  uID: string;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private firestoreService: FirestoreService
  ) { }

  ngOnInit() {
    this.afAuth.user.subscribe(response => {
      if (response !== null) {
        this.currentUser = response;
        this.uID = this.currentUser.uid
        this.userInfo = this.firestoreService.getUserInfo(this.uID).valueChanges();
      }
    }, error => {
      console.log(error);
    })
  }

  signOut(){
    this.afAuth.signOut().then(() => {
      this.router.navigate(['login']);
  });
  }
}
