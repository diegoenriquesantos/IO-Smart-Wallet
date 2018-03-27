import { Component, ViewChild } from '@angular/core';
//import { AuthService } from '../../providers/auth-service/auth-service';
import { Nav, MenuController, NavController, App, LoadingController, ToastController, ModalController } from 'ionic-angular';  // Platform, ViewController,

import { LoginPage } from '../login/login';

// import { App} from 'ionic-angular';  // Se comentó esta línea porque en un momento decía que App estaba duplicada
import { ExchangePage } from '../exchange/exchange';
import { ZrmPage } from '../wallet/zrm/zrm';
// import { TabsPage } from '../tabs/tabs';   Se comenta TabsPage porque no se utiliza
// import { SplashScreen } from '@ionic-native/splash-screen';  Se comenta SplashScreen porque no se utiliza

import { Chart } from 'chart.js';

@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html'
})
export class WalletPage {
  
  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;
  
  @ViewChild(Nav) nav: Nav;
 
 
  barChart: any;
  doughnutChart: any;
  lineChart: any;
   
  loading: any;
  isLoggedIn: boolean = false;
  
  total_suma_zrm: any = 0;
  total_suma_usd: any = 0;

  // tab6Root = ExchangePage;
  
  constructor(public app: App, public navCtrl: NavController, 
       public loadingCtrl: LoadingController, 
       public menu: MenuController,
       /* private modalCtrl: ModalController, */
       private toastCtrl: ToastController) {
    // public authService: AuthService, 
    if(localStorage.getItem("token")) {
      this.isLoggedIn = true;
    }
    
        //var total_suma_zrm = 0;
        //var total_suma_usd = 0;
        
        var zrm = 10000 * 0.3;
        var eth = 10 * 710.638009; 
        var ltc = 20 * 127.755000;
        var xrp = 30000 * 0.707732;
        var zec = 25 * 295.456002;
        var xmr = 15 * 179.531998;
        var btc = 40 * 7137.672134;
        var doge = 120000 * 0.003674;
        var dash = 400 * 468.023007;
        
        var total_suma_zrm_aux = eth + ltc + xrp + zec + xmr + btc + doge + dash;  // eth + ltc + xrp + zec + xmr + 
        total_suma_zrm_aux = (total_suma_zrm_aux / 0.3) + 100;
        
        this.total_suma_zrm = total_suma_zrm_aux.toFixed(2);
        
        var total_suma_usd_aux = zrm+eth+ltc+xrp+zec+xmr+btc+doge+dash;
        this.total_suma_usd = total_suma_usd_aux.toFixed(2);


  }

  

  ionViewDidLoad() {
 
        //var cryptodollars = [];
        
        //this.cryptodollars.push(zrm);
        //this.cryptodollars.push(zrm);
        //this.cryptodollars.push(zrm);
        //this.cryptodollars.push(zrm);
        //this.cryptodollars.push(zrm);
        //this.cryptodollars.push(zrm);
        
        this.barChart = new Chart(this.barCanvas.nativeElement, {
 
            type: 'bar',
            data: {
                labels: ["Zerium", "Ethereum", "Litecoin", "Ripple", "Zcash", "Monero", "Bitcoin", "Dogecoin", "Dash"],
                datasets: [{
                    label: 'Dollars',
                    data: [3000, 7106, 2555, 21232, 7386, 2693, 285507, 440, 187209],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
 
        });
  
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
 
            type: 'doughnut',
            data: {
                labels: ["Zerium", "Ethereum", "Litecoin", "Ripple", "Zcash", "Monero", "Bitcoin", "Dogecoin", "Dash"],
                datasets: [{
                    label: 'Dollars',
                    data: [3000, 7106, 2555, 21232, 7386, 2693, 285507, 440, 187209],

                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 130, 114, 0.2)',
                        'rgba(165, 150, 114, 0.2)',
                        'rgba(255, 206, 86, 0.2)'
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ]
                }]
            }
 
        });
 
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
 
            type: 'line',
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                    {
                        label: "Zerium Wallet",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [500, 1200, 1800, 300, 2200, 7000, 10000],
                        spanGaps: false,
                    }
                ]
            }
 
        });

    
  }

  logout() {
    // this.authService.logout().then((result) => {
      // this.loading.dismiss();
      // let nav = this.app.getRootNav();  NO SE USA DENTRO DE ESTA FUNCION
      //this.nav.setRoot(LoginPage);
      
      this.app.getRootNav().push(LoginPage);
      
    //}, (err) => {
      //this.loading.dismiss();
      // this.presentToast(err);
      // this.navCtrl.setRoot(LoginPage);
    // });
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Authenticating...'
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
    
    // this.nav.push(LoginPage);
    let nav = this.app.getRootNav();
      //this.nav.setRoot(LoginPage);
      
    this.app.getRootNav().push(LoginPage);
      
  }
 
  goToExchange() {
    
    let nav = this.app.getRootNav();
      
    this.app.getRootNav().push(ExchangePage);
    // this.app.getRootNav().push(TabsPage, ({ selectedTab: 2 }));  // ,({ selectedTab: 6 })
    // this.navCtrl.push(TabsPage, ({ selectedTab: 2 }));     // FUNCIONA PERO VA A HOME: TAB 0
    // this.menu.enable(true);
    
    // FUNCIONA PERO SALE SOLO CON TECLA Esc
    // let modal = this.modalCtrl.create(ExchangePage);
    // modal.present();
  }

  goToWalletZrm() {
    
    let nav = this.app.getRootNav();
      
    // this.app.getRootNav().push(ZrmPage);    // ZrmPage
    this.app.getRootNavs()[0].push(ZrmPage);
    
    }


}
