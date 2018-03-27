import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicStorageModule } from '@ionic/storage';
// import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PostPage } from '../pages/post/post';
import { SearchPage } from '../pages/search/search';
import { AccountPage } from '../pages/account/account';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { ListingPage } from '../pages/listing/listing';
import { Shared } from '../providers/shared';
import { RestService } from '../providers/rest-service';
import { CalculatePage } from '../pages/calculate/calculate';
import { ReviewPage } from '../pages/review/review';
import { SuggestionPage } from '../pages/suggestion/suggestion';
import { ActionPage } from '../pages/action/action';
import { WelcomePage } from '../pages/welcome/welcome';

import { NotavailablePage } from '../pages/notavailable/notavailable';
import { BalancePage } from '../pages/balance/balance';
import { ExchangePage } from '../pages/exchange/exchange';
import { WalletPage } from '../pages/wallet/wallet';
import { ZrmPage } from '../pages/wallet/zrm/zrm';
import { TestPage } from '../pages/test/test';
import { SendcryptoPage } from '../pages/wallet/sendcrypto/sendcrypto';
import { ReceivecryptoPage } from '../pages/wallet/receivecrypto/receivecrypto';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PostPage,
    SearchPage,
    AccountPage,
    TabsPage,
    LoginPage,
    CalculatePage,
    ReviewPage,
    SuggestionPage,
    ActionPage,
    ListingPage,
    NotavailablePage,
    WalletPage,
    BalancePage,
    ExchangePage,
    ZrmPage,
    TestPage,
    SendcryptoPage,
    ReceivecryptoPage,
    WelcomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      tabsPlacement: 'top',
        platforms: {
          android: {
               tabsPlacement: 'bottom'
                  },
          ios: {
               tabsPlacement: 'bottom'
                },
          windows:
            {
      tabsPlacement: 'top'
            }
      }
}),
IonicStorageModule.forRoot()
],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PostPage,
    SearchPage,
    HomePage,
    AccountPage,
    TabsPage,
    LoginPage,
    //CalculatePage,
    //ReviewPage,
    SuggestionPage,
    ActionPage,
    ListingPage,
    NotavailablePage,
    WalletPage,
    BalancePage,
    ExchangePage,
    ZrmPage,
    TestPage,
    SendcryptoPage,
    ReceivecryptoPage,
    WelcomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}, 
    Shared, 
    RestService
  ]
})
export class AppModule {}
