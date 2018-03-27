import { Component, ViewChild } from '@angular/core'; //Viewchild for collapse view model
import { SplashScreen } from '@ionic-native/splash-screen';
import { Content } from 'ionic-angular'; //content for collapse view model
import { NavController, ActionSheetController, ViewController, AlertController, NavParams, LoadingController, ModalController } from 'ionic-angular'; //viewcontroller for collapse view model
import { CalculatePage } from '../calculate/calculate';
import { Idea } from '../../models/idea';
import { RestService } from '../../providers/rest-service';
import { ActionPage } from '../action/action';

@Component({
  selector: 'page-sendcrypto',
  templateUrl: 'sendcrypto.html'
})
export class SendcryptoPage {
  @ViewChild(Content) content: Content;
  CalculateVisibility: boolean;

  gridfsUrl: string;
  varSendTotalAmount: any = 0;
  myDate: String = new Date().toISOString();
  msgModal: any = '';
  titleModal: any = '';
  errorFlag: string = 'si';
  varSendquantitymoney: any = 0;
  auxSendAmount: string = ''; 
  auxSendAddress: string = '';  
  
  // i: Idea;
  // suggestion: string;
  // suggestions: Suggestion[];

  constructor(
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private navParams: NavParams) {
    // public shared: Shared,
    // public restService: RestService) {
      // this.gridfsUrl = this.restService.gridfsUrl;

    let loading = this.loadingCtrl.create({
      content: "Loading Send Crypto ..."
    });
    loading.present();

    //this.suggestion = "";
    //this.i = navParams.get('idea');
    //if(this.i.status=="Closed"){
    //  this.CalculateVisibility = true;
    //}
    //else{
    //  this.CalculateVisibility = false;
    //}

    //FOR TESTING
    //this.CalculateVisibility = true;

    //this.restService.getSuggestion(this.i.id).subscribe(data => {
    //  this.suggestions = data;
    loading.dismiss();
    //}, (err) => {
    //  loading.dismiss();
    //  console.log('Error');
    //});
    
  }

  ionViewDidLoad() {
    console.log('Hello SendcryptoPage Page');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  
  onChangeSendAddress(selectedValue: any) {
    
     this.auxSendAddress = selectedValue.value;
  }
  
  onChangeSendQuantity(selectedValue: any) {
  
     // console.log(selectedValue.value);
     
     this.auxSendAmount = selectedValue.value;
     
     var auxSendTotalAmount = Number(selectedValue.value) + Number(0.0001);
     
     // console.log(auxSendTotalAmount);
     
     this.varSendTotalAmount = auxSendTotalAmount.toFixed(5);
     
     // console.log(this.varSendTotalAmount);
   
       
     
     
  }
  
  goToSendFunds() {
        this.errorFlag == 'si'
        // console.log(this.errorFlag);
        this.validateFields();
        if (this.errorFlag == 'no') {
           // console.log(this.errorFlag);
           this.showConfirm();
        }
  }


    validateFields() {
       
       // console.log(this.email);
       
       if (this.auxSendAddress == '') {    
           this.titleModal = 'Error';
           this.msgModal = 'The address account field must be completed';
           this.errorFlag = 'si'
           this.showError();
       }   
       else {
         this.errorFlag = 'no'
       }
       
       
       if (this.auxSendAmount == '') {    
           this.titleModal = 'Error';
           this.msgModal = 'The amount to send field must be completed';
           this.errorFlag = 'si'
           this.showError();
       }   
       else {
          
         this.errorFlag = 'no'
         if (Number(this.auxSendAmount) <= 0) {    
           this.titleModal = 'Error';
           this.msgModal = 'The amount to send field must be greater than 0';
           this.errorFlag = 'si'
           this.showError();
         }   
         else {
           this.errorFlag = 'no'
         }
         
       }
      
       
  }
  
  
  showError() {
    let error = this.alertCtrl.create({
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
    error.present();
  }

  
  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Do you want to send this funds ?',
      message: 'Please remember this operation is not reversable !',
      buttons: [
          {
          text: 'OK',
          handler: () => {
            console.log('OK clicked');
          }
        },
          {
         text: 'Cancel',
         handler: () => {
           console.log('Cancel clicked');
           // dismiss();
           this.viewCtrl.dismiss();
          }
        }
      ]
    });
    confirm.present();
  }
  
  
  
}
