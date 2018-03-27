// Agregado ViewChild
import { Component, ViewChild } from '@angular/core';
// Agregado Nav
import { Nav, Platform, MenuController } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { LoginPage } from '../pages/login/login';
// import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

// import { WalletPage } from '../pages/wallet/wallet';
import { ExchangePage } from '../pages/exchange/exchange';
// import { BalancePage } from '../pages/balance/balance';
// import { WelcomePage } from '../pages/welcome/welcome';
// import { ZrmPage } from '../pages/wallet/zrm/zrm';
// import { TestPage } from '../pages/test/test';
// import { SearchPage } from '../pages/search/search';
// import { SendcryptoPage } from '../pages/sendcrypto/sendcrypto';
// import { ReceivecryptoPage } from '../pages/receivecrypto/receivecrypto';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // Agregado
  @ViewChild(Nav) nav: Nav;
  
  // rootPage:any = TabsPage;
  // Cambiar rootPage
  // rootPage:any = LoginPage;
  rootPage:any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public menu: MenuController,
  public statusBar: StatusBar, public splashScreen: SplashScreen) {
     this.initializeApp();

    // used for an example of ngFor and navigation
    // { title: 'Home', component: HomePage }
    
    this.pages = [
      
      { title: 'Wallet', component: TabsPage },
      { title: 'Network Status', component: TabsPage },
      { title: 'Contacts', component: TabsPage },
      { title: 'Exchange', component: ExchangePage },
      { title: 'News', component: TabsPage },
      { title: 'ZAE', component: TabsPage },
      // { title: 'Demo', component: WelcomePage },
      { title: 'Settings', component: TabsPage },
      // { title: 'Search', component: SearchPage },
      { title: 'Exit', component: LoginPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
     
    this.nav.setRoot(page.component);
    console.log(page.component);
  }
  
  goToLogin() {
    //this.getRootNav().push(LoginPage);
    this.nav.setRoot(LoginPage);
  }
  
  checkMenu() {
    this.menu.enable(true);
    this.menu.toggle();
    
  }
  //constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
  //  platform.ready().then(() => {
  //    // Okay, so the platform is ready and our plugins are available.
  //    // Here you can do any higher level native things you might need.
  //    statusBar.styleDefault();
  //    splashScreen.hide();
  //  });
  //}
  
}
