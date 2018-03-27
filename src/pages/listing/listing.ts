import { Component } from '@angular/core';
// import { SplashScreen } from '@ionic-native/splash-screen';
import { NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { General } from '../../models/general';
import { Idea } from '../../models/idea';
import { RestService } from '../../providers/rest-service';
// import { SuggestionPage } from '../suggestion/suggestion';
import { NotavailablePage } from '../notavailable/notavailable';

@Component({
  selector: 'page-listing',
  templateUrl: 'listing.html'
})


export class ListingPage {
  title: string;
generals: General[];

idea: Idea;
notFoundMessageToggle: boolean;
  // private navCtrl: NavController, 
  constructor(private navParams: NavParams, 
  private modalCtrl: ModalController,
  private viewCtrl: ViewController,
private restService: RestService) {
      this.title = navParams.get('title');
      this.generals = navParams.get('generals');
      if(this.generals.length==0){
        this.notFoundMessageToggle = false;
      }
      else{
        this.notFoundMessageToggle = true;
      }
    }

  ionViewDidLoad() {
    console.log('Hello ListingPage Page');
  }

  loadIdea(id: string) {
    console.log("cargando loadIdea");
    
    ///////// this.http.get('${this.apiUrl2}/ideas/'+ideaId)
    /////////  .map(res => <Idea>res.json());
  
    // this.restService.getOneIdea(id).subscribe(data => {
    // this.idea = data;
    
    /////////   this.idea = res;
    
    // this.modalSuggestion(this.idea);
    this.modalNotavailable(this.idea);
    // });
  }

  // modalSuggestion(idea: Idea) {
  //    let modal = this.modalCtrl.create(SuggestionPage, {idea});
  //    modal.present();
  // }
  
  modalNotavailable(idea: Idea) {
      let modal = this.modalCtrl.create(NotavailablePage, {idea});
      modal.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  
}
