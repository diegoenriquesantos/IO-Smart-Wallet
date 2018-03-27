import { Component } from '@angular/core';
// Agregado MenuController
import { MenuController, NavController } from 'ionic-angular';

// Agregado los 3 imports siguientes:
//import { AboutPage } from '../about/about';
//import { ContactPage } from '../contact/contact';
//import { HomePage } from '../home/home';

@Component({
  selector: 'page-balance',
  templateUrl: 'balance.html'
})
export class BalancePage {
  
  // Agregado de los 3 tabs
  //tab1Root = HomePage;
  //tab2Root = AboutPage;
  //tab3Root = ContactPage;

  constructor(public navCtrl: NavController,
    public menu: MenuController) {

  }

}
