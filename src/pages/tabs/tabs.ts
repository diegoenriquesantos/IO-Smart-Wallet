import { Component,/* ViewChild*/ } from '@angular/core';

// Agregado MenuController, NavController
import { MenuController, NavController } from 'ionic-angular';

// import { HomePage } from '../home/home';
import { SearchPage } from '../search/search';
import { AccountPage } from '../account/account';

import { BalancePage } from '../balance/balance';
import { ExchangePage } from '../exchange/exchange';
import { WalletPage } from '../wallet/wallet';
import { TestPage } from '../test/test';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  // @ViewChild('tabsBar') tabRef;
  
  
  tab1Root: any = TestPage;
  //tab1Root: any = HomePage;
  tab2Root: any = SearchPage;
  tab3Root: any = AccountPage;

  tab4Root = WalletPage;
  tab5Root = BalancePage;
  tab6Root = ExchangePage;
  
  color: string = "naranja";
  constructor() {
    // this.tabRef.select(0);
  }
}
