import { Component, ViewChild } from '@angular/core';

import { MenuController, NavController, Slides } from 'ionic-angular';

// import { Storage } from '@ionic/storage';

import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})

export class WelcomePage {
  showSkip = true;

	@ViewChild('slides') slides: Slides;

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public storage: Storage
  ) { }

  startApp() {
    this.navCtrl.push(TabsPage).then(() => {
      this.storage.set('hasSeenWelcome', 'true');
    })
  }

  onSlideChangeStart(slider: Slides) {
    this.showSkip = !slider.isEnd();
  }

  ionViewWillEnter() {
    this.slides.update();
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the welcome page
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the welcome page
    this.menu.enable(true);
  }

}
