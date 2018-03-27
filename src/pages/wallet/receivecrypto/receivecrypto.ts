import { Component, ViewChild } from '@angular/core'; //Viewchild for collapse view model
import { SplashScreen } from '@ionic-native/splash-screen';
import { Content } from 'ionic-angular'; //content for collapse view model
import { NavController, ActionSheetController, ViewController, AlertController, NavParams, LoadingController, ModalController, PopoverController } from 'ionic-angular'; //viewcontroller for collapse view model
import { FormGroup, FormControl } from '@angular/forms';  // , FormBuilder, Validators
// import { CalculatePage } from '../calculate/calculate';
// import { Idea } from '../../models/idea';
// import { RestService } from '../../providers/rest-service';
// import { ActionPage } from '../action/action';

@Component({
  selector: 'page-receivecrypto',
  templateUrl: 'receivecrypto.html'
})
export class ReceivecryptoPage {
  @ViewChild(Content) content: Content;
  @ViewChild('dateTime') dateTime;
  
  receiveForm = new FormGroup({
 		
 		email: new FormControl()
 		
 	});
  
  emailRegx: any;
  
  CalculateVisibility: boolean;

  gridfsUrl: string;
  varSendTotalAmount: any = 0;
  myDate: String = new Date().toISOString();
  currDate:any=new Date().toISOString().slice(0,10);
  varAddressReceive: string = '';
  msgModal: any = '';
  titleModal: any = '';
  email: string = '';
  errorFlag: string = 'si';
  receiveQuantity: string = '';
  varReceiveSelectUSD: any = 0;
  varNote: string = '';
  
  // i: Idea;
  // suggestion: string;
  // suggestions: Suggestion[];

  constructor(
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public popoverCtrl: PopoverController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private navParams: NavParams) {
    // public shared: Shared,
    // public restService: RestService) {
      // this.gridfsUrl = this.restService.gridfsUrl;

    let loading = this.loadingCtrl.create({
      content: "Loading Receive Crypto ..."
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
    console.log('Hello ReceivecryptoPage Page');
    
    // console.log(this.currDate);
    
    var year = this.currDate.slice(0,4)
    var month = this.currDate.slice(5,7)
    var day = this.currDate.slice(8,10)
    
    this.currDate = month + "/" + day + "/" + year;
    
    // console.log(this.currDate);
    
     
    
    // this.emailRegx = this.validator.emailRegx;    validator no está funcionando
    
    // this.receiveForm = this.formBuilder.group({
 				
 		//		 	email: ['', Validators.compose([Validators.required, this.validator.emailValidator.bind(this)])]
 				 	
 		//		}, {'validator': this.validator.isMatching});  
  
    
  }
    
  

  dismiss() {
    this.viewCtrl.dismiss();
  }
  
  onChangeReceiveQuantity(selectedValue: any) {
  
     // console.log(selectedValue.value);
     this.receiveQuantity = selectedValue.value;
     
     var auxReceiveSelectUSD = Number(selectedValue.value) * Number(0.3);
     
     // console.log(auxReceiveSelectUSD);
     
     this.varReceiveSelectUSD = auxReceiveSelectUSD.toFixed(2);
     
     // console.log(this.varReceiveSelectUSD);
     
  }
  
  goToReceiveFunds() {
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
       
       if (this.email == '') {    
           this.titleModal = 'Error';
           this.msgModal = 'The email field must be completed';
           this.errorFlag = 'si'
           this.showError();
       }   
       else {
         this.errorFlag = 'no'
         if (this.varAddressReceive == '') {    
           this.titleModal = 'Error';
           this.msgModal = 'The address account field must be completed';
           this.errorFlag = 'si'
           this.showError();
         }   
         else {
            this.errorFlag = 'no'
            if (this.receiveQuantity == '') {    
               this.titleModal = 'Error';
               this.msgModal = 'The amount to receive field must be completed';
               this.errorFlag = 'si'
               this.showError();
            }   
            else {
               this.errorFlag = 'no'
               if (this.varReceiveSelectUSD <= 0) {    
                 this.titleModal = 'Error';
                 this.msgModal = 'The amount to receive field must be greater than 0';
                 this.errorFlag = 'si'
                 this.showError();
               }   
               else {
                 this.errorFlag = 'no'
               }
         
             }
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
      title: 'Do you want to receive this funds ?',
      message: 'Please remember this operation is not automatic. The recipient should send the funds',
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
  
  onSelectAddressReceive(selectedValue: any) {
      
      // console.log(selectedValue.value);
      // Address donde recibirá los fondos
      
      this.varAddressReceive = selectedValue; 
  }
  
  onChangeNote(selectedValue: any) {
     this.varNote = selectedValue.value; 
     // console.log(this.varNote);
  }

}
