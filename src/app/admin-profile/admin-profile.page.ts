import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FirestoreService } from '../firestore.service';
import { User } from '../models/user.interface';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.page.html',
  styleUrls: ['./admin-profile.page.scss'],
})
export class AdminProfilePage implements OnInit {

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
        this.userInfo = this.firestoreService.getAdminInfo(this.uID).valueChanges();
        console.log(this.userInfo)
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
