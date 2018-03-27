import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { Idea } from '../../models/idea';
import { SuggestionPage } from '../suggestion/suggestion';
import { ExchangePage } from '../exchange/exchange';

@Component({
  selector: 'page-notavailable',
  templateUrl: 'notavailable.html'
})


export class NotavailablePage {
  title: string;
// generals: General[];

idea: Idea;
ErrorMsg: string;

notFoundMessageToggle: boolean;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
  private modalCtrl: ModalController,
  private viewCtrl: ViewController) {
     
        this.notFoundMessageToggle = true;
     
    }

  ionViewDidLoad() {
    console.log('Hello NotavailablePage Page');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  
}
