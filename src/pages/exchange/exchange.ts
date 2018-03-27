import { Component } from '@angular/core';
import { App, MenuController, NavController, ModalController, AlertController } from 'ionic-angular';

import { RestService } from '../../providers/rest-service';
import { TraderKeys } from '../models/traderkeys';

import { LoginPage } from '../login/login';
// import { NotavailablePage } from '../notavailable/notavailable';

import * as $ from 'jquery';

@Component({
  selector: 'page-exchange',
  templateUrl: 'exchange.html'
})
export class ExchangePage {
  
 TraderKeys: any = []; 
 ExchangeKeys: any = [];
 ReceiveKeys: any = [];
 TickerSymbolArray: any = [];
 ExchangeKeyArray: any = [];
 TickerSymbolVar: any = '';
 ReceiveKeyVar: any = '';
 msgModal: any = '';
 titleModal: any = '';
 
 // , private modalCtrl: ModalController
 
  constructor(public app: App, public navCtrl: NavController, 
  public menu: MenuController, public alertCtrl: AlertController,
  private restService: RestService) {
      this.listboxLoad();
      this.restService.getListTraderKeys('TraderKeys').subscribe(data => {
        this.TraderKeys = data;
        // console.log(data);
      });
      
      this.restService.getListExchangeKeys('ExchangeKeys').subscribe(data => {
        this.ExchangeKeys = data;
        // console.log(data);
        
        // console.log(data.length);
        
        // var tamanio = data.length;
        
        // i < tamanio
        
        /* for (var i=0; i; i++) {
            this.TickerSymbolArray[i] = data[i].TickerSymbol;
            this.ExchangeKeyArray[i] = data[i].ExchangeKey;
            console.log(this.TickerSymbolArray);
            console.log(this.ExchangeKeyArray);
        } */
 
        // TickerSymbolArray = new Array();     
        var i = 0;
        this.ExchangeKeys.forEach(function (value) {
             // this.TickerSymbolArray.push(value.ExchangeKey);
             // console.log(value.ExchangeKey);
             i = i + 1;
        });
        
        
        i = 0;
        this.ExchangeKeys.forEach(function (value) {
             // this.ExchangeKeyArray[i] = value.TickerSymbol;
             // console.log(value.TickerSymbol);
             i = i + 1;
        });
        
      });
      
  }

  
  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: this.titleModal,
      message: this.msgModal,
      buttons: [
          {
          text: 'OK',
          handler: () => {
            console.log('OK clicked');
          }
        }
      ]
    });
    confirm.present();
  }
  
  // modalNotavailable(this.ErrorMsg) {
      
  //    $('#idErrorMsg').text(this.ErrorMsg);
  //    let modal = this.modalCtrl.create(NotavailablePage, this.ErrorMsg);
  //    modal.present();
  // }
  
  listboxLoad(){
     
  
  //this.TraderKeys = [
  //  'Coinbase',
  //  'Binance',
  //  'Bitstamp',
  //  'Bitfinex',
  //]
  
  //this.ExchangeKeys = [
  //  'Zerium',
  //  'Ethereum',
  //  'Ripple',
  //  'Bitcoin',
  //]

  this.ReceiveKeys = [
    'Zerium',
    'Ethereum',
    'Ripple',
    'Bitcoin',
  ]
  }

  logout() {

 
    this.app.getRootNav().push(LoginPage);
      
  }
  
  goToLogin() {

    
    this.app.getRootNav().push(LoginPage);
      
  }
 
  UpdateList(TraderKeyParm:string, idParm:number) {

    this.restService.getListTraderKeys('TraderKeys').subscribe(data => {
        this.TraderKeys = data;
    });
    // console.log('TraderKeyParm ' + TraderKeyParm);    
    this.TraderKeys.TraderKey = TraderKeyParm;
    // console.log('this.TraderKeys.TraderKey ' + this.TraderKeys.TraderKey); 
    // console.log('id' + idParm);
    this.TraderKeys.id = idParm;
    // console.log(this.TraderKeys.id);
    $('#idExchangeOverSelect').text(TraderKeyParm);
     
  }
  
  // VER ESTA FUNCION QUE AL PASARLE DOS PARAMETROS SE ROMPIO    // , TraderKeyParm:string
  onSelectChange(selectedValue: any) {
    // console.log('Selected', selectedValue);
     
     // $('#idExchangeOver').text('prueba');
     $('#idExchangeOverSelect').text(selectedValue);
     //$('#idExchangeOverOption').text(selectedValue);
  }
  
  onSelectChangeExchangeKeys(selectedValue: any) {
     // console.log('Selected_ExchangeKeys', selectedValue);
     
     // console.log(this.TickerSymbolArray);
     
     // console.log(this.ExchangeKeyArray);
     
     // var matchedIndex = this.ExchangeKeyArray.map(function (obj) { return obj; }).indexOf(selectedValue);

     
     var matchedIndex = this.ExchangeKeys.map(function(d) { return d['ExchangeKey']; }).indexOf(selectedValue)
     
     // console.log(matchedIndex);
     
     // console.log(this.ExchangeKeys[matchedIndex].TickerSymbol);
     
     this.TickerSymbolVar = this.ExchangeKeys[matchedIndex].TickerSymbol;
     
     // console.log(this.TickerSymbolArray[matchedIndex]);
     
     // this.TickerSymbolVar = this.TickerSymbolArray[matchedIndex];
     
    // $('#idExchangeKeySelectTicker').text(this.TickerSymbolArray[matchedIndex]);
    
    $('#idExchangeKeySelectTicker').text(this.ExchangeKeys[matchedIndex].TickerSymbol);
    
    
     
  }
  
  onSelectChangeReceiveKeys(selectedValue: any) {
    this.ReceiveKeyVar = selectedValue;
    this.calculateReceiveMoney();
    
  }
  
  calculateReceiveMoney() {

     if (this.ReceiveKeyVar == 'Ethereum') {
        
       if (this.TickerSymbolVar == 'ETH') {
           this.titleModal = 'No está permitido';
           this.msgModal = 'No se puede realizar una operación de cambio desde y hacia la misma moneda';
           // this.modalNotavailable(this.ErrorMsg);   
           this.showConfirm();
       } else {
       
         if (this.TickerSymbolVar == 'ZRM') {
            var factor = 0.3 / 859.42
            
         }
          
         if (this.TickerSymbolVar == 'BTC') {
            var factor = 8757 / 859.42
            
         }
         
         if (this.TickerSymbolVar == 'XRP') {
            var factor = 1.01668 / 859.42
             
         }
         
         var receivemoney = ($( "input[type=number]" ).val()) * factor
         $('#idReceiveKeyMoney').text(receivemoney.toFixed(5) + ' ETH'); 
            
         // $('#idReceiveKeyMoney').text('20000,00 ETH');
         // console.log('ETH' + this.ReceiveKeyVar);
       
         // if ($( "input[type=number]" ).val() == 48) {
        //    console.log($( "input[type=number]" ).val());
         // }
       
         
       }  // cierra  if (this.TickerSymbolVar == 'ETH') 
     }  // cierra if (this.ReceiveKeyVar == 'Ethereum')
    
     if (this.ReceiveKeyVar == 'Zerium') {
        
       if (this.TickerSymbolVar == 'ZRM') {
           this.titleModal = 'No está permitido';
           this.msgModal = 'No se puede realizar una operación de cambio desde y hacia la misma moneda';
           // this.modalNotavailable(this.ErrorMsg);   
           this.showConfirm();
       } else {
       
         if (this.TickerSymbolVar == 'ETH') {
            var factor = 859.42 / 0.3
            
         }
          
         if (this.TickerSymbolVar == 'BTC') {
            var factor = 8757 / 0.3
            
         }
         
         if (this.TickerSymbolVar == 'XRP') {
            var factor = 1.01668 / 0.3
             
         }
         
         var receivemoney = ($( "input[type=number]" ).val()) * factor
         $('#idReceiveKeyMoney').text(receivemoney.toFixed(5) + ' ZRM'); 
         
       }  // cierra  if (this.TickerSymbolVar  
     }  // cierra if (this.ReceiveKeyVar  
    

     if (this.ReceiveKeyVar == 'Bitcoin') {
        
       if (this.TickerSymbolVar == 'BTC') {
           this.titleModal = 'No está permitido';
           this.msgModal = 'No se puede realizar una operación de cambio desde y hacia la misma moneda';
           // this.modalNotavailable(this.ErrorMsg);   
           this.showConfirm();
       } else {
       
         if (this.TickerSymbolVar == 'ETH') {
            var factor = 859.42 / 8757
            
         }
          
         if (this.TickerSymbolVar == 'ZRM') {
            var factor = 0.3 / 8757
            
         }
         
         if (this.TickerSymbolVar == 'XRP') {
            var factor = 1.01668 / 8757
             
         }
         
         var receivemoney = ($( "input[type=number]" ).val()) * factor
         $('#idReceiveKeyMoney').text(receivemoney.toFixed(5) + ' BTC'); 
         
       }  // cierra  if (this.TickerSymbolVar  
     }  // cierra if (this.ReceiveKeyVar  

     if (this.ReceiveKeyVar == 'Ripple') {
        
       if (this.TickerSymbolVar == 'XRP') {
           this.titleModal = 'No está permitido';
           this.msgModal = 'No se puede realizar una operación de cambio desde y hacia la misma moneda';
           // this.modalNotavailable(this.ErrorMsg);   
           this.showConfirm();
       } else {
       
         if (this.TickerSymbolVar == 'ETH') {
            var factor = 859.42 / 1.01668
            
         }
          
         if (this.TickerSymbolVar == 'ZRM') {
            var factor = 0.3 / 1.01668
            
         }
         
         if (this.TickerSymbolVar == 'BTC') {
            var factor = 8757 / 1.01668
             
         }
         
         var receivemoney = ($( "input[type=number]" ).val()) * factor
         $('#idReceiveKeyMoney').text(receivemoney.toFixed(5) + ' XRP'); 
         
       }  // cierra  if (this.TickerSymbolVar  
     }  // cierra if (this.ReceiveKeyVar  
      
      
  }
  
  goToExchange() {
    
     this.titleModal = '';
     console.log(this.ReceiveKeyVar);
     console.log(this.TickerSymbolVar);
     this.calculateReceiveMoney();
     
     if (this.titleModal == 'No está permitido') {
        console.log('1' + this.titleModal); 
     }
     else {
          console.log('2' + this.titleModal); 
          this.titleModal = 'Congratulations !!!';
          this.msgModal = 'Transaction Successful';
          this.showConfirm();
     }
     

  }  // cierra goToExchange() 
  
}
