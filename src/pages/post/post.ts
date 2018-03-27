import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NavController, ViewController, LoadingController, AlertController, NavParams } from 'ionic-angular';
import { Shared } from '../../providers/shared';
import { RestService } from '../../providers/rest-service';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

// import { MyApp } from './app.component';
// import { App } from ‘ionic-angular’;
// import { IonicApp } from ‘ionic-angular’;
 

@Component({
  selector: 'page-post',
  templateUrl: 'post.html'
})
export class PostPage {
  @ViewChild("fileInput") fileInput;
  ideaOwner:string;
  ideaOwnerFullname: string;
  ideaOwnerAvatar: string;
  description: string;
  mediaId: string;
  mediaType: string;
  area: string;
  status: string;
  likes: string[];
  likesString: string;
  suggestionsNo: number;
  latestSuggestionOwner: string;
  latestSuggestionOwnerFullname: string;
  latestSuggestion: string;
  areas: any = [];
  fi: any;
  filename: string;
  fileExist: boolean;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public shared: Shared,
    public restService: RestService,
    public navParams: NavParams) {
    this.ideaOwner = shared.username;
    this.ideaOwnerFullname = shared.fullname;
    this.ideaOwnerAvatar = shared.avatarId;
    this.description = "";
    this.mediaId = "";
    this.mediaType = "";
    this.area = "";
    this.status = "Open";
    this.likes = [];
    this.likesString = "";
    this.suggestionsNo = 1;
    this.latestSuggestionOwner = shared.username;
    this.latestSuggestionOwnerFullname = shared.fullname;
    this.latestSuggestion = "";
    this.areas = this.shared.AreaSet;
    this.filename = "";
    this.fileExist = false;
  }

  ionViewDidLoad() {
    console.log('Hello PostPage Page');
  }

  addFile(): void {
    this.fi = this.fileInput.nativeElement;
    this.filename = this.fi.files[0].name;
    this.mediaType = this.filename.substr(this.filename.lastIndexOf(".")).toLowerCase();
    this.fileExist= (this.fi.files && this.fi.files[0]);
  }

  updateIdeaNo(){
    this.shared.ideaNo++;
    this.restService.updateUser(this.shared.userId, this.shared.fullname, this.shared.avatarId, this.shared.ideaNo, this.shared.actionNo)
    .subscribe(res => {
      console.log(this.shared.ideaNo);
    }, (err) => {
      console.log(err);
      // ARTILUGIO PARA QUE NO SE DESHABILITE EL MENU DE IONIC
      // this.loading.dismiss();
      //this.navCtrl.insert(0,TabsPage);
      //this.navCtrl.popToRoot();
       
    });
  }

  postSuggestion(ideaId: string){
    this.restService.postSuggestion(ideaId, this.shared.username, this.shared.fullname, this.latestSuggestion, "20180131")
    .subscribe(data => {

    }, (err) => {
      let alert = this.alertCtrl.create({
        title: 'Sending suggestion failed',
        message: err,
        buttons: ['Try again']
      });
      alert.present();
    });
  }

  post() {
    // this.area = "100";
    // &&(this.area.trim().length>0)
    if((this.description.trim().length>0)
    &&(this.latestSuggestion.trim().length>0)
    ){
      let loading = this.loadingCtrl.create({
        content: "Your idea is going live :)"
      });
      loading.present();

      if (this.fileExist) {
        let fileToUpload = this.fi.files[0];
        this.restService
          .uploadFile(fileToUpload)
          .subscribe(res => {
            this.mediaId=res.json();
            this.ideaOwnerAvatar="https://thebitcoinpub-91d3.kxcdn.com/uploads/default/original/2X/1/1039a4208686b9d06d6d58f89a6aef05a8b7d513.jpg"; 
            this.restService.postIdea(
              this.ideaOwner, this.ideaOwnerFullname, this.ideaOwnerAvatar,
              this.description, res.json(), this.mediaType,
              this.area, this.status, this.likes, this.likesString, this.suggestionsNo,
              this.latestSuggestionOwner, this.latestSuggestionOwnerFullname, this.latestSuggestion)
              .subscribe(data => {
                console.log(data);
                this.postSuggestion(data.id);
                // this.updateIdeaNo();   POR EL MOMENTO NO ACTUALIZAR
                this.shared.toast('Idea uploaded');
                // loading.dismiss();
                
                // this.navCtrl.setRoot(TabsPage);
                
                // this.IonicApp.getActiveNav().setRoot(LoginPage);
               
                //////////////////// this.navCtrl.push(TabsPage);
                
                /// this.viewCtrl.dismiss();            // DESHABILITA EL MENU 
                /// this.navCtrl.setRoot(LoginPage);    // ENVIA A PAGINA DE LOGIN
                
                
                // ARTILUGIO PARA QUE NO SE DESHABILITE EL MENU DE IONIC
                // loading.dismiss();
                this.navCtrl.popToRoot();
                this.navCtrl.insert(0,TabsPage);
                
                
                
                /// this.navCtrl.setRoot(TabsPage).then(() =>{
                ///      this.navCtrl.popToRoot();
                ///      //....
                /// }); 
                 
              }, (err) => {
                loading.dismiss();
                let alert = this.alertCtrl.create({
                  title: 'Sending idea failed',
                  message: err,
                  buttons: ['Try again']
                });
                alert.present();
              });
          }, (err) => {
            loading.dismiss();
            let alert = this.alertCtrl.create({
              title: 'Sending idea failed',
              message: err,
              buttons: ['Try again']
            });
            alert.present();
          });
      }
      else{
        this.restService.postIdea(
          this.ideaOwner, this.ideaOwnerFullname, this.ideaOwnerAvatar,
          this.description, this.mediaId, this.mediaType,
          this.area, this.status, this.likes, this.likesString, this.suggestionsNo,
          this.latestSuggestionOwner, this.latestSuggestionOwnerFullname, this.latestSuggestion)
          .subscribe(data => {
            this.postSuggestion(data.id);
            // this.updateIdeaNo();             POR EL MOMENTO NO ACTUALIZAR
            this.shared.toast('Idea sent!');
            
            // ARTILUGIO PARA QUE NO SE DESHABILITE EL MENU DE IONIC
            //loading.dismiss();
            
            this.navCtrl.popToRoot();
            this.navCtrl.insert(0,TabsPage);
            
               
            // SE REEMPLAZARON LAS DOS LINEAS SIGUIENTES POR EL ARTILUGIO    
            // loading.dismiss();
            // this.navCtrl.setRoot(TabsPage);
          
            
          }, (err) => {
            loading.dismiss();
            let alert = this.alertCtrl.create({
              title: 'Sending idea failed',
              message: err,
              buttons: ['Try again']
            });
            alert.present();
        });
      }
    }
    else{
      let alert = this.alertCtrl.create({
        title: 'Oops!',
        message: 'Forgot to write your brilliance idea?',
        buttons: ['Try again']
      });
      alert.present();
    }
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }
}
