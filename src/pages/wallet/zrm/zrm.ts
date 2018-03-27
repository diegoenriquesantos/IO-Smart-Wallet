import { Component, ViewChild } from '@angular/core';
//import { AuthService } from '../../providers/auth-service/auth-service';
import { Nav, MenuController, NavController, App, LoadingController, ToastController, ModalController } from 'ionic-angular';  // ViewController, Platform, 

//import { LoginPage } from '../login/login';

// import { App} from 'ionic-angular';  // Se comentó esta línea porque en un momento decía que App estaba duplicada
import { ExchangePage } from '../exchange/exchange';
// import { TabsPage } from '../tabs/tabs';
import { SendcryptoPage } from '../sendcrypto/sendcrypto';
import { ReceivecryptoPage } from '../receivecrypto/receivecrypto';
// import { SplashScreen } from '@ionic-native/splash-screen';

// import { Chart } from 'chart.js';

@Component({
  selector: 'page-zrm',
  templateUrl: 'zrm.html'
})
export class ZrmPage {
  
  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;
  
  @ViewChild(Nav) nav: Nav;
 
 
  barChart: any;
  doughnutChart: any;
  lineChart: any;
   
  loading: any;
  isLoggedIn: boolean = false;

  // tab6Root = ExchangePage;
  
  constructor(public app: App, public navCtrl: NavController, 
       public loadingCtrl: LoadingController, 
       public menu: MenuController,
       private modalCtrl: ModalController, 
       private toastCtrl: ToastController) {
    // public authService: AuthService, 
    if(localStorage.getItem("token")) {
      this.isLoggedIn = true;
    }
    
        
  }

  

  ionViewDidLoad() {
 
  }

  logout() {
          // let nav = this.app.getRootNav();
      
      // this.app.getRootNav().push(LoginPage);
    
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Loading ...'
    });

    this.loading.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  goToLogin() {
    
     
    // let nav = this.app.getRootNav();
     
    // this.app.getRootNav().push(LoginPage);
      
  }
 
  checkMenu() {
    this.menu.enable(true);
    this.menu.toggle();
    
  } 
  
  presentSendCryptoModal() {
   let sendcryptoModal = this.modalCtrl.create(SendcryptoPage, { userId: 8675309 });
   sendcryptoModal.onDidDismiss(data => {
     console.log(data);
   });
   sendcryptoModal.present();
 }

  presentReceiveCryptoModal() {
   let receivecryptoModal = this.modalCtrl.create(ReceivecryptoPage, { userId: 8675309 });
   receivecryptoModal.onDidDismiss(data => {
     console.log(data);
   });
   receivecryptoModal.present();
 }
  
  
  
}
