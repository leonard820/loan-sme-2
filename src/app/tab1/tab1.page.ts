import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page{

  constructor(
    private router:Router
  ) {}

  DocumentButton(){
    console.log("button is clicked");
    this.router.navigateByUrl('documentation');
  }

  ContactButton(){
    console.log("button is clicked");
    this.router.navigateByUrl('contactus');
  }

}
