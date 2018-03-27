webpackJsonp([0],{

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SuggestionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__calculate_calculate__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_shared__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_rest_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__action_action__ = __webpack_require__(213);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
 //Viewchild for collapse view model
 //content for collapse view model
 //viewcontroller for collapse view model




var SuggestionPage = (function () {
    function SuggestionPage(navCtrl, actionSheetCtrl, viewCtrl, loadingCtrl, alertCtrl, modalCtrl, navParams, shared, restService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.viewCtrl = viewCtrl;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        this.shared = shared;
        this.restService = restService;
        this.gridfsUrl = this.restService.gridfsUrl;
        var loading = this.loadingCtrl.create({
            content: "Loading suggestion..."
        });
        loading.present();
        this.suggestion = "";
        this.i = navParams.get('idea');
        if (this.i.status == "Closed") {
            this.CalculateVisibility = true;
        }
        else {
            this.CalculateVisibility = false;
        }
        //FOR TESTING
        this.CalculateVisibility = true;
        this.restService.getSuggestion(this.i.id).subscribe(function (data) {
            _this.suggestions = data;
            loading.dismiss();
        }, function (err) {
            loading.dismiss();
            console.log('Error');
        });
    }
    SuggestionPage.prototype.ionViewDidLoad = function () {
        console.log('Hello SuggestionPage Page');
    };
    SuggestionPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    SuggestionPage.prototype.modalAction = function (suggestion) {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__action_action__["a" /* ActionPage */], { suggestion: suggestion });
        modal.present();
    };
    SuggestionPage.prototype.modalCalculate = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__calculate_calculate__["a" /* CalculatePage */], { idea: this.i, suggestions: this.suggestions });
        modal.present();
    };
    SuggestionPage.prototype.like = function (idea) {
        if (idea.likesString.includes(this.shared.username)) {
            var alert_1 = this.alertCtrl.create({
                title: 'Oops!',
                message: 'You liked the idea before',
                buttons: ['OK']
            });
            alert_1.present();
        }
        else {
            var loading_1 = this.loadingCtrl.create({
                content: "Submitting like..."
            });
            loading_1.present();
            //
            // En tabla de Heroku sumaba 1 a la cantidad de Likes. Hacer reingenieria para JSON-Server
            // 
            // idea.likes.push(this.shared.username);
            idea.likesString = idea.likes.toString();
            this.restService.updateIdea(idea.id, idea.status, idea.likes, idea.likesString, idea.suggestionsNo, idea.latestSuggestionOwner, idea.latestSuggestionOwnerFullname, idea.latestSuggestion)
                .subscribe(function (data) {
                loading_1.dismiss();
                console.log(data);
            }, function (err) {
                loading_1.dismiss();
                console.log(err);
            });
        }
    };
    SuggestionPage.prototype.post = function () {
        var _this = this;
        if (this.suggestion.trim().length > 0) {
            var loading_2 = this.loadingCtrl.create({
                content: "Your suggestion is going live :)"
            });
            loading_2.present();
            this.i.suggestionsNo++;
            this.i.status = "Going";
            this.i.latestSuggestionOwner = this.shared.fullname;
            this.i.latestSuggestionOwnerFullname = this.shared.fullname;
            this.i.latestSuggestion = this.suggestion;
            this.restService.updateIdea(this.i.id, this.i.status, this.i.likes, this.i.likesString, this.i.suggestionsNo, this.shared.username, this.shared.fullname, this.suggestion)
                .subscribe(function (data) {
                loading_2.dismiss();
                console.log(data);
            }, function (err) {
                loading_2.dismiss();
                console.log(err);
            });
            this.restService.postSuggestion(this.i.id, this.shared.username, this.shared.fullname, this.suggestion, "20180131")
                .subscribe(function (data) {
                _this.shared.toast('Suggestion uploaded');
                loading_2.dismiss();
                _this.dismiss();
            }, function (err) {
                loading_2.dismiss();
                var alert = _this.alertCtrl.create({
                    title: 'Sending suggestion failed',
                    message: err,
                    buttons: ['Try again']
                });
                alert.present();
            });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
    ], SuggestionPage.prototype, "content", void 0);
    SuggestionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-suggestion',template:/*ion-inline-start:"/home/ubuntu/workspace/zrm-io-smartwallet/src/pages/suggestion/suggestion.html"*/'<ion-header>\n  <ion-toolbar>\n    <ion-title>\n      Idea\'s Details\n    </ion-title>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <span color="primary" showWhen="ios">Cancel</span>\n        <ion-icon name="md-close" showWhen="android,windows"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-card>\n    <ion-item>\n      <ion-avatar item-left>\n        <img [src]="gridfsUrl+\'/media/\'+i.ideaOwnerAvatar+\'.avatar\'">\n      </ion-avatar>\n      <h2>{{i.ideaOwnerFullname}}</h2>\n      <ion-badge item-right>{{i.area}}</ion-badge>\n      <small>{{i.updatedAt.substr(0, 10)}}</small>\n    </ion-item>\n\n    <ion-card-content>\n      <p>{{i.description}}</p>\n      <img style="object-fit:cover; width: 60%; margin: auto; display:block" *ngIf="i.mediaType==\'.jpg\'||i.mediaType==\'.png\'||i.mediaType==\'.bmp\'||i.mediaType==\'.gif\'||i.mediaType==\'.jpeg\'" [src]="gridfsUrl+\'/media/\'+i.mediaId+i.mediaType">\n      <video *ngIf="i.mediaType==\'.mp4\'" width="256" height="256" style="margin:auto; display: block" controls>\n        <source [src]="gridfsUrl+\'/media/\'+i.mediaId+i.mediaType" type="video/mp4">\n          Your browser does not support the video playback.\n      </video>\n\n      <audio *ngIf="i.mediaType==\'.mp3\'" controls>\n<source [src]="gridfsUrl+\'/media/\'+i.mediaId+i.mediaType" type="audio/mpeg">\nYour browser does not support the audio playback.\n</audio>\n      <a ion-item text-center *ngIf="!(i.mediaType==\'.jpg\'||i.mediaType==\'.png\'||i.mediaType==\'.bmp\'||i.mediaType==\'.gif\'||i.mediaType==\'.jpeg\'||i.mediaType==\'.mp4\'||i.mediaType==\'.mp3\'||!i.mediaType)" [href]="gridfsUrl+\'/media/\'+i.mediaId+i.mediaType"\n          target="_blank">\n        <ion-icon name="cloud-download"></ion-icon>{{i.mediaType}}</a>\n    </ion-card-content>\n\n    <ion-row>\n      <ion-col width-50 center text-center>\n        <button ion-button full primary clear small icon-left text-center (click)="like(i)">\n          <ion-icon name="thumbs-up"></ion-icon>\n          {{i.likes.length}}\n        </button>\n      </ion-col>\n      <ion-col width-50 center text-center>\n        <ion-item text-center><small style="text-transform:uppercase; color:#007aff"><b>{{i.status}}</b></small>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n\n  </ion-card>\n\n  <ion-card>\n    <ion-card-header color="primary">Suggestions</ion-card-header>\n    <ion-list>\n        <ion-item text-wrap (click)="modalAction(s)" *ngFor="let s of suggestions">\n            <h3>{{s.suggestionOwnerFullname}}</h3>\n            <small>{{s.updatedAt.substr(0, 10)}}</small>\n            <p><i>{{s.suggestion}}</i></p>\n          </ion-item>\n    </ion-list>\n  </ion-card>\n  <ion-fab bottom right *ngIf="CalculateVisibility">\n    <button ion-fab mini (click)="modalCalculate()"><ion-icon name="calculator"></ion-icon></button>\n  </ion-fab>\n</ion-content>\n\n<ion-footer>\n  <!-- <ion-item text-wrap *ngIf="!CalculateVisibility"> FOR TESTING-->\n      <ion-item text-wrap *ngIf="CalculateVisibility">\n    <ion-textarea rows="3" type="text" [(ngModel)]="suggestion" placeholder="Type your suggestion here"></ion-textarea>\n    <ion-buttons item-right>\n      <button ion-button (click)="post()">Send</button>\n    </ion-buttons>\n  </ion-item>\n\n</ion-footer>\n'/*ion-inline-end:"/home/ubuntu/workspace/zrm-io-smartwallet/src/pages/suggestion/suggestion.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_shared__["a" /* Shared */],
            __WEBPACK_IMPORTED_MODULE_4__providers_rest_service__["a" /* RestService */]])
    ], SuggestionPage);
    return SuggestionPage;
}());

//# sourceMappingURL=suggestion.js.map

/***/ }),

/***/ 123:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 123;

/***/ }),

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RestService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var RestService = (function () {
    // apiUrl2 = 'https://zerium-wiki-linanayail.c9users.io:8081';
    // gridfsUrl= 'https://zerium-wiki-linanayail.c9users.io:8081';
    function RestService(http) {
        this.http = http;
        this.authUrl = 'https://jsonplaceholder.typicode.com'; //Please use your desired authUrl
        this.apiUrl = 'https://jsonplaceholder.typicode.com';
        this.apiUrl2 = 'https://zerium-linanayail.c9users.io:8081';
        this.gridfsUrl2 = 'https://zerium-linanayail.c9users.io:8081';
        this.imgsUrl = 'https://zerium-linanayail.c9users.io:8080';
        this.gridfsUrl = 'https://protected-temple-59341.herokuapp.com';
        console.log('Hello RestService Provider');
    }
    RestService.prototype.postUser = function (username, fullname, avatarId, ideaNo, actionNo) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.apiUrl + "/users?id=20&name=\"Juancito\"username=" + username, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    RestService.prototype.postUser2 = function (username, fullname, avatarId, ideaNo, actionNo) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.apiUrl + "/user?username=" + username + "&fullname=" + fullname + "&avatarId=" + avatarId + "&ideaNo=" + ideaNo + "&actionNo=" + actionNo, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    RestService.prototype.authUser = function (name, password) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.authUrl + "/users/10", { headers: headers }) //working
            .map(function (res) { return res.json(); });
    };
    RestService.prototype.authUser2 = function (name, password) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.authUrl + "/user?username=" + name + "&password=" + password, { headers: headers }) //working
            .map(function (res) { return res.json(); });
    };
    RestService.prototype.searchUser = function (key, value) {
        return this.http.get(this.apiUrl + "/user?" + key + "=" + value + "&sort=updatedAt DESC")
            .map(function (res) { return res.json(); });
    };
    RestService.prototype.updateUser = function (id, fullname, avatarId, ideaNo, actionNo) {
        var data = {
            fullname: fullname,
            avatarId: avatarId,
            ideaNo: ideaNo,
            actionNo: actionNo
        };
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        return this.http.put(this.apiUrl + '/user/' + id, JSON.stringify(data), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    RestService.prototype.postIdea = function (ideaOwner, ideaOwnerFullname, ideaOwnerAvatar, description, mediaId, mediaType, area, status, likes, likesString, suggestionsNo, latestSuggestionOwner, latestSuggestionOwnerFullname, latestSuggestion) {
        var data = {
            ideaOwner: ideaOwner,
            ideaOwnerFullname: ideaOwnerFullname,
            ideaOwnerAvatar: ideaOwnerAvatar,
            description: description,
            mediaId: mediaId,
            mediaType: mediaType,
            area: area,
            status: status,
            likes: likes,
            likesString: likesString,
            suggestionsNo: suggestionsNo,
            latestSuggestionOwner: latestSuggestionOwner,
            latestSuggestionOwnerFullname: latestSuggestionOwnerFullname,
            latestSuggestion: latestSuggestion,
        };
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.apiUrl2 + '/ideas/', JSON.stringify(data), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    RestService.prototype.updateIdea = function (ideaId, status, likes, likesString, suggestionsNo, latestSuggestionOwner, latestSuggestionOwnerFullname, latestSuggestion) {
        var data = {
            status: status,
            likes: likes,
            likesString: likesString,
            suggestionsNo: suggestionsNo,
            latestSuggestionOwner: latestSuggestionOwner,
            latestSuggestionOwnerFullname: latestSuggestionOwnerFullname,
            latestSuggestion: latestSuggestion,
        };
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.apiUrl2 + '/ideas/' + ideaId, JSON.stringify(data), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    RestService.prototype.updateIdeaStatus = function (ideaId, status) {
        var data = {
            status: status
        };
        console.log("monitorea updateIdeaStatus");
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.apiUrl2 + '/ideas/' + ideaId, JSON.stringify(data), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    RestService.prototype.getIdea = function (loadIdeasSkipper) {
        console.log("monitorea getIdea");
        return this.http.get(this.apiUrl2 + "/ideas")
            .map(function (res) { return res.json(); });
    };
    RestService.prototype.getIdea2 = function (loadIdeasSkipper) {
        console.log("cargando ideas desde el servidor");
        return this.http.get(this.apiUrl + "/idea?sort=updatedAt DESC&limit=10&skip=" + loadIdeasSkipper)
            .map(function (res) { return res.json(); });
    };
    RestService.prototype.getOneIdea = function (ideaId) {
        return this.http.get('/ideas/' + ideaId)
            .map(function (res) { return res.json(); });
    };
    RestService.prototype.searchIdea = function (key, value, area, status, startDate, endDate) {
        return this.http.get(this.apiUrl2 + "/ideas?{\"" + key + "\":{\"contains\":\"" + value + "\"}, \"area\":{\"contains\":\"" + area + "\"}, \"status\":{\"contains\":\"" + status + "\"}, \"updatedAt\":{\">=\": \"" + startDate + "\", \"<=\": \"" + endDate + "\"}}")
            .map(function (res) { return res.json(); });
    };
    RestService.prototype.searchIdea2 = function (key, value, area, status, startDate, endDate) {
        return this.http.get(this.apiUrl + "/idea?where={\"" + key + "\":{\"contains\":\"" + value + "\"}, \"area\":{\"contains\":\"" + area + "\"}, \"status\":{\"contains\":\"" + status + "\"}, \"updatedAt\":{\">=\": \"" + startDate + "\", \"<=\": \"" + endDate + "\"}}")
            .map(function (res) { return res.json(); });
    };
    RestService.prototype.postSuggestion = function (ideaId, suggestionOwner, suggestionOwnerFullname, suggestion, updatedAt) {
        var data = {
            ideaId: ideaId,
            suggestionOwner: suggestionOwner,
            suggestionOwnerFullname: suggestionOwnerFullname,
            suggestion: suggestion,
            updatedAt: updatedAt
        };
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.apiUrl2 + '/suggestion/', JSON.stringify(data), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    RestService.prototype.getSuggestion = function (ideaId) {
        return this.http.get(this.apiUrl2 + "/suggestion?ideaId=" + ideaId + "&sort=updatedAt ASC")
            .map(function (res) { return res.json(); });
    };
    RestService.prototype.deleteSuggestion = function (ideaId) {
        return this.http.delete(this.apiUrl + "/suggestion/" + ideaId)
            .map(function (res) { return res.json(); });
    };
    RestService.prototype.searchSuggestion = function (key, value, startDate, endDate) {
        return this.http.get(this.apiUrl2 + "/suggestion?{\"" + key + "\":{\"contains\":\"" + value + "\"}, \"updatedAt\":{\">=\": \"" + startDate + "\", \"<=\": \"" + endDate + "\"}}")
            .map(function (res) { return res.json(); });
    };
    RestService.prototype.postAction = function (ideaId, suggestionId, actionOwner, actionOwnerFullname, action, actionDeadline) {
        var data = {
            ideaId: ideaId,
            suggestionId: suggestionId,
            actionOwner: actionOwner,
            actionOwnerFullname: actionOwnerFullname,
            action: action,
            actionDeadline: actionDeadline
        };
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.apiUrl + '/action/', JSON.stringify(data), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    RestService.prototype.getAction = function (suggestionId) {
        return this.http.get(this.apiUrl + "/action?suggestionId=" + suggestionId + "&sort=updatedAt ASC")
            .map(function (res) { return res.json(); });
    };
    RestService.prototype.deleteAction = function (actionId) {
        return this.http.delete(this.apiUrl + "/action/" + actionId)
            .map(function (res) { return res.json(); });
    };
    RestService.prototype.searchAction = function (key, value, startDate, endDate) {
        return this.http.get(this.apiUrl + "/action?where={\"" + key + "\":{\"contains\":\"" + value + "\"}, \"actionDeadline\":{\">=\": \"" + startDate + "\", \"<=\": \"" + endDate + "\"}}")
            .map(function (res) { return res.json(); });
    };
    RestService.prototype.uploadFile = function (fileToUpload) {
        var input = new FormData();
        input.append("file", fileToUpload);
        return this.http
            .post(this.gridfsUrl2 + "/file/", input);
    };
    RestService.prototype.postReview = function (review) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.apiUrl + '/review/', JSON.stringify(review), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    RestService.prototype.getListTraderKeys = function (TraderKey) {
        console.log(TraderKey);
        return this.http.get(this.apiUrl2 + '/TraderKeys')
            .map(function (res) { return res.json(); });
    };
    RestService.prototype.getListExchangeKeys = function (ExchangeKey) {
        console.log(ExchangeKey);
        return this.http.get(this.apiUrl2 + '/ExchangeKeys')
            .map(function (res) { return res.json(); });
    };
    RestService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], RestService);
    return RestService;
}());

//# sourceMappingURL=rest-service.js.map

/***/ }),

/***/ 165:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 165;

/***/ }),

/***/ 209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_rest_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_shared__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__suggestion_suggestion__ = __webpack_require__(113);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SearchPage = (function () {
    function SearchPage(navCtrl, viewCtrl, modalCtrl, restService, shared) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.modalCtrl = modalCtrl;
        this.restService = restService;
        this.shared = shared;
        this.areas = [];
        this.areas = this.shared.AreaSet;
        this.reset();
    }
    SearchPage.prototype.ionViewDidLoad = function () {
        console.log('Hello SearchPage Page');
    };
    SearchPage.prototype.searchIdea = function (event) {
        var _this = this;
        this.restService.searchIdea("description", this.term, this.area, this.status, this.startDate, this.endDate).subscribe(function (data) {
            _this.ideas = data;
        });
        this.refreshToggle = true;
        this.content.resize();
    };
    SearchPage.prototype.searchAll = function (event) {
        var _this = this;
        this.restService.searchIdea("description", this.term, this.area, this.status, this.startDate, this.endDate).subscribe(function (data) {
            _this.ideas = data;
        });
        this.restService.searchSuggestion("suggestion", this.term, this.startDate, this.endDate).subscribe(function (data) {
            _this.suggestions = data;
        });
        this.restService.searchAction("action", this.term, this.startDate, this.endDate).subscribe(function (data) {
            _this.actions = data;
        });
        this.refreshToggle = true;
        this.content.resize();
    };
    SearchPage.prototype.search = function (searchEvent) {
        var _this = this;
        this.term = searchEvent.target.value;
        // Only perform the search if we have 3 or more characters
        if (this.term.trim() === '' || this.term.trim().length < 3) {
            this.ideas = [];
            this.suggestions = [];
            this.actions = [];
        }
        else {
            // Get the searched results
            this.restService.searchIdea("description", this.term, this.area, this.status, this.startDate, this.endDate).subscribe(function (data) {
                _this.ideas = data;
            });
            this.restService.searchSuggestion("suggestion", this.term, this.startDate, this.endDate).subscribe(function (data) {
                _this.suggestions = data;
            });
            this.restService.searchAction("action", this.term, this.startDate, this.endDate).subscribe(function (data) {
                _this.actions = data;
            });
        }
        this.refreshToggle = true;
        this.content.resize();
    };
    SearchPage.prototype.loadIdea = function (id) {
        var _this = this;
        this.restService.getOneIdea(id).subscribe(function (data) {
            _this.idea = data;
            _this.modalSuggestion(_this.idea);
        });
    };
    SearchPage.prototype.modalSuggestion = function (idea) {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__suggestion_suggestion__["a" /* SuggestionPage */], { idea: idea });
        modal.present();
    };
    SearchPage.prototype.refresh = function () {
        this.reset();
        this.content.resize();
    };
    SearchPage.prototype.reset = function () {
        this.refreshToggle = false;
        this.area = "";
        this.status = "";
        this.startDate = "2016-01-01";
        this.endDate = this.shared.getTomorrow();
        this.term = "";
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
    ], SearchPage.prototype, "content", void 0);
    SearchPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-search',template:/*ion-inline-start:"/home/ubuntu/workspace/zrm-io-smartwallet/src/pages/search/search.html"*/'<ion-header>\n\n  <ion-navbar>\n    <!-- Agregado de ion-button menuToggle --> \n    <button ion-button menuToggle right>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Search</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-searchbar (input)="search($event)"></ion-searchbar>\n  <ion-item-group>\n  <ion-item-divider color="light">Filter</ion-item-divider>\n    <ion-item>\n      <ion-label>Area</ion-label>\n      <ion-select [(ngModel)]="area" (ionChange)="searchIdea(area)">\n      <ion-option *ngFor="let a of areas" [value]="a.value">{{a.value}}</ion-option>\n      </ion-select>\n  </ion-item>\n    <ion-item>\n  <ion-label>Status</ion-label>\n    <ion-select [(ngModel)]="status" (ionChange)="searchIdea(status)">\n      <ion-option value="Open">Open</ion-option>\n      <ion-option value="Going">Going</ion-option>\n      <ion-option value="Closed">Closed</ion-option>\n    </ion-select>\n  </ion-item>\n  <ion-item>\n    <ion-label>Anytime From</ion-label>\n    <ion-datetime displayFormat="MMM DD YYYY" [(ngModel)]="startDate" (ionChange)="searchAll(startDate)"></ion-datetime>\n    </ion-item>\n    <ion-item>\n      <ion-label>Anytime To</ion-label>\n      <ion-datetime displayFormat="MMM DD YYYY" [(ngModel)]="endDate" (ionChange)="searchAll(endDate)"></ion-datetime>\n      </ion-item>\n</ion-item-group>\n\n    <ion-item-group>\n    <ion-item-divider color="light">Result by Ideas</ion-item-divider>\n  \n  <!-- <button ion-item text-wrap (click)="modalNotavailable("p2p2")">  -->\n  \n  <button ion-item text-wrap *ngFor="let i of ideas" (click)="modalSuggestion(i)"> \n \n    <ion-badge item-right>{{i.area}}</ion-badge>\n    <h2>{{i.ideaOwner}}</h2>\n    <small>{{i.updatedAt.substr(0, 10)}}</small>\n    <p>{{i.description}}</p>\n  </button>\n</ion-item-group>\n\n<ion-item-group>\n<ion-item-divider color="light">Result by Suggestions</ion-item-divider>\n<button ion-item text-wrap *ngFor="let s of suggestions" (click)="loadIdea(s.ideaId)">\n<h2>{{s.suggestionOwner}}</h2>\n<small>{{s.updatedAt.substr(0, 10)}}</small>\n<p>{{s.suggestion}}</p>\n</button>\n</ion-item-group>\n\n<ion-item-group>\n<ion-item-divider color="light">Result by Actions</ion-item-divider>\n<button ion-item text-wrap *ngFor="let a of actions" (click)="loadIdea(a.ideaId)">\n<h2>{{a.actionOwner}}</h2>\n<small>{{a.updatedAt.substr(0, 10)}}</small>\n<p>{{a.action}}</p>\n</button>\n</ion-item-group>\n<ion-fab right bottom *ngIf="refreshToggle">\n<button ion-fab color="danger" (click)="refresh()"><ion-icon name="close"></ion-icon></button>\n</ion-fab>\n</ion-content>\n'/*ion-inline-end:"/home/ubuntu/workspace/zrm-io-smartwallet/src/pages/search/search.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_rest_service__["a" /* RestService */],
            __WEBPACK_IMPORTED_MODULE_3__providers_shared__["a" /* Shared */]])
    ], SearchPage);
    return SearchPage;
}());

//# sourceMappingURL=search.js.map

/***/ }),

/***/ 211:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalculatePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_shared__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_rest_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__review_review__ = __webpack_require__(212);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CalculatePage = (function () {
    function CalculatePage(navCtrl, viewCtrl, loadingCtrl, alertCtrl, modalCtrl, navParams, shared, restService) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        this.shared = shared;
        this.restService = restService;
        this.suggestionToggle = true;
        this.idea = navParams.get('idea');
        this.suggestions = navParams.get('suggestions');
        this.suggestion = "";
        this.suggestionId = "";
        this.CalculateItemVisibility = false;
        this.BenefitCategory = "Quality and Safety";
        this.reset();
    }
    CalculatePage.prototype.ionViewDidLoad = function () {
        console.log('Hello ReviewPage Page');
    };
    CalculatePage.prototype.toggleCalculateItemVisibility = function (event) {
        switch (this.BenefitCategory) {
            case "Quality and Safety":
                this.CalculateItemVisibility = false;
                this.content.resize();
                this.reset();
                break;
            case "Cycle Time":
                this.CalculateItemVisibility = true;
                this.content.resize();
                this.reset();
                this.LvCycleTime = true;
                break;
            case "Scrap/Rework/Waste":
                this.CalculateItemVisibility = true;
                this.content.resize();
                this.reset();
                this.LvScrapReworkWaste = true;
                break;
            case "Space Utilization":
                this.CalculateItemVisibility = true;
                this.content.resize();
                this.reset();
                this.LvSpaceUtilization = true;
                break;
            case "Inventory Assets":
                this.CalculateItemVisibility = true;
                this.content.resize();
                this.reset();
                this.LvInventoryAssets = true;
                break;
            case "Others":
                this.CalculateItemVisibility = true;
                this.content.resize();
                this.reset();
                this.LvOthers = true;
                break;
            default:
                console.log('No case found');
                break;
        }
    };
    CalculatePage.prototype.toggleSoftSavingCalculator = function () {
        this.LvSoftSaving = !this.LvSoftSaving;
        this.content.resize();
    };
    CalculatePage.prototype.toggleHardSavingCalculator = function () {
        this.LvHardSaving = !this.LvHardSaving;
        this.content.resize();
    };
    CalculatePage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    CalculatePage.prototype.modalReview = function () {
        var review = {
            ideaId: this.idea.id,
            topic: "",
            idea: this.idea.description,
            area: this.idea.area,
            updatedAt: "",
            suggestionId: this.suggestionId,
            suggestion: this.suggestion,
            benefit: "",
            benefitCategory: this.BenefitCategory,
            ideaOwner: this.idea.ideaOwner,
            teamMembers: "",
            imageBefore: "",
            imageAfter: "",
            softSaving: this.SoftSaving,
            hardSaving: this.HardSaving,
            ctTime: this.CtTime,
            ctCost: this.CtCost,
            ctFreq: this.CtFreq,
            ctFreqMultiplier: this.CtFreqMultiplier,
            ctPeople: this.CtPeople,
            ctTotal: this.CtTotal,
            srwUnitReduction: this.SrwUnitReduction,
            srwCost: this.SrwCost,
            srwTotal: this.SrwTotal,
            suSpaceReduction: this.SuSpaceReduction,
            suOverhead: this.SuOverhead,
            suTotal: this.SuTotal,
            iaQuantity: this.IaQuantity,
            iaCost: this.IaCost,
            iaTotal: this.IaTotal,
            ooTotal: this.OoTotal,
            ooNotes: this.OoNotes,
            hsPeopleCost: this.HsPeopleCost,
            hsOvertime: this.HsOvertime,
            hsTempWorker: this.HsTempWorker,
            hsSrw: this.HsSrw,
            hsOther: this.HsOther,
            hsNotes: this.HsNotes
        };
        console.log(review);
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__review_review__["a" /* ReviewPage */], { review: review });
        modal.present();
    };
    CalculatePage.prototype.reset = function () {
        this.LvCycleTime = false;
        this.LvScrapReworkWaste = false;
        this.LvSpaceUtilization = false;
        this.LvInventoryAssets = false;
        this.LvOthers = false;
        this.LvHardSaving = false;
        this.LvSoftSaving = false;
        this.SoftSaving = 0;
        this.HardSaving = 0;
        this.CtTime = 0;
        this.CtCost = 0;
        this.CtFreq = 0;
        this.CtFreqMultiplier = 220;
        this.CtPeople = 0;
        this.CtTotal = 0;
        this.SrwUnitReduction = 0;
        this.SrwCost = 0;
        this.SrwTotal = 0;
        this.SuSpaceReduction = 0;
        this.SuOverhead = 0;
        this.SuTotal = 0;
        this.IaQuantity = 0;
        this.IaCost = 0;
        this.IaTotal = 0;
        this.OoTotal = 0;
        this.OoNotes = "";
        this.HsPeopleCost = 0;
        this.HsOvertime = 0;
        this.HsTempWorker = 0;
        this.HsSrw = 0;
        this.HsOther = 0;
        this.HsNotes = "";
    };
    CalculatePage.prototype.calculate = function () {
        this.CtTotal = this.CtTime / 60 * this.CtCost * this.CtFreq * this.CtFreqMultiplier * this.CtPeople;
        this.SrwTotal = this.SrwUnitReduction * this.SrwCost;
        this.SuTotal = this.SuSpaceReduction * this.SuOverhead;
        this.IaTotal = this.IaQuantity * this.IaCost;
        this.HsSrw = this.SrwTotal;
        this.SoftSaving = this.CtTotal + this.SrwTotal + this.SuTotal + this.IaTotal + this.OoTotal;
        this.HardSaving = this.HsPeopleCost + this.HsOvertime + this.HsTempWorker + this.HsSrw + this.HsOther;
    };
    CalculatePage.prototype.selectSuggestion = function (suggest) {
        this.suggestion = suggest.suggestion;
        this.suggestionId = suggest.id;
        this.suggestionToggle = false;
        this.content.resize();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
    ], CalculatePage.prototype, "content", void 0);
    CalculatePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-calculate',template:/*ion-inline-start:"/home/ubuntu/workspace/zrm-io-smartwallet/src/pages/calculate/calculate.html"*/'<ion-header>\n  <ion-toolbar>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <span color="primary" showWhen="ios">Cancel</span>\n        <ion-icon name="md-close" showWhen="android,windows"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>\n      Calculate Benefits\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-item-group *ngIf="suggestionToggle">\n    <ion-item-divider color="light">Select a Suggestion</ion-item-divider>\n    <button ion-item *ngFor="let s of suggestions" (click)="selectSuggestion(s)">\n    <ion-icon name="cafe" item-left></ion-icon>{{s.suggestion}}</button>\n  </ion-item-group>\n  <ion-item-group>\n    <ion-item-divider color="light">Suggestion</ion-item-divider>\n    <ion-item *ngIf="!suggestionToggle">\n    <ion-icon name="cafe" item-left></ion-icon>{{suggestion}}</ion-item>\n    <ion-item>\n      <ion-label>Benefit Category</ion-label>\n      <ion-select [(ngModel)]="BenefitCategory" (ionChange)="toggleCalculateItemVisibility(BenefitCategory)">\n        <ion-option value="Quality and Safety">Quality and Safety</ion-option>\n        <ion-option value="Cycle Time">Cycle Time</ion-option>\n        <ion-option value="Scrap/Rework/Waste">Scrap/Rework/Waste</ion-option>\n        <ion-option value="Space Utilization">Space Utilization</ion-option>\n        <ion-option value="Inventory Assets">Inventory Assets</ion-option>\n        <ion-option value="Others">Others</ion-option>\n      </ion-select>\n    </ion-item>\n  </ion-item-group>\n\n  <ion-item-group *ngIf="CalculateItemVisibility">\n    <ion-item-divider color="light">Saving</ion-item-divider>\n    <ion-item>\n      <ion-label>Soft Savings ($)</ion-label>\n      <ion-input [(ngModel)]="SoftSaving" type="number"></ion-input>\n      <ion-buttons item-right>\n        <button ion-button icon-only clear (click)="toggleSoftSavingCalculator()">\n          <ion-icon name="calculator"></ion-icon>\n        </button>\n      </ion-buttons>\n    </ion-item>\n      <ion-list *ngIf="LvSoftSaving">\n          <ion-item *ngIf="LvCycleTime">\n            <ion-label>Cycle Time Saved (min)</ion-label>\n            <ion-input [(ngModel)]="CtTime" type="number" (blur)="calculate($event)"></ion-input>\n          </ion-item>\n          <ion-item *ngIf="LvCycleTime">\n            <ion-label>People Cost/Hour ($)</ion-label>\n            <ion-input [(ngModel)]="CtCost" type="number" (blur)="calculate($event)"></ion-input>\n          </ion-item>\n          <ion-item *ngIf="LvCycleTime">\n            <ion-label>Frequency</ion-label>\n            <ion-input [(ngModel)]="CtFreq" type="number" (blur)="calculate($event)"></ion-input>\n            <ion-select item-right placeholder="per Day" [(ngModel)]="CtFreqMultiplier" (ionChange)="toggleCalculateItemVisibility(BenefitCategory)">\n              <ion-option value="220">per Day</ion-option>\n              <ion-option value="50">per Week</ion-option>\n              <ion-option value="12">per Month</ion-option>\n            </ion-select>\n          </ion-item>\n          <ion-item *ngIf="LvCycleTime">\n            <ion-label>People Benefited</ion-label>\n            <ion-input [(ngModel)]="CtPeople" type="number" (blur)="calculate($event)"></ion-input>\n          </ion-item>\n          <ion-item *ngIf="LvScrapReworkWaste">\n            <ion-label>Unit Reduction (unit)</ion-label>\n            <ion-input [(ngModel)]="SrwUnitReduction" type="number" (blur)="calculate($event)"></ion-input>\n          </ion-item>\n          <ion-item *ngIf="LvScrapReworkWaste">\n            <ion-label>Cost/Unit ($)</ion-label>\n            <ion-input [(ngModel)]="SrwCost" type="number" (blur)="calculate($event)"></ion-input>\n          </ion-item>\n          <ion-item *ngIf="LvSpaceUtilization">\n            <ion-label>Space Reduced (Sqft)</ion-label>\n            <ion-input [(ngModel)]="SuSpaceReduction" type="number" (blur)="calculate($event)"></ion-input>\n          </ion-item>\n          <ion-item *ngIf="LvSpaceUtilization">\n            <ion-label>WPS OH Suport/sqft/yr ($)</ion-label>\n            <ion-input [(ngModel)]="SuOverhead" type="number" (blur)="calculate($event)"></ion-input>\n          </ion-item>\n          <ion-item *ngIf="LvInventoryAssets">\n            <ion-label>Quantity Reduced (Unit)</ion-label>\n            <ion-input [(ngModel)]="IaQuantity" type="number" (blur)="calculate($event)"></ion-input>\n          </ion-item>\n          <ion-item *ngIf="LvInventoryAssets">\n            <ion-label>Cost/Unit ($)</ion-label>\n            <ion-input [(ngModel)]="IaCost" type="number" (blur)="calculate($event)"></ion-input>\n          </ion-item>\n          <ion-item *ngIf="LvOthers">\n            <ion-label>Cost Saved ($)</ion-label>\n            <ion-input [(ngModel)]="OoTotal" type="number" (blur)="calculate($event)"></ion-input>\n          </ion-item>\n          <ion-item *ngIf="LvOthers">\n            <ion-label>Note</ion-label>\n            <ion-input [(ngModel)]="OoNotes" type="text"></ion-input>\n          </ion-item>\n        </ion-list>\n    <ion-item>\n      <ion-label>Hard Savings ($)</ion-label>\n      <ion-input [(ngModel)]="HardSaving" type="number"></ion-input>\n      <ion-buttons item-right>\n        <button ion-button icon-only clear (click)="toggleHardSavingCalculator()">\n          <ion-icon name="calculator"></ion-icon>\n        </button>\n      </ion-buttons>\n    </ion-item>\n    <ion-list *ngIf="LvHardSaving">\n      <ion-item>\n        <ion-label>Employee Cost Reduced ($)</ion-label>\n        <ion-input [(ngModel)]="HsPeopleCost" type="number" (blur)="calculate($event)"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label>Overtime Cost Reduced ($)</ion-label>\n        <ion-input [(ngModel)]="HsOvertime" type="number" (blur)="calculate($event)"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label>Temp Worker Cost Reduced ($)</ion-label>\n        <ion-input [(ngModel)]="HsPeopleCost" type="number" (blur)="calculate($event)"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label>Scrap/Rework/Waste Cost Reduced ($)</ion-label>\n        <ion-input [(ngModel)]="HsSrw" type="number" (blur)="calculate($event)"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label>Others ($)</ion-label>\n        <ion-input [(ngModel)]="HsPeopleCost" type="number" (blur)="calculate($event)"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label>Notes for Others</ion-label>\n        <ion-input [(ngModel)]="HsNotes" type="text"></ion-input>\n      </ion-item>\n    </ion-list>\n</ion-item-group>\n  <ion-fab right bottom>\n    <button ion-fab (click)="modalReview()"><ion-icon name="trophy"></ion-icon></button>\n  </ion-fab>\n</ion-content>\n'/*ion-inline-end:"/home/ubuntu/workspace/zrm-io-smartwallet/src/pages/calculate/calculate.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_shared__["a" /* Shared */],
            __WEBPACK_IMPORTED_MODULE_3__providers_rest_service__["a" /* RestService */]])
    ], CalculatePage);
    return CalculatePage;
}());

//# sourceMappingURL=calculate.js.map

/***/ }),

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReviewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_rest_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_shared__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tabs_tabs__ = __webpack_require__(39);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ReviewPage = (function () {
    function ReviewPage(navCtrl, viewCtrl, navParams, loadingCtrl, alertCtrl, restService, shared) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.restService = restService;
        this.shared = shared;
        this.Vacants = [];
        this.TeamMembers = [];
        this.review = navParams.get('review');
        this.Count = 0;
        this.Vacants = [{ id: this.Count, value: 'Team Member 1' }];
        this.fileBeforeExist = false;
        this.fileAfterExist = false;
        this.loading = this.loadingCtrl.create({
            content: "We're submitting your review. Be patient."
        });
    }
    ReviewPage.prototype.ionViewDidLoad = function () {
        console.log('Hello ReviewPage Page');
    };
    ReviewPage.prototype.addFile = function (mode) {
        if (mode) {
            this.fiBefore = this.fileInputBefore.nativeElement;
            this.fileBeforeExist = (this.fiBefore.files && this.fiBefore.files[0]);
        }
        else {
            this.fiAfter = this.fileInputBefore.nativeElement;
            this.fileBeforeExist = (this.fiAfter.files && this.fiAfter.files[0]);
        }
    };
    ReviewPage.prototype.postBeforeFile = function () {
        var _this = this;
        var fileToUpload = this.fiBefore.files[0];
        this.restService
            .uploadFile(fileToUpload)
            .subscribe(function (res) {
            _this.review.imageBefore = res.json();
            _this.postAfterFile();
        }, function (err) {
            var alert = _this.alertCtrl.create({
                title: 'Sending file failed',
                message: err,
                buttons: ['Try again']
            });
            alert.present();
        });
    };
    ReviewPage.prototype.postAfterFile = function () {
        var _this = this;
        var fileToUpload = this.fiAfter.files[0];
        this.restService
            .uploadFile(fileToUpload)
            .subscribe(function (res) {
            _this.review.imageAfter = res.json();
            _this.postReview();
        }, function (err) {
            var alert = _this.alertCtrl.create({
                title: 'Sending file failed',
                message: err,
                buttons: ['Try again']
            });
            alert.present();
        });
    };
    ReviewPage.prototype.postReview = function () {
        var _this = this;
        this.restService.postReview(this.review)
            .subscribe(function (data) {
            _this.loading.dismiss();
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__tabs_tabs__["a" /* TabsPage */]);
            _this.shared.toast("The application is sent to CI team for review. Thanks.");
        }, function (err) {
            _this.loading.dismiss();
            var alert = _this.alertCtrl.create({
                title: 'Sending review failed',
                message: err,
                buttons: ['Try again']
            });
            alert.present();
        });
    };
    ReviewPage.prototype.increaseArray = function () {
        this.Count++;
        this.Vacants.push({ id: this.Count, value: 'Team Member ' + (this.Count + 1) });
    };
    ReviewPage.prototype.decreaseArray = function () {
        this.Count--;
        this.Vacants.pop();
    };
    ReviewPage.prototype.post = function () {
        this.review.teamMembers = this.TeamMembers.toString();
        if ((this.review.benefit.trim().length > 0) && (this.review.teamMembers.trim().length > 0)) {
            this.loading.present();
            this.restService.updateIdeaStatus(this.review.ideaId, "Review")
                .subscribe(function (data) {
                console.log(data);
            }, function (err) {
                console.log(err);
            });
            if (this.fileBeforeExist && this.fileAfterExist) {
                this.postBeforeFile();
            }
            else {
                this.postReview();
            }
        }
        else {
            var alert_1 = this.alertCtrl.create({
                title: 'Sending review failed',
                message: "Looks like you haven't key in the benefit description or team members involved",
                buttons: ['Try again']
            });
            alert_1.present();
        }
    };
    ReviewPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
        //this.navCtrl.pop(); 2 times also can
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])("fileInputBefore"),
        __metadata("design:type", Object)
    ], ReviewPage.prototype, "fileInputBefore", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])("fileInputAfter"),
        __metadata("design:type", Object)
    ], ReviewPage.prototype, "fileInputAfter", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
    ], ReviewPage.prototype, "content", void 0);
    ReviewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-review',template:/*ion-inline-start:"/home/ubuntu/workspace/zrm-io-smartwallet/src/pages/review/review.html"*/'<ion-header>\n  <ion-toolbar>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <span color="primary" showWhen="ios">Cancel</span>\n        <ion-icon name="md-close" showWhen="android,windows"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>\n      IDEA Application\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-item-group>\n    <ion-item text-wrap>{{review.benefitCategory}}</ion-item>\n    <ion-item>\n      <small>Idea Owner: {{review.ideaOwner}}</small>\n      <ion-badge item-right>{{review.area}}</ion-badge>\n    </ion-item>\n  </ion-item-group>\n  <ion-item-group>\n    <ion-item-divider color="light">Information</ion-item-divider>\n    <ion-item text-wrap>\n      <ion-label stacked>Topic</ion-label>\n      <ion-textarea rows="2" placeholder="Type your topic here for easier recognition" [(ngModel)]="review.topic"></ion-textarea>\n    </ion-item>\n    <ion-item text-wrap>\n      <ion-label stacked>Problem Description</ion-label>\n      <ion-textarea rows="6" placeholder="Type your problem description here" [(ngModel)]="review.idea"></ion-textarea>\n    </ion-item>\n    <ion-item>\n      <ion-label stacked>Solution Description</ion-label>\n      <ion-textarea rows="6" placeholder="Type your solution description here" [(ngModel)]="review.suggestion"></ion-textarea>\n    </ion-item>\n    <ion-item>\n        <ion-label stacked>Benefits Description</ion-label>\n        <ion-textarea rows="6" placeholder="Type your benefit description here" [(ngModel)]="review.benefit"></ion-textarea>\n      </ion-item>\n    </ion-item-group>\n    <ion-item-group>\n      <ion-item-divider color="light"><ion-row>\n        <ion-col width-70 center>\n          Contributors\n        </ion-col>\n        <ion-col width-10 center text-center>\n          <button ion-button full primary clear>\n            <ion-icon name="remove-circle" (click)="decreaseArray()"></ion-icon>\n          </button>\n        </ion-col>\n        <ion-col width-10 center text-center>\n          {{Vacants.length}}\n        </ion-col>\n        <ion-col width-10 center text-center>\n          <button ion-button full primary clear>\n            <ion-icon name="add-circle" (click)="increaseArray()"></ion-icon>\n          </button>\n        </ion-col>\n      </ion-row></ion-item-divider>\n    <ion-list>\n      <ion-item *ngFor="let vacant of Vacants">\n        <ion-label floating>{{vacant.value}}</ion-label>\n        <ion-input [(ngModel)]="TeamMembers[vacant.id]" type="text" maxlength="50"></ion-input>\n      </ion-item>\n    </ion-list>\n  </ion-item-group>\n\n  <ion-item-group>\n    <ion-item-divider color="light">Savings</ion-item-divider>\n    <ion-item>Soft Savings ($): {{review.softSaving}}</ion-item>\n    <ion-item>Hard Savings ($): {{review.hardSaving}}</ion-item>\n  </ion-item-group>\n\n  <ion-item-group>\n    <ion-item-divider color="light">Comparison</ion-item-divider>\n    <p padding-left>Before</p>\n    <ion-item>\n  <div>\n    <input type="file" #fileInputBefore (change)="addFile(true)"/>\n  </div>\n</ion-item>\n<p padding-left>After</p>\n<ion-item>\n  <div>\n    <input type="file" #fileInputAfter (change)="addFile(false)"/>\n  </div>\n  </ion-item>\n    </ion-item-group>\n    <ion-fab right bottom>\n      <button ion-fab (click)="post()" color="secondary"><ion-icon name="send"></ion-icon></button>\n    </ion-fab>\n</ion-content>\n'/*ion-inline-end:"/home/ubuntu/workspace/zrm-io-smartwallet/src/pages/review/review.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_rest_service__["a" /* RestService */],
            __WEBPACK_IMPORTED_MODULE_3__providers_shared__["a" /* Shared */]])
    ], ReviewPage);
    return ReviewPage;
}());

//# sourceMappingURL=review.js.map

/***/ }),

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_rest_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_shared__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ActionPage = (function () {
    function ActionPage(navCtrl, navParams, loadingCtrl, alertCtrl, viewCtrl, restService, shared) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.viewCtrl = viewCtrl;
        this.restService = restService;
        this.shared = shared;
        var loading = this.loadingCtrl.create({
            content: "Getting actions we collected..."
        });
        loading.present();
        this.action = "";
        this.actionOwner = "";
        this.actionOwnerFullname = "";
        this.actionDeadline = this.shared.getToday();
        this.suggestion = this.navParams.get('suggestion');
        this.restService.getAction(this.suggestion.id).subscribe(function (data) {
            loading.dismiss();
            _this.actions = data;
        }, function (err) {
            loading.dismiss();
            console.log('Error');
        });
    }
    ActionPage.prototype.ionViewDidLoad = function () {
        console.log('Hello ActionPage Page');
    };
    ActionPage.prototype.updateActionNo = function () {
        var _this = this;
        this.shared.actionNo++;
        this.restService.updateUser(this.shared.userId, this.shared.fullname, this.shared.avatarId, this.shared.ideaNo, this.shared.actionNo)
            .subscribe(function (res) {
            console.log(_this.shared.actionNo);
        }, function (err) {
            console.log(err);
        });
    };
    ActionPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    ActionPage.prototype.search = function (searchEvent) {
        var _this = this;
        this.actionOwnerFullname = searchEvent.target.value;
        // Only perform the search if we have 3 or more characters
        if (this.actionOwnerFullname.trim() === '' || this.actionOwnerFullname.trim().length < 3) {
            this.users = [];
        }
        else {
            this.restService.searchUser("fullname", this.actionOwnerFullname).subscribe(function (data) {
                _this.users = data;
            }, function (err) {
                console.log(err);
            });
        }
    };
    ActionPage.prototype.selectUser = function (user) {
        this.actionOwner = user.username;
        this.actionOwnerFullname = user.fullname;
        this.users = [];
    };
    ActionPage.prototype.post = function () {
        var _this = this;
        if ((this.action.trim().length > 0) && (this.actionOwnerFullname.trim().length > 0)) {
            var loading_1 = this.loadingCtrl.create({
                content: "Your action is going live :)"
            });
            loading_1.present();
            this.restService.postAction(this.suggestion.ideaId, this.suggestion.id, this.actionOwner, this.actionOwnerFullname, this.action, this.actionDeadline)
                .subscribe(function (data) {
                _this.updateActionNo();
                _this.shared.toast('Action uploaded');
                loading_1.dismiss();
                _this.dismiss();
            }, function (err) {
                loading_1.dismiss();
                var alert = _this.alertCtrl.create({
                    title: 'Sending action failed',
                    message: err,
                    buttons: ['Try again']
                });
                alert.present();
            });
        }
    };
    ActionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-action',template:/*ion-inline-start:"/home/ubuntu/workspace/zrm-io-smartwallet/src/pages/action/action.html"*/'<ion-header>\n  <ion-toolbar>\n    <ion-title>\n      Idea\'s Actions\n    </ion-title>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <span color="primary" showWhen="ios">Cancel</span>\n        <ion-icon name="md-close" showWhen="android,windows"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-card>\n    <ion-card-header color="primary">{{suggestion.suggestion}}</ion-card-header>\n    <ion-list>\n        <ion-item text-wrap *ngFor="let a of actions">\n    <h3>By {{a.actionOwnerFullname}}</h3>\n    <small>Deadline: {{a.actionDeadline}}</small>\n    <p><i>{{a.action}}</i></p>\n  </ion-item>\n    </ion-list>\n  </ion-card>\n</ion-content>\n\n<ion-footer>\n  <ion-list>\n      <ion-searchbar (input)="search($event)" placeholder="Assign action to?"></ion-searchbar>\n      <ion-list>\n        <button ion-item text-wrap *ngFor="let u of users" (click)="selectUser(u)">\n          <p>{{u.fullname}}</p>\n          <small>@{{u.username}}</small>\n        </button>\n      </ion-list>\n      <ion-item padding-left>\n        <ion-label>Complete by</ion-label>\n        <ion-datetime displayFormat="MMM DD YYYY" [(ngModel)]="actionDeadline"></ion-datetime>\n        </ion-item>\n        <ion-item>\n          <ion-textarea rows="3" [(ngModel)]="action" placeholder="Enter action here"></ion-textarea>\n          <ion-buttons item-right>\n            <button ion-button (click)="post()">Send</button>\n          </ion-buttons>\n        </ion-item>\n  </ion-list>\n</ion-footer>\n'/*ion-inline-end:"/home/ubuntu/workspace/zrm-io-smartwallet/src/pages/action/action.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_rest_service__["a" /* RestService */],
            __WEBPACK_IMPORTED_MODULE_3__providers_shared__["a" /* Shared */]])
    ], ActionPage);
    return ActionPage;
}());

//# sourceMappingURL=action.js.map

/***/ }),

/***/ 214:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__listing_listing__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_shared__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_rest_service__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AccountPage = (function () {
    function AccountPage(app, navCtrl, loadingCtrl, modalCtrl, alertCtrl, viewCtrl, restService, shared) {
        this.app = app;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.viewCtrl = viewCtrl;
        this.restService = restService;
        this.shared = shared;
        this.fuel = shared.ideaNo / 2 + shared.actionNo / 2;
    }
    AccountPage.prototype.ionViewDidLoad = function () {
        console.log('Hello AccountPage Page');
    };
    AccountPage.prototype.ideaToGeneral = function (ideas) {
        var generals = [];
        for (var i = 0; i < ideas.length; i++) {
            var data = [{
                    id: ideas[i].id,
                    description: ideas[i].description,
                    date: ideas[i].updatedAt
                }];
            if (generals.length > 0) {
                generals = generals.concat(data);
            }
            else {
                generals = data;
            }
        }
        return generals;
    };
    AccountPage.prototype.actionToGeneral = function (actions) {
        var generals = [];
        for (var i = 0; i < actions.length; i++) {
            var data = [{
                    id: actions[i].ideaId,
                    description: actions[i].action,
                    date: actions[i].actionDeadline
                }];
            if (generals.length > 0) {
                generals = generals.concat(data);
            }
            else {
                generals = data;
            }
        }
        return generals;
    };
    AccountPage.prototype.suggestionToGeneral = function (suggestions) {
        var generals = [];
        for (var i = 0; i < suggestions.length; i++) {
            var data = [{
                    id: suggestions[i].ideaId,
                    description: suggestions[i].suggestion,
                    date: suggestions[i].updatedAt
                }];
            if (generals.length > 0) {
                generals = generals.concat(data);
            }
            else {
                generals = data;
            }
        }
        return generals;
    };
    AccountPage.prototype.loadIdeas = function (mode) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "Getting your ideas..."
        });
        loading.present();
        var key;
        var value;
        var title;
        switch (mode) {
            case 0:
                key = "ideaOwner";
                value = this.shared.username;
                title = "Ideas";
                break;
            case 1:
                key = "status";
                value = "Closed";
                title = "Closed Ideas";
                break;
            case 2:
                key = "likesString";
                value = this.shared.username;
                title = "Liked Ideas";
                break;
            default:
                key = "ideaOwner";
                value = this.shared.username;
                title = "Ideas";
                break;
        }
        this.restService.searchIdea(key, value, "", "", "2016-01-01", "2036-01-01")
            .subscribe(function (data) {
            loading.dismiss();
            _this.modalListing(title, _this.ideaToGeneral(data));
        }, function (err) {
            loading.dismiss();
            console.log(err);
        });
    };
    AccountPage.prototype.loadActions = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "Getting your actions..."
        });
        loading.present();
        this.restService.searchAction("actionOwner", this.shared.username, "2016-01-01", "2036-01-01")
            .subscribe(function (data) {
            loading.dismiss();
            _this.modalListing("Actions", _this.actionToGeneral(data));
        }, function (err) {
            loading.dismiss();
            console.log(err);
        });
    };
    AccountPage.prototype.loadSuggestions = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "Getting your suggestions..."
        });
        loading.present();
        this.restService.searchSuggestion("suggestionOwner", this.shared.username, "2016-01-01", "2036-01-01")
            .subscribe(function (data) {
            loading.dismiss();
            _this.modalListing("Suggestions", _this.suggestionToGeneral(data));
        }, function (err) {
            loading.dismiss();
            console.log(err);
        });
    };
    AccountPage.prototype.modalListing = function (title, generals) {
        console.log(generals);
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__listing_listing__["a" /* ListingPage */], { title: title, generals: generals });
        modal.present();
    };
    AccountPage.prototype.goToLogin = function () {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
    };
    AccountPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-account',template:/*ion-inline-start:"/home/ubuntu/workspace/zrm-io-smartwallet/src/pages/account/account.html"*/'<ion-header>\n\n  <ion-navbar>\n    <!-- Agregado de ion-button menuToggle --> \n    <button ion-button menuToggle right>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Account</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n    <ion-item>\n      <ion-avatar item-left>\n        <img [src]="restService.imgsUrl+\'/assets/imgs/\'+\'foto_linkedin_diego_santos_byn\'+\'.jpg\'">\n      </ion-avatar>\n      <h1>{{shared.fullname}}</h1>\n      <p>@{{shared.username}}</p>\n    </ion-item>\n\n<ion-item-group>\n<ion-item-divider color="light">Contributions</ion-item-divider>\n\n<ion-item>\n<ion-icon name="medal" item-left></ion-icon>\nFuel\n<ion-badge item-right color="secondary">{{fuel}}</ion-badge></ion-item>\n\n<button ion-item (click)="loadIdeas(0)">\n<ion-icon name="flash" item-left></ion-icon>\nYour Ideas\n<ion-badge item-right>{{shared.ideaNo}}</ion-badge>\n</button>\n\n<button ion-item (click)="loadActions()">\n<ion-icon name="build" item-left></ion-icon>\nYour Actions\n<ion-badge item-right>{{shared.actionNo}}</ion-badge></button>\n\n</ion-item-group>\n\n<ion-item-group>\n<ion-item-divider color="light">Following</ion-item-divider>\n\n<button ion-item (click)="loadIdeas(1)">\n<ion-icon name="checkmark-circle" item-left></ion-icon>\nClosed Ideas\n</button>\n\n    <button ion-item (click)="loadIdeas(2)">\n    <ion-icon name="heart" item-left></ion-icon>\n    Liked Ideas\n  </button>\n\n    <button ion-item (click)="loadSuggestions()">\n    <ion-icon name="cafe" item-left></ion-icon>\n    Your Suggestions\n  </button>\n</ion-item-group>\n\n<ion-item-group>\n  <ion-item-divider color="light">Others</ion-item-divider>\n\n  <ion-item>\n  <ion-icon name="help-circle" item-left></ion-icon>\n  <a href="mailto:diego.enrique.santos@gmail.com?Subject=ESS%20Help" target="_top">Help</a></ion-item>\n\n<button ion-item (click)="goToLogin()">\n<ion-icon name="log-out" item-left></ion-icon>\nSign Out</button>\n</ion-item-group>\n</ion-content>\n'/*ion-inline-end:"/home/ubuntu/workspace/zrm-io-smartwallet/src/pages/account/account.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_rest_service__["a" /* RestService */],
            __WEBPACK_IMPORTED_MODULE_4__providers_shared__["a" /* Shared */]])
    ], AccountPage);
    return AccountPage;
}());

//# sourceMappingURL=account.js.map

/***/ }),

/***/ 215:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_rest_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__notavailable_notavailable__ = __webpack_require__(216);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// import { SplashScreen } from '@ionic-native/splash-screen';


// import { SuggestionPage } from '../suggestion/suggestion';

var ListingPage = (function () {
    // private navCtrl: NavController, 
    function ListingPage(navParams, modalCtrl, viewCtrl, restService) {
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.restService = restService;
        this.title = navParams.get('title');
        this.generals = navParams.get('generals');
        if (this.generals.length == 0) {
            this.notFoundMessageToggle = false;
        }
        else {
            this.notFoundMessageToggle = true;
        }
    }
    ListingPage.prototype.ionViewDidLoad = function () {
        console.log('Hello ListingPage Page');
    };
    ListingPage.prototype.loadIdea = function (id) {
        console.log("cargando loadIdea");
        ///////// this.http.get('${this.apiUrl2}/ideas/'+ideaId)
        /////////  .map(res => <Idea>res.json());
        // this.restService.getOneIdea(id).subscribe(data => {
        // this.idea = data;
        /////////   this.idea = res;
        // this.modalSuggestion(this.idea);
        this.modalNotavailable(this.idea);
        // });
    };
    // modalSuggestion(idea: Idea) {
    //    let modal = this.modalCtrl.create(SuggestionPage, {idea});
    //    modal.present();
    // }
    ListingPage.prototype.modalNotavailable = function (idea) {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__notavailable_notavailable__["a" /* NotavailablePage */], { idea: idea });
        modal.present();
    };
    ListingPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    ListingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-listing',template:/*ion-inline-start:"/home/ubuntu/workspace/zrm-io-smartwallet/src/pages/listing/listing.html"*/'<ion-header>\n  <ion-toolbar>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <span color="primary" showWhen="ios">Cancel</span>\n        <ion-icon name="md-close" showWhen="android,windows"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>\n      Your {{title}}\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content padding>\n  <!-- <ion-note *ngIf="notFoundMessageToggle"><h2>Sorry, nothing is found. Anyway, we know you\'re always keen in making our company great!</h2></ion-note> -->\n<ion-list>\n  <button ion-item *ngFor="let g of generals" (click)="loadIdea(g.id)">\n    <h2>{{g.description}}</h2>\n    <small>{{g.date.substr(0, 10)}}</small>\n    <small>Idea Id: {{g.id}}</small>\n  </button>\n</ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/ubuntu/workspace/zrm-io-smartwallet/src/pages/listing/listing.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_rest_service__["a" /* RestService */]])
    ], ListingPage);
    return ListingPage;
}());

//# sourceMappingURL=listing.js.map

/***/ }),

/***/ 216:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotavailablePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NotavailablePage = (function () {
    function NotavailablePage(navCtrl, navParams, modalCtrl, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.notFoundMessageToggle = true;
    }
    NotavailablePage.prototype.ionViewDidLoad = function () {
        console.log('Hello NotavailablePage Page');
    };
    NotavailablePage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    NotavailablePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-notavailable',template:/*ion-inline-start:"/home/ubuntu/workspace/zrm-io-smartwallet/src/pages/notavailable/notavailable.html"*/'<ion-header>\n  <ion-toolbar>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <span color="primary" showWhen="ios">Cancel</span>\n        <ion-icon name="md-close" showWhen="android,windows"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>\n      This option is Not Available\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  \n  <ion-item-group>\n    <ion-item-divider color="light">Information</ion-item-divider>\n    <ion-item text-wrap>\n      <ion-label stacked>Contact</ion-label>\n      <ion-label id="idErrorMsg">{{ErrorMsg}}</ion-label>\n      <ion-textarea rows="2" placeholder="Please contact with the info@zerium.org and send it the Error Code 4000"></ion-textarea>\n    </ion-item>\n    \n   </ion-item-group>\n\n</ion-content>\n'/*ion-inline-end:"/home/ubuntu/workspace/zrm-io-smartwallet/src/pages/notavailable/notavailable.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* ViewController */]])
    ], NotavailablePage);
    return NotavailablePage;
}());

//# sourceMappingURL=notavailable.js.map

/***/ }),

/***/ 217:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BalancePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// Agregado MenuController

// Agregado los 3 imports siguientes:
//import { AboutPage } from '../about/about';
//import { ContactPage } from '../contact/contact';
//import { HomePage } from '../home/home';
var BalancePage = (function () {
    // Agregado de los 3 tabs
    //tab1Root = HomePage;
    //tab2Root = AboutPage;
    //tab3Root = ContactPage;
    function BalancePage(navCtrl, menu) {
        this.navCtrl = navCtrl;
        this.menu = menu;
    }
    BalancePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-balance',template:/*ion-inline-start:"/home/ubuntu/workspace/zrm-io-smartwallet/src/pages/balance/balance.html"*/'<ion-header>\n  <ion-navbar>\n     <!-- Agregado de ion-button menuToggle --> \n    <button ion-button menuToggle right>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      Balance\n    </ion-title>\n     <!-- <ion-tabs tabsPlacement="top">\n         <ion-tab [root]="tab1Root" tabTitle="Home" tabIcon="home"></ion-tab>\n         <ion-tab [root]="tab2Root" tabTitle="About" tabIcon="information-circle"></ion-tab>\n         <ion-tab [root]="tab3Root" tabTitle="Contact" tabIcon="contacts"></ion-tab>\n      </ion-tabs> --> \n\n  </ion-navbar>\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n</ion-content>\n\n\n\n'/*ion-inline-end:"/home/ubuntu/workspace/zrm-io-smartwallet/src/pages/balance/balance.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */]])
    ], BalancePage);
    return BalancePage;
}());

//# sourceMappingURL=balance.js.map

/***/ }),

/***/ 218:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WalletPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__exchange_exchange__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__wallet_zrm_zrm__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_chart_js__ = __webpack_require__(424);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_chart_js__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

//import { AuthService } from '../../providers/auth-service/auth-service';
 // Platform, ViewController,

// import { App} from 'ionic-angular';  // Se comentó esta línea porque en un momento decía que App estaba duplicada


// import { TabsPage } from '../tabs/tabs';   Se comenta TabsPage porque no se utiliza
// import { SplashScreen } from '@ionic-native/splash-screen';  Se comenta SplashScreen porque no se utiliza

var WalletPage = (function () {
    // tab6Root = ExchangePage;
    function WalletPage(app, navCtrl, loadingCtrl, menu, 
        /* private modalCtrl: ModalController, */
        toastCtrl) {
        this.app = app;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.menu = menu;
        this.toastCtrl = toastCtrl;
        this.isLoggedIn = false;
        this.total_suma_zrm = 0;
        this.total_suma_usd = 0;
        // public authService: AuthService, 
        if (localStorage.getItem("token")) {
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
        var total_suma_zrm_aux = eth + ltc + xrp + zec + xmr + btc + doge + dash; // eth + ltc + xrp + zec + xmr + 
        total_suma_zrm_aux = (total_suma_zrm_aux / 0.3) + 100;
        this.total_suma_zrm = total_suma_zrm_aux.toFixed(2);
        var total_suma_usd_aux = zrm + eth + ltc + xrp + zec + xmr + btc + doge + dash;
        this.total_suma_usd = total_suma_usd_aux.toFixed(2);
    }
    WalletPage.prototype.ionViewDidLoad = function () {
        //var cryptodollars = [];
        //this.cryptodollars.push(zrm);
        //this.cryptodollars.push(zrm);
        //this.cryptodollars.push(zrm);
        //this.cryptodollars.push(zrm);
        //this.cryptodollars.push(zrm);
        //this.cryptodollars.push(zrm);
        this.barChart = new __WEBPACK_IMPORTED_MODULE_5_chart_js__["Chart"](this.barCanvas.nativeElement, {
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
                                beginAtZero: true
                            }
                        }]
                }
            }
        });
        this.doughnutChart = new __WEBPACK_IMPORTED_MODULE_5_chart_js__["Chart"](this.doughnutCanvas.nativeElement, {
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
        this.lineChart = new __WEBPACK_IMPORTED_MODULE_5_chart_js__["Chart"](this.lineCanvas.nativeElement, {
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
    };
    WalletPage.prototype.logout = function () {
        // this.authService.logout().then((result) => {
        // this.loading.dismiss();
        // let nav = this.app.getRootNav();  NO SE USA DENTRO DE ESTA FUNCION
        //this.nav.setRoot(LoginPage);
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
        //}, (err) => {
        //this.loading.dismiss();
        // this.presentToast(err);
        // this.navCtrl.setRoot(LoginPage);
        // });
    };
    WalletPage.prototype.showLoader = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Authenticating...'
        });
        this.loading.present();
    };
    WalletPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'bottom',
            dismissOnPageChange: true
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    WalletPage.prototype.goToLogin = function () {
        // this.nav.push(LoginPage);
        var nav = this.app.getRootNav();
        //this.nav.setRoot(LoginPage);
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
    };
    WalletPage.prototype.goToExchange = function () {
        var nav = this.app.getRootNav();
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_3__exchange_exchange__["a" /* ExchangePage */]);
        // this.app.getRootNav().push(TabsPage, ({ selectedTab: 2 }));  // ,({ selectedTab: 6 })
        // this.navCtrl.push(TabsPage, ({ selectedTab: 2 }));     // FUNCIONA PERO VA A HOME: TAB 0
        // this.menu.enable(true);
        // FUNCIONA PERO SALE SOLO CON TECLA Esc
        // let modal = this.modalCtrl.create(ExchangePage);
        // modal.present();
    };
    WalletPage.prototype.goToWalletZrm = function () {
        var nav = this.app.getRootNav();
        // this.app.getRootNav().push(ZrmPage);    // ZrmPage
        this.app.getRootNavs()[0].push(__WEBPACK_IMPORTED_MODULE_4__wallet_zrm_zrm__["a" /* ZrmPage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('barCanvas'),
        __metadata("design:type", Object)
    ], WalletPage.prototype, "barCanvas", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('doughnutCanvas'),
        __metadata("design:type", Object)
    ], WalletPage.prototype, "doughnutCanvas", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('lineCanvas'),
        __metadata("design:type", Object)
    ], WalletPage.prototype, "lineCanvas", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */])
    ], WalletPage.prototype, "nav", void 0);
    WalletPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-wallet',template:/*ion-inline-start:"/home/ubuntu/workspace/zrm-io-smartwallet/src/pages/wallet/wallet.html"*/'<!-- <head>\n    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">\n    <meta http-equiv="X-UA-Compatible" content="IE=edge">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">\n    <meta name="description" content="Robust admin is super flexible, powerful, clean &amp; modern responsive bootstrap 4 admin template with unlimited possibilities.">\n    <meta name="keywords" content="admin template, robust admin template, dashboard template, flat admin template, responsive admin template, web app">\n    <meta name="author" content="PIXINVENT">\n    <title>Success Color Page - Robust Free Bootstrap Admin Template</title>\n    <link rel="apple-touch-icon" sizes="60x60" href="../../app-assets/images/ico/apple-icon-60.png">\n    <link rel="apple-touch-icon" sizes="76x76" href="../../app-assets/images/ico/apple-icon-76.png">\n    <link rel="apple-touch-icon" sizes="120x120" href="../../app-assets/images/ico/apple-icon-120.png">\n    <link rel="apple-touch-icon" sizes="152x152" href="../../app-assets/images/ico/apple-icon-152.png">\n    <link rel="shortcut icon" type="image/x-icon" href="../../app-assets/images/ico/favicon.ico">\n    <link rel="shortcut icon" type="image/png" href="../../app-assets/images/ico/favicon-32.png">\n    <meta name="apple-mobile-web-app-capable" content="yes">\n    <meta name="apple-touch-fullscreen" content="yes">\n    <meta name="apple-mobile-web-app-status-bar-style" content="default">  -->\n    <!-- BEGIN VENDOR CSS-->\n    <!-- <link rel="stylesheet" type="text/css" href="../../app-assets/css/bootstrap.css">  -->\n    <!-- font icons-->\n    <!-- <link rel="stylesheet" type="text/css" href="../../app-assets/fonts/icomoon.css">\n    <link rel="stylesheet" type="text/css" href="../../app-assets/fonts/flag-icon-css/css/flag-icon.min.css">\n    <link rel="stylesheet" type="text/css" href="../../app-assets/vendors/css/extensions/pace.css">  -->\n    <!-- END VENDOR CSS-->\n    <!-- BEGIN ROBUST CSS-->\n    <!-- <link rel="stylesheet" type="text/css" href="../../app-assets/css/bootstrap-extended.css">\n    <link rel="stylesheet" type="text/css" href="../../app-assets/css/app.css">\n    <link rel="stylesheet" type="text/css" href="../../app-assets/css/colors.css">  -->\n    <!-- END ROBUST CSS-->\n    <!-- BEGIN Page Level CSS-->\n    <!-- <link rel="stylesheet" type="text/css" href="../../app-assets/css/core/menu/menu-types/vertical-menu.css">\n    <link rel="stylesheet" type="text/css" href="../../app-assets/css/core/menu/menu-types/vertical-overlay-menu.css"> -->\n    <!-- END Page Level CSS-->\n    <!-- BEGIN Custom CSS-->\n    <!-- <link rel="stylesheet" type="text/css" href="../../assets/css/style.css">  -->\n    <!-- END Custom CSS-->\n <!--  <style id="style-1-cropbar-clipper">/* Copyright 2014 Evernote Corporation. All rights reserved. */\n.en-markup-crop-options {\n    top: 18px !important;\n    left: 50% !important;\n    margin-left: -100px !important;\n    width: 200px !important;\n    border: 2px rgba(255,255,255,.38) solid !important;\n    border-radius: 4px !important;\n}\n\n.en-markup-crop-options div div:first-of-type {\n    margin-left: 0px !important;\n}\n</style></head>   -->\n\n<ion-header>\n  <ion-navbar color=\'navbarColorBlack\'>\n\n<ion-grid>\n    <ion-row>\n      <ion-col>    \n           <ion-title>\n              <b style="color: #d08a29; font-size: 18pt;">Wallet</b>  \n           </ion-title>\n      </ion-col>    \n      \n      <ion-col style="text-align: center">\n          <img src="app-assets/imgs/IO_logo_transparent.svg" width="219" height="126"> \n          \n          <!-- <img id="myImage" src="../assets/imgs/IO_SW_tprcy-02.svg" width="100" height="100">  -->  <!-- id="myImage"   -->\n          <!--  <img id="myImage" src="../assets/imgs/logo_small_zerium.png" width="600" height="300"> -->  <!-- logoSW_transparente.svg" height="200" width="400"  -->\n          <!--  <img id="myImage" src="../assets/imgs/logoSW.svg" width="600" height="300">  -->\n      </ion-col>\n      \n      <ion-col>   <!--  style="text-align: right" -->\n           \n      </ion-col> \n      \n      <button ion-button menuToggle right>\n              <ion-icon name="menu" color="orange"></ion-icon>\n      </button>\n      \n    </ion-row>\n  </ion-grid>\n\n\n    <!--   <img id="myImage" src="../assets/imgs/logoSW.svg" height="200" width="400">  -->\n     \n    <!-- Agregado de ion-button menuToggle --> \n    <!-- <button ion-button menuToggle right>\n      <ion-icon name="menu" color="orange"></ion-icon>\n    </button>   -->\n    \n    <!-- BOTON DE SALIR SE COMENTA PUES EL EXIT ESTA EN EL MENU VERTICAL -->\n    <!--\n    <button ion-button clear (click)="logout()">\n      <ion-icon name="log-out"></ion-icon>\n    </button>\n    -->\n    \n    <!-- \n    <ion-title>\n           <b style="color: #d08a29;">Wallet</b>  \n    </ion-title>\n    -->\n    \n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n   \n  <!-- ICONO NARANJA CON UN SIMBOLO + PARA ABRIR LINKS DE REDES SOCIALES\n  <ion-fab top right>\n    <button ion-fab color="orange" mini><ion-icon name="add"></ion-icon></button>\n    <ion-fab-list>\n      <button ion-fab><ion-icon name="logo-facebook"></ion-icon></button>\n      <button ion-fab><ion-icon name="logo-twitter"></ion-icon></button>\n      <button ion-fab><ion-icon name="logo-vimeo"></ion-icon></button>\n      <button ion-fab><ion-icon name="logo-googleplus"></ion-icon></button>\n    </ion-fab-list>\n  </ion-fab>\n  -->\n  \n  <!-- <ion-list>   -->\n  \n  <!-- SE COMENTAN LOS DOS TITULOS DE ZRM TOTAL BALANCE -->\n  \n  <!-- <div style="background-color:#fcd237"> -->\n  <!-- <ion-list-header style="background-color:#9999aa">-->\n  \n  <!-- \n  <ion-item style="background-color:#9999aa"> \n    <ion-thumbnail item-start>\n      <img src="assets/imgs/logo_small_zerium.png">\n    </ion-thumbnail>\n    <b><H1 class="text-xs-center" style="color: #d08a29;">ZRM Total Balance</H1></b>\n     <button ion-button item-end (click)="goToLogin()">Exit</button>\n  </ion-item>  \n  -->\n  \n  <!-- </ion-list-header>  -->\n  <!-- </div> -->\n  \n  <!-- ion-item color negro -->\n  <!-- \n  <ion-item style="background-color:#000000">  \n    <ion-thumbnail item-start>\n      <img src="assets/imgs/logo_small_zerium.png">\n    </ion-thumbnail>\n      <b><H1 class="text-xs-center" style="color: #d08a29;">ZRM Total Balance</H1></b>\n    <button ion-button item-end (click)="goToLogin()">Exit</button>\n  </ion-item>\n  -->\n  \n  <!-- </ion-list> --> \n  \n  \n  <!-- <ion-list>\n      \n    </ion-list>  -->\n    \n<!-- \n<div class="container-fluid">  \n<div class="row" color=\'navbarColorBlack\'>\n  <div class="col-xs-3"><img src="assets/imgs/ZRM.svg" height="50px" width="50px"></div>\n  \n  <div class="col-xs-6"><b><H1 align="center" style="color: #ffffff; font-size: 14pt;">ZRM Total Balance</H1></b> </div>\n  \n  <div class="col-xs-3"><button ion-button large color="navbarColorBlack" (click)="goToLogin()"><img id="myImage" src="assets/imgs/EXIT.svg" height="50px" width="50px"></button></div>\n</div>\n</div>\n-->  \n  <ion-list>\n  \n  <!-- </ion-list-header>  -->\n  \n  \n  <ion-item color=\'navbarColorBlack\'> \n    \n    <ion-grid>\n    <ion-row>\n      <ion-col>   <!--  style="text-align: left"  -->\n          <img src="app-assets/imgs/ZRM.svg">   <!--  height="50px" width="50px"  -->\n      </ion-col>    \n      <ion-col style="text-align: center">\n          <b><H1 align="center" style="color: #ffffff; font-size: 12pt;">Total Balance</H1></b>   <!-- style="color: #d08a29;"  --> \n      </ion-col>\n      <ion-col style="text-align: right">\n          <button ion-button large color="navbarColorBlack" (click)="goToLogin()"><img src="app-assets/imgs/EXIT.svg"></button>  <!-- id="myImage"  height="50px" width="50px" -->\n          <!-- <button ion-button right (click)="goToLogin()">Exit</button> -->\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n  \n  <!-- \n    <div>   \n          <div class="col-sm-4"><img src="assets/imgs/ZRM_logo.svg" height="35" width="35"></div>\n          <div class="col-sm-4"><b><H1 align="center" style="color: #d08a29;">ZRM Total Balance</H1></b></div>   \n          <div class="col-sm-4"><button ion-button right (click)="goToLogin()">Exit</button></div>\n    </div>\n    -->\n  </ion-item>  \n  \n  <!-- <ion-list-header style="background-color:#383838">  -->\n  <ion-item color=\'navbarColorBlack\'>     <!-- color negro de fondo   color=\'navbarColorBlack\'  -->\n  <H1 align="center" style="color: #d08a29;"><b>{{total_suma_zrm}} ZRM</b></H1>\n  <H2 align="center" style="color: #ffffff;"><b>{{total_suma_usd}} USD</b></H2>   <!-- no funciona en H1, si en b bold -->\n  </ion-item>\n  \n  <!-- <ion-list-header>  -->\n  <ion-item>  <!--  color=\'marron\'  -->\n    <H2 style="color: #000000;"><b>Cryptocurrency accounts</b></H2>   <!--   align="center" style="color: #ffffff;"  -->\n  </ion-item>\n  <!-- </ion-list-header>  -->\n  \n  <ion-item (click)="goToWalletZrm()"> \n     <img src="http://zerium-linanayail.c9users.io/app-assets/imgs/cryptos/ZRM-03.svg" height="33" width="33">&nbsp;&nbsp;<b>Zerium</b>\n      <span item-right><b>10000,00 ZRM</b></span>\n  </ion-item>\n   \n  \n  <ion-item>   <!--  style="background-color:#9999aa" -->\n  <img src="http://zerium-linanayail.c9users.io/app-assets/imgs/cryptos/ETH-03.svg" height="33" width="33"> &nbsp;&nbsp;<b>Ethereum</b>   <!-- <b style="font-size: 16px; color: #d08a29;">  -->\n  <span item-right><b>10,00 ETH</b></span>    <!-- <b style="font-size: 16px; color: #d08a29;"> -->\n  </ion-item>\n  \n  <ion-item>  <!--  style="background-color:#99999a"  -->\n  <img src="http://zerium-linanayail.c9users.io/app-assets/imgs/cryptos/LTC-03.svg" height="33" width="33">&nbsp;&nbsp;<b>Litecoin</b> <!-- <b style="font-size: 16px; color: #d08a29;">  -->\n  <span item-right><b>20,00 LTC</b></span>   <!-- <b style="font-size: 16px; color: #d08a29;"> -->\n  </ion-item>\n  \n  <ion-item> <!--  style="background-color:#4d4d4e" -->\n  <!-- <b style="font-size: 16px; color: #d08a29;"> <img src="http://zerium-linanayail.c9users.io/assets/imgs/ripple.png">&nbsp;&nbsp;Ripple</b> -->\n  <img src="http://zerium-linanayail.c9users.io/app-assets/imgs/cryptos/XRP-03.svg" height="33" width="33">&nbsp;&nbsp;<b>Ripple</b>\n  <span item-right><b>30000,00 XRP</b></span>   <!-- <b style="font-size: 16px; color: #d08a29;">  -->\n  </ion-item>\n  \n  <ion-item><img src="http://zerium-linanayail.c9users.io/app-assets/imgs/cryptos/ZEC-03.svg" height="33" width="33">&nbsp;&nbsp;<b>Zcash</b>\n  <span item-right><b>25,00 ZEC</b></span>\n  </ion-item>\n  <ion-item><img src="http://zerium-linanayail.c9users.io/app-assets/imgs/cryptos/XMR-03.svg" height="33" width="33">&nbsp;&nbsp;<b>Monero</b>\n  <span item-right><b>15,00 XMR</b></span>\n  </ion-item>\n  <ion-item><img src="http://zerium-linanayail.c9users.io/app-assets/imgs/cryptos/BTC-03.svg" height="33" width="33">&nbsp;&nbsp;<b>Bitcoin</b>\n  <span item-right><b>40,00 BTC</b></span>\n  </ion-item>\n  <ion-item><img src="http://zerium-linanayail.c9users.io/app-assets/imgs/cryptos/DOGE-03.svg" height="33" width="33">&nbsp;&nbsp;<b>Dogecoin</b>\n  <span item-right><b>120000,00 DOGE</b></span>\n  </ion-item>\n  <ion-item><img src="http://zerium-linanayail.c9users.io/app-assets/imgs/cryptos/DASH-03.svg" height="33" width="33">&nbsp;&nbsp;<b>Dash</b>\n  <span item-right><b>400,00 DASH</b></span>\n  </ion-item>\n  \n  \n   </ion-list>\n\n<!--\n\n<div class="row">\n        <div class="col-md-4">\n            <div class="card mb-1">\n                <div class="card-body collapse in">\n                    <div class="bg-success bg-lighten-1 height-50"></div>\n                    <div class="p-1">\n                        <p class="mb-0"><strong>Success Lighten 1</strong><small class="text-muted float-xs-right">#48C9A9</small></p>\n                        <p class="mb-0">.bg-success.bg-lighten-1</p>              \n                    </div>\n                </div>    \n            </div>\n            <div class="card mb-1">\n                <div class="card-body collapse in">\n                    <div class="bg-success bg-lighten-2 height-50"></div>\n                    <div class="p-1">\n                        <p class="mb-0"><strong>Success Lighten 2</strong><small class="text-muted float-xs-right">#48CFAD</small></p>\n                        <p class="mb-0">.bg-success.bg-lighten-2</p>              \n                    </div>\n                </div>    \n            </div>\n            <div class="card mb-1">\n                <div class="card-body collapse in">\n                    <div class="bg-success bg-lighten-3 height-50"></div>\n                    <div class="p-1">\n                        <p class="mb-0"><strong>Success Lighten 3</strong><small class="text-muted float-xs-right">#60D0B4</small></p>\n                        <p class="mb-0">.bg-success.bg-lighten-3</p>              \n                    </div>\n                </div>    \n            </div>\n            <div class="card mb-1">\n                <div class="card-body collapse in">\n                    <div class="bg-success bg-lighten-4 height-50"></div>\n                    <div class="p-1">\n                        <p class="mb-0"><strong>Success Lighten 4</strong><small class="text-muted float-xs-right">#97E1CE</small></p>\n                        <p class="mb-0">.bg-success.bg-lighten-4</p>              \n                    </div>\n                </div>    \n            </div>\n        </div>\n        <div class="col-md-4">\n            <div class="card mb-1">\n                <div class="card-body collapse in">\n                    <div class="bg-success bg-darken-1 height-50"></div>\n                    <div class="p-1">\n                        <p class="mb-0"><strong>Success Darken 1</strong><small class="text-muted float-xs-right">#30A487</small></p>\n                        <p class="mb-0">.bg-success.bg-darken-1</p>              \n                    </div>\n                </div>    \n            </div>\n            <div class="card mb-1">\n                <div class="card-body collapse in">\n                    <div class="bg-success bg-darken-2 height-50"></div>\n                    <div class="p-1">\n                        <p class="mb-0"><strong>Success Darken 2</strong><small class="text-muted float-xs-right">#298D74</small></p>\n                        <p class="mb-0">.bg-success.bg-darken-2</p>              \n                    </div>\n                </div>    \n            </div>\n            <div class="card mb-1">\n                <div class="card-body collapse in">\n                    <div class="bg-success bg-darken-3 height-50"></div>\n                    <div class="p-1">\n                        <p class="mb-0"><strong>Success Darken 3</strong><small class="text-muted float-xs-right">#227560</small></p>\n                        <p class="mb-0">.bg-success.bg-darken-3</p>              \n                    </div>\n                </div>    \n            </div>\n            <div class="card mb-1">\n                <div class="card-body collapse in">\n                    <div class="bg-success bg-darken-4 height-50"></div>\n                    <div class="p-1">\n                        <p class="mb-0"><strong>Success Darken 4</strong><small class="text-muted float-xs-right">#1B5D4D</small></p>\n                        <p class="mb-0">.bg-success.bg-darken-4</p>              \n                    </div>\n                </div>    \n            </div>\n        </div>\n        <div class="col-md-4">\n            <div class="card mb-1">\n                <div class="card-body collapse in">\n                    <div class="bg-success bg-accent-1 height-50"></div>\n                    <div class="p-1">\n                        <p class="mb-0"><strong>Success Accent 1</strong><small class="text-muted float-xs-right">#D8F7F0</small></p>\n                        <p class="mb-0">.bg-success.bg-accent-1</p>              \n                    </div>\n                </div>    \n            </div>\n            <div class="card mb-1">\n                <div class="card-body collapse in">\n                    <div class="bg-success bg-accent-2 height-50"></div>\n                    <div class="p-1">\n                        <p class="mb-0"><strong>Success Accent 2</strong><small class="text-muted float-xs-right">#C2EDE3</small></p>\n                        <p class="mb-0">.bg-success.bg-accent-2</p>              \n                    </div>\n                </div>    \n            </div>\n            <div class="card mb-1">\n                <div class="card-body collapse in">\n                    <div class="bg-success bg-accent-3 height-50"></div>\n                    <div class="p-1">\n                        <p class="mb-0"><strong>Success Accent 3</strong><small class="text-muted float-xs-right">#3EC3A2</small></p>\n                        <p class="mb-0">.bg-success.bg-accent-3</p>              \n                    </div>\n                </div>    \n            </div>\n            <div class="card mb-1">\n                <div class="card-body collapse in">\n                    <div class="bg-success bg-accent-4 height-50"></div>\n                    <div class="p-1">\n                        <p class="mb-0"><strong>Success Accent 4</strong><small class="text-muted float-xs-right">#298D74</small></p>\n                        <p class="mb-0">.bg-success.bg-accent-4</p>              \n                    </div>\n                </div>    \n            </div>\n        </div>\n    </div>\n-->\n    \n    <ion-card>\n      <ion-card-header>\n        Bar Chart\n      </ion-card-header>\n      <ion-card-content>\n        <canvas #barCanvas></canvas>\n      </ion-card-content>\n    </ion-card>\n \n    <ion-card>\n      <ion-card-header>\n        Doughnut Chart\n      </ion-card-header>\n      <ion-card-content>\n        <canvas #doughnutCanvas></canvas>\n      </ion-card-content>\n    </ion-card>\n \n    <ion-card>\n      <ion-card-header>\n        Line Chart\n      </ion-card-header>\n      <ion-card-content>\n        <canvas #lineCanvas></canvas>\n      </ion-card-content>\n    </ion-card>\n  \n  <ion-grid>\n    <ion-row>\n      <ion-col style="text-align: center">\n          <button ion-button color="marron" round (click)="goToExchange()">Exchange</button>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n   \n  <!-- \n  <h2>Welcome to Ionic!</h2>\n  <p>\n    This starter project comes with simple tabs-based layout for apps\n    that are going to primarily use a Tabbed UI.\n  </p>\n  <p>\n    Take a look at the <code>src/pages/</code> directory to add or change tabs,\n    update any existing page or create new pages.\n  </p>\n  -->\n  \n  <!-- Agregado de ion-button secondary menuToggle --> \n  <!-- \n  <button ion-button secondary menuToggle>Toggle Menu</button>\n  -->\n\n\n</ion-content>\n'/*ion-inline-end:"/home/ubuntu/workspace/zrm-io-smartwallet/src/pages/wallet/wallet.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ToastController */]])
    ], WalletPage);
    return WalletPage;
}());

//# sourceMappingURL=wallet.js.map

/***/ }),

/***/ 219:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ZrmPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sendcrypto_sendcrypto__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__receivecrypto_receivecrypto__ = __webpack_require__(221);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

//import { AuthService } from '../../providers/auth-service/auth-service';
 // ViewController, Platform, 
// import { TabsPage } from '../tabs/tabs';


// import { SplashScreen } from '@ionic-native/splash-screen';
// import { Chart } from 'chart.js';
var ZrmPage = (function () {
    // tab6Root = ExchangePage;
    function ZrmPage(app, navCtrl, loadingCtrl, menu, modalCtrl, toastCtrl) {
        this.app = app;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.menu = menu;
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.isLoggedIn = false;
        // public authService: AuthService, 
        if (localStorage.getItem("token")) {
            this.isLoggedIn = true;
        }
    }
    ZrmPage.prototype.ionViewDidLoad = function () {
    };
    ZrmPage.prototype.logout = function () {
        // let nav = this.app.getRootNav();
        // this.app.getRootNav().push(LoginPage);
    };
    ZrmPage.prototype.showLoader = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Loading ...'
        });
        this.loading.present();
    };
    ZrmPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'bottom',
            dismissOnPageChange: true
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    ZrmPage.prototype.goToLogin = function () {
        // let nav = this.app.getRootNav();
        // this.app.getRootNav().push(LoginPage);
    };
    ZrmPage.prototype.checkMenu = function () {
        this.menu.enable(true);
        this.menu.toggle();
    };
    ZrmPage.prototype.presentSendCryptoModal = function () {
        var sendcryptoModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__sendcrypto_sendcrypto__["a" /* SendcryptoPage */], { userId: 8675309 });
        sendcryptoModal.onDidDismiss(function (data) {
            console.log(data);
        });
        sendcryptoModal.present();
    };
    ZrmPage.prototype.presentReceiveCryptoModal = function () {
        var receivecryptoModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__receivecrypto_receivecrypto__["a" /* ReceivecryptoPage */], { userId: 8675309 });
        receivecryptoModal.onDidDismiss(function (data) {
            console.log(data);
        });
        receivecryptoModal.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('barCanvas'),
        __metadata("design:type", Object)
    ], ZrmPage.prototype, "barCanvas", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('doughnutCanvas'),
        __metadata("design:type", Object)
    ], ZrmPage.prototype, "doughnutCanvas", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('lineCanvas'),
        __metadata("design:type", Object)
    ], ZrmPage.prototype, "lineCanvas", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */])
    ], ZrmPage.prototype, "nav", void 0);
    ZrmPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-zrm',template:/*ion-inline-start:"/home/ubuntu/workspace/zrm-io-smartwallet/src/pages/wallet/zrm/zrm.html"*/'\n<ion-header>\n\n  <ion-navbar color=\'navbarColorBlack\'>\n\n<ion-grid>\n    <ion-row>\n      <ion-col>    \n           <ion-title style="text-align: left">\n              <b style="color: #d08a29; font-size: 18pt;">ZRM Wallet</b>  \n           </ion-title>\n      </ion-col>    \n      \n      <ion-col style="text-align: center">\n          <img src="app-assets/imgs/IO_logo_transparent.svg" width="219" height="126">    <!-- id="myImage"   -->\n          <!--  <img id="myImage" src="../assets/imgs/logo_small_zerium.png" width="600" height="300"> -->  <!-- logoSW_transparente.svg" height="200" width="400"  -->\n          <!--  <img id="myImage" src="../assets/imgs/logoSW.svg" width="600" height="300">  -->\n      </ion-col>\n      \n      <ion-col>   <!--  style="text-align: right" -->\n           \n      </ion-col> \n      \n      <!-- VER DE GENERAR UN ion-icon de menu CUSTOM con tamaño más grande  SE HIZO con style="zoom:1.5;" -->\n      <button color=\'navbarColorBlack\' ion-button right (click)="checkMenu()">\n              <ion-icon name="menu" style="zoom:1.5;" color="orange"></ion-icon>\n      </button>\n      \n    </ion-row>\n  </ion-grid>\n\n  \n  \n\n</ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  \n  <ion-card color=\'navbarColorBlack\'>\n  \n  <ion-card-header>\n    <img id="myImage" src="app-assets/imgs/cryptos/ZRM-03.svg" width="40" height="40"> \n  </ion-card-header>\n  \n  <ion-card-content>\n    <b><H1 align="center" style="color: #d08a29; font-size:24px">Zerium Wallet</H1></b>\n    \n  </ion-card-content>\n  \n    <ion-col style="text-align: center">\n        <b><H1 align="center" style="color: #ffffff; font-size:26px">10000,00 ZRM</H1></b>\n        <b><H1 align="center" style="color: #d08a29; font-size:24px">3000,00 USD</H1></b>   <!-- style="color: #d08a29;"  -->\n    </ion-col>\n    \n    <ion-grid>\n        <ion-row>\n          <ion-col style="text-align: center">\n              <button ion-button color="marron" round (click)="presentSendCryptoModal()">Send</button>\n              <button ion-button color="marron" round (click)="presentReceiveCryptoModal()">Receive</button>\n          </ion-col>\n        </ion-row>\n    </ion-grid>\n  \n    \n        \n</ion-card>\n\n<ion-list>\n    \n    <ion-item color=\'ffffff\'> <!--  color=\'navbarColorBlack\'  -->\n        <ion-icon name="ios-send"><p style="color: #d08a29; font-size:12px"><b>Sent</b> 2,50 ZRM&nbsp;&nbsp; (0,75 USD)&nbsp;&nbsp;Unconfirmed&nbsp;&nbsp;2 Minutes Ago </p></ion-icon>\n    </ion-item> \n\n    <ion-item color=\'ffffff\'> <!--  color=\'navbarColorBlack\'  -->\n        <ion-icon name="ios-arrow-dropdown"><p style="color: #d08a29; font-size:12px"><b>Received</b> 8,00 ZRM&nbsp;&nbsp; (2,40 USD)&nbsp;&nbsp;Unconfirmed&nbsp;&nbsp;1 Day Ago </p></ion-icon>\n    </ion-item>\n\n    <ion-item color=\'ffffff\'> <!--  color=\'navbarColorBlack\'  -->\n        <ion-icon name="ios-repeat">\n            <p style="color: #d08a29; font-size:12px"><b>Exchanged</b> 100000,00 DOGE&nbsp;&nbsp; (522,10 USD)&nbsp;&nbsp;for Zerium </p>\n            <p style="color: #d08a29; font-size:12px">Date: February 3 of 2018 at 10:21 AM EST</p>\n            <p style="color: #d08a29; font-size:12px">Exchange Details: 100000,00 DOGE for 1740,33 ZRM</p>\n            <p style="color: #d08a29; font-size:12px">Transaction ID: 0x0c0226653a867e90b277a56c27f12ec0103c6989b4f52c15e4b5160395fa6efb</p>\n        </ion-icon>\n    </ion-item>\n    \n    <ion-item color=\'ffffff\'> <!--  color=\'navbarColorBlack\'  -->\n        <ion-icon name="ios-send"><p style="color: #d08a29; font-size:12px"><b>Sent</b> 150,00 ZRM&nbsp;&nbsp; (45,00 USD)&nbsp;&nbsp;Confirmed&nbsp;&nbsp;2 Days Ago </p></ion-icon>\n    </ion-item> \n</ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"/home/ubuntu/workspace/zrm-io-smartwallet/src/pages/wallet/zrm/zrm.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ToastController */]])
    ], ZrmPage);
    return ZrmPage;
}());

//# sourceMappingURL=zrm.js.map

/***/ }),

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SendcryptoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
 //Viewchild for collapse view model
 //content for collapse view model
 //viewcontroller for collapse view model
var SendcryptoPage = (function () {
    // i: Idea;
    // suggestion: string;
    // suggestions: Suggestion[];
    function SendcryptoPage(navCtrl, actionSheetCtrl, viewCtrl, loadingCtrl, alertCtrl, modalCtrl, navParams) {
        // public shared: Shared,
        // public restService: RestService) {
        // this.gridfsUrl = this.restService.gridfsUrl;
        this.navCtrl = navCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.viewCtrl = viewCtrl;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        this.varSendTotalAmount = 0;
        this.myDate = new Date().toISOString();
        this.msgModal = '';
        this.titleModal = '';
        this.errorFlag = 'si';
        this.varSendquantitymoney = 0;
        this.auxSendAmount = '';
        this.auxSendAddress = '';
        var loading = this.loadingCtrl.create({
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
    SendcryptoPage.prototype.ionViewDidLoad = function () {
        console.log('Hello SendcryptoPage Page');
    };
    SendcryptoPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    SendcryptoPage.prototype.onChangeSendAddress = function (selectedValue) {
        this.auxSendAddress = selectedValue.value;
    };
    SendcryptoPage.prototype.onChangeSendQuantity = function (selectedValue) {
        // console.log(selectedValue.value);
        this.auxSendAmount = selectedValue.value;
        var auxSendTotalAmount = Number(selectedValue.value) + Number(0.0001);
        // console.log(auxSendTotalAmount);
        this.varSendTotalAmount = auxSendTotalAmount.toFixed(5);
        // console.log(this.varSendTotalAmount);
    };
    SendcryptoPage.prototype.goToSendFunds = function () {
        this.errorFlag == 'si';
        // console.log(this.errorFlag);
        this.validateFields();
        if (this.errorFlag == 'no') {
            // console.log(this.errorFlag);
            this.showConfirm();
        }
    };
    SendcryptoPage.prototype.validateFields = function () {
        // console.log(this.email);
        if (this.auxSendAddress == '') {
            this.titleModal = 'Error';
            this.msgModal = 'The address account field must be completed';
            this.errorFlag = 'si';
            this.showError();
        }
        else {
            this.errorFlag = 'no';
        }
        if (this.auxSendAmount == '') {
            this.titleModal = 'Error';
            this.msgModal = 'The amount to send field must be completed';
            this.errorFlag = 'si';
            this.showError();
        }
        else {
            this.errorFlag = 'no';
            if (Number(this.auxSendAmount) <= 0) {
                this.titleModal = 'Error';
                this.msgModal = 'The amount to send field must be greater than 0';
                this.errorFlag = 'si';
                this.showError();
            }
            else {
                this.errorFlag = 'no';
            }
        }
    };
    SendcryptoPage.prototype.showError = function () {
        var error = this.alertCtrl.create({
            title: this.titleModal,
            message: this.msgModal,
            buttons: [
                {
                    text: 'OK',
                    handler: function () {
                        console.log('OK clicked');
                    }
                }
            ]
        });
        error.present();
    };
    SendcryptoPage.prototype.showConfirm = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Do you want to send this funds ?',
            message: 'Please remember this operation is not reversable !',
            buttons: [
                {
                    text: 'OK',
                    handler: function () {
                        console.log('OK clicked');
                    }
                },
                {
                    text: 'Cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                        // dismiss();
                        _this.viewCtrl.dismiss();
                    }
                }
            ]
        });
        confirm.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
    ], SendcryptoPage.prototype, "content", void 0);
    SendcryptoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-sendcrypto',template:/*ion-inline-start:"/home/ubuntu/workspace/zrm-io-smartwallet/src/pages/wallet/sendcrypto/sendcrypto.html"*/'<ion-header>\n  <ion-toolbar color=\'navbarColorBlack\'>\n    <ion-title>\n      \n      <b style="color: #d08a29; font-size: 18pt;">Send Crypto</b> \n      \n    </ion-title>\n    <ion-buttons start>\n      <button ion-button color="marron" (click)="dismiss()">\n        <span color="marron" showWhen="ios">Cancel</span>\n        <ion-icon name="md-close" showWhen="android,windows"></ion-icon>  \n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content padding overflow-scroll="true">\n  <ion-card>\n    <ion-item>\n      <ion-avatar item-left>\n        <img src="app-assets/imgs/ZRM.svg" height="50px" width="50px">\n      </ion-avatar>\n       \n              <h2 style="text-align: left">Send Crypto</h2>\n              <h3 style="text-align: right">Balance ZRM</h3>\n              \n      <ion-badge item-right color="marron">10000,00 ZRM</ion-badge>\n      <!-- <small style="text-align: right">Date: 15/02/2018</small>  -->\n    </ion-item>\n\n    <ion-card-content>\n      \n      <img src="app-assets/imgs/ZRM.svg" height="50px" width="50px">\n      <!-- <img style="object-fit:cover; width: 60%; margin: auto; display:block" src="assets/imgs/ZRM.svg" height="50px" width="50px"> -->\n      \n      <a ion-item text-center href="https://ethstats.net/"\n          target="_blank">\n        <ion-icon name="cloud-download"></ion-icon> Check ZRM Network Status</a>\n    </ion-card-content>\n  </ion-card> \n  \n\n  <ion-list>\n        \n        <ion-item> \n             <ion-label color=\'marron\'><b>Date</b></ion-label>\n             <ion-datetime displayFormat="MM/DD/YYYY" [(ngModel)]="myDate" style="font-size: 14px;"></ion-datetime>\n        </ion-item>  \n        \n        <ion-item> \n            <ion-label color=\'marron\'><b>To Address</b></ion-label>   \n            <ion-input id="idSendAddress" type="text" placeholder="Input Address To Send Crypto Money" (ionChange)="onChangeSendAddress($event)"></ion-input>\n        </ion-item>\n        \n        <ion-label class="selectable" center text-center><b>Example: MKtAmArcrJ3NCjADNZ8g6CyWXPqNBnMNxv</b></ion-label>\n        \n  <ion-grid style="background-color:#ffffff">     \n    <ion-row>\n      <ion-col width-33 center text-center>   <!--  style="text-align: left"  -->\n            <ion-label color=\'marron\'><b>Amount</b></ion-label>   \n            \n\n      </ion-col>  \n      \n      <ion-col width-33 center text-center> \n             <ion-input id="idSendquantitymoney" type="number" step="0.01" placeholder="Input quantity" (ionChange)="onChangeSendQuantity($event)">{{varSendquantitymoney}}</ion-input>\n      </ion-col>  \n      \n      <ion-col width-33 center text-center>\n          <ion-label color=\'marron\' id="idSendSelectTicker"><b>ZRM</b></ion-label>   \n          \n      </ion-col>\n    </ion-row>\n</ion-grid>   \n  \n<ion-grid style="background-color:#ffffff">     \n    <ion-row>\n      <ion-col width-33 center text-center>   <!--  style="text-align: left"  -->\n            <ion-label color=\'marron\'><b>Network Fee</b></ion-label>   \n            \n      </ion-col>  \n      \n      <ion-col width-33 center text-center> \n             <ion-label>0.0001</ion-label>   \n      </ion-col>  \n      \n      <ion-col width-33 center text-center>\n          <ion-label color=\'marron\' id="idFeeSendSelectTicker"><b>ZRM</b></ion-label>   \n          \n      </ion-col>\n    </ion-row>\n</ion-grid>   \n            \n<ion-grid style="background-color:#ffffff">     \n    <ion-row>\n      <ion-col width-33 center text-center>   <!--  style="text-align: left"  -->\n            <ion-label color=\'marron\'><b>Total Amount</b></ion-label>   \n            \n      </ion-col>  \n      \n      <ion-col width-33 center text-center> \n             <ion-label id="idTotalSendMoney" type="number">{{varSendTotalAmount}}</ion-label>      <!-- se calcula con el evento de ionChange al ingresar un digito -->\n      </ion-col>  \n      \n      <ion-col width-33 center text-center>\n          <ion-label color=\'marron\' id="idTotalSendSelectTicker"><b>ZRM</b></ion-label>   \n          \n      </ion-col>\n    </ion-row>\n</ion-grid>   \n            \n            \n  </ion-list>\n \n  <ion-row>\n          <ion-col style="text-align: center">\n              <button ion-button color="marron" round (click)="goToSendFunds()">Send Funds</button>\n          </ion-col>\n  </ion-row>\n  \n  <!-- Boton de Calculadora - Abajo a la Derecha \n  <ion-fab bottom right>\n    <button ion-fab mini (click)="modalCalculate()"><ion-icon name="calculator"></ion-icon></button>\n  </ion-fab>  -->\n  \n</ion-content>\n\n<!-- <ion-footer>\n  \n      <ion-item text-wrap *ngIf="CalculateVisibility">\n    <ion-textarea rows="3" type="text" [(ngModel)]="suggestion" placeholder="Type your suggestion here"></ion-textarea>\n    <ion-buttons item-right>\n      <button ion-button (click)="post()">Send</button>\n    </ion-buttons>\n  </ion-item>\n\n</ion-footer>  -->\n'/*ion-inline-end:"/home/ubuntu/workspace/zrm-io-smartwallet/src/pages/wallet/sendcrypto/sendcrypto.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], SendcryptoPage);
    return SendcryptoPage;
}());

//# sourceMappingURL=sendcrypto.js.map

/***/ }),

/***/ 221:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReceivecryptoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
 //Viewchild for collapse view model
 //content for collapse view model
 //viewcontroller for collapse view model
 // , FormBuilder, Validators
// import { CalculatePage } from '../calculate/calculate';
// import { Idea } from '../../models/idea';
// import { RestService } from '../../providers/rest-service';
// import { ActionPage } from '../action/action';
var ReceivecryptoPage = (function () {
    // i: Idea;
    // suggestion: string;
    // suggestions: Suggestion[];
    function ReceivecryptoPage(navCtrl, actionSheetCtrl, viewCtrl, loadingCtrl, popoverCtrl, alertCtrl, modalCtrl, navParams) {
        // public shared: Shared,
        // public restService: RestService) {
        // this.gridfsUrl = this.restService.gridfsUrl;
        this.navCtrl = navCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.viewCtrl = viewCtrl;
        this.loadingCtrl = loadingCtrl;
        this.popoverCtrl = popoverCtrl;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        this.receiveForm = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormGroup */]({
            email: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]()
        });
        this.varSendTotalAmount = 0;
        this.myDate = new Date().toISOString();
        this.currDate = new Date().toISOString().slice(0, 10);
        this.varAddressReceive = '';
        this.msgModal = '';
        this.titleModal = '';
        this.email = '';
        this.errorFlag = 'si';
        this.receiveQuantity = '';
        this.varReceiveSelectUSD = 0;
        this.varNote = '';
        var loading = this.loadingCtrl.create({
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
    ReceivecryptoPage.prototype.ionViewDidLoad = function () {
        console.log('Hello ReceivecryptoPage Page');
        // console.log(this.currDate);
        var year = this.currDate.slice(0, 4);
        var month = this.currDate.slice(5, 7);
        var day = this.currDate.slice(8, 10);
        this.currDate = month + "/" + day + "/" + year;
        // console.log(this.currDate);
        // this.emailRegx = this.validator.emailRegx;    validator no está funcionando
        // this.receiveForm = this.formBuilder.group({
        //		 	email: ['', Validators.compose([Validators.required, this.validator.emailValidator.bind(this)])]
        //		}, {'validator': this.validator.isMatching});  
    };
    ReceivecryptoPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    ReceivecryptoPage.prototype.onChangeReceiveQuantity = function (selectedValue) {
        // console.log(selectedValue.value);
        this.receiveQuantity = selectedValue.value;
        var auxReceiveSelectUSD = Number(selectedValue.value) * Number(0.3);
        // console.log(auxReceiveSelectUSD);
        this.varReceiveSelectUSD = auxReceiveSelectUSD.toFixed(2);
        // console.log(this.varReceiveSelectUSD);
    };
    ReceivecryptoPage.prototype.goToReceiveFunds = function () {
        this.errorFlag == 'si';
        // console.log(this.errorFlag);
        this.validateFields();
        if (this.errorFlag == 'no') {
            // console.log(this.errorFlag);
            this.showConfirm();
        }
    };
    ReceivecryptoPage.prototype.validateFields = function () {
        // console.log(this.email);
        if (this.email == '') {
            this.titleModal = 'Error';
            this.msgModal = 'The email field must be completed';
            this.errorFlag = 'si';
            this.showError();
        }
        else {
            this.errorFlag = 'no';
            if (this.varAddressReceive == '') {
                this.titleModal = 'Error';
                this.msgModal = 'The address account field must be completed';
                this.errorFlag = 'si';
                this.showError();
            }
            else {
                this.errorFlag = 'no';
                if (this.receiveQuantity == '') {
                    this.titleModal = 'Error';
                    this.msgModal = 'The amount to receive field must be completed';
                    this.errorFlag = 'si';
                    this.showError();
                }
                else {
                    this.errorFlag = 'no';
                    if (this.varReceiveSelectUSD <= 0) {
                        this.titleModal = 'Error';
                        this.msgModal = 'The amount to receive field must be greater than 0';
                        this.errorFlag = 'si';
                        this.showError();
                    }
                    else {
                        this.errorFlag = 'no';
                    }
                }
            }
        }
    };
    ReceivecryptoPage.prototype.showError = function () {
        var error = this.alertCtrl.create({
            title: this.titleModal,
            message: this.msgModal,
            buttons: [
                {
                    text: 'OK',
                    handler: function () {
                        console.log('OK clicked');
                    }
                }
            ]
        });
        error.present();
    };
    ReceivecryptoPage.prototype.showConfirm = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Do you want to receive this funds ?',
            message: 'Please remember this operation is not automatic. The recipient should send the funds',
            buttons: [
                {
                    text: 'OK',
                    handler: function () {
                        console.log('OK clicked');
                    }
                },
                {
                    text: 'Cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                        // dismiss();
                        _this.viewCtrl.dismiss();
                    }
                }
            ]
        });
        confirm.present();
    };
    ReceivecryptoPage.prototype.onSelectAddressReceive = function (selectedValue) {
        // console.log(selectedValue.value);
        // Address donde recibirá los fondos
        this.varAddressReceive = selectedValue;
    };
    ReceivecryptoPage.prototype.onChangeNote = function (selectedValue) {
        this.varNote = selectedValue.value;
        // console.log(this.varNote);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
    ], ReceivecryptoPage.prototype, "content", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('dateTime'),
        __metadata("design:type", Object)
    ], ReceivecryptoPage.prototype, "dateTime", void 0);
    ReceivecryptoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-receivecrypto',template:/*ion-inline-start:"/home/ubuntu/workspace/zrm-io-smartwallet/src/pages/wallet/receivecrypto/receivecrypto.html"*/'<ion-header>\n  <ion-toolbar color=\'navbarColorBlack\'>\n    <ion-title>\n      \n      <b style="color: #d08a29; font-size: 18pt;">Receive Crypto</b> \n      \n    </ion-title>\n    <ion-buttons start>\n      <button ion-button color="marron" (click)="dismiss()">\n        <span color="marron" showWhen="ios">Cancel</span>\n        <ion-icon name="md-close" showWhen="android,windows"></ion-icon>  \n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content padding overflow-scroll="true">\n  <ion-card>\n    <ion-item>\n      <ion-avatar item-left>\n        <img src="app-assets/imgs/ZRM.svg" height="50px" width="50px">\n      </ion-avatar>\n       \n              <h3 style="text-align: left">Receive Crypto</h3>\n              <h3 style="text-align: right">Balance ZRM</h3>\n              \n      <ion-badge item-right color="marron">10000,00 ZRM</ion-badge>\n     \n      </ion-item>\n      \n      <!-- <small style="text-align: right">Date: 15/02/2018</small>  -->\n    \n    <ion-card-content>\n      \n      <img src="app-assets/imgs/ZRM.svg" height="50px" width="50px">\n      <!-- <img style="object-fit:cover; width: 60%; margin: auto; display:block" src="assets/imgs/ZRM.svg" height="50px" width="50px"> -->\n      \n    </ion-card-content>\n  </ion-card> \n  \n \n    \n  <ion-list>\n     <!-- <form [formGroup]="receiveForm" (ngSubmit)="goToReceiveFunds()"> -->\n         <ion-item> \n             <ion-label color=\'marron\'><b>Receive Money From</b></ion-label>\n         </ion-item>\n         \n         <ion-item> \n           \n           <ion-icon name="mail" item-start color=\'marron\'></ion-icon> \n           <ion-input type="email"  placeholder="Email" [(ngModel)]="email"></ion-input>   <!-- formControlName="email"  -->\n        </ion-item>\n     \n     <!-- </form>  -->\n         \n   \n        <ion-grid style="background-color:#ffffff">          \n              <ion-row>\n                    <ion-col width-50 center text-center>    \n                            <ion-label color=\'marron\'><b>Date</b></ion-label>  \n                    </ion-col>    \n                    <ion-col width-50 center text-center>    \n                            <ion-label style="font-size: 14px;">{{currDate}}</ion-label>\n                    </ion-col>     \n              </ion-row>    \n    \n   \n        </ion-grid>\n   \n        <!-- <ion-item> \n            <ion-label color=\'marron\'><b>Receive To</b></ion-label>   \n            <ion-input id="idReceiveAddress" type="text" placeholder="Input Address"></ion-input>\n        </ion-item>  -->\n        \n       \n        <ion-item>\n                \n                <ion-label color=\'marron\'><b>Receive into My Wallet</b></ion-label> \n                <ion-select interface="popover" (ionChange)="onSelectAddressReceive($event)">\n                   \n                    <ion-option>0xf87bb921423ccbc6668002c7ed0c99bfd1fa86da</ion-option>\n                    <ion-option>0x009DdADE199f74fC633C5C279a90e9f6E54982d4</ion-option>\n                    <!-- <p>{{varAddressReceive}}</p>  -->\n                </ion-select>\n                \n                 \n        </ion-item>\n        \n        <ion-item>\n          <p>{{varAddressReceive}}</p>\n        </ion-item>\n       \n    \n    <!-- <ion-item class="no-line error" *ngIf="!registerForm.controls.email.valid  && (registerForm.controls.email.dirty || submitAttempt) && !registerForm.controls.email.pending">\n        <p *ngIf="registerForm.value.email != \'\'">Email not valid</p>\n        <p *ngIf="registerForm.value.email == \'\'">Email required</p>\n    </ion-item> -->\n    \n    \n  <ion-grid style="background-color:#ffffff">     \n    <ion-row>\n      <ion-col width-33 center text-center>   <!--  style="text-align: left"  -->\n            <ion-label color=\'marron\'><b>Amount</b></ion-label>   \n            \n\n      </ion-col>  \n      \n      <ion-col width-33 center text-center> \n             <ion-input id="idReceivequantitymoney" type="number" step="0.01" placeholder="Input quantity" (ionChange)="onChangeReceiveQuantity($event)">{{varSendquantitymoney}}</ion-input>\n      </ion-col>  \n      \n      <ion-col width-33 center text-center>\n          <ion-label color=\'marron\' id="idReceiveSelectTicker"><b>ZRM</b></ion-label>   \n          <ion-label color=\'marron\' id="idReceiveSelectUSD"><b>{{varReceiveSelectUSD}} USD</b></ion-label>  \n      </ion-col>\n    </ion-row>\n</ion-grid>   \n\n<ion-grid style="background-color:#ffffff">     \n    <ion-row>\n      <ion-col>   \n            <ion-label color=\'marron\'><b>Note</b></ion-label>   \n      </ion-col>  \n      \n      <ion-col width-50 center text-center> \n             <ion-input type="text" placeholder="Note is optional field" (ionChange)="onChangeNote($event)"></ion-input>\n      </ion-col>  \n      \n    </ion-row>\n</ion-grid>   \n\n   \n  </ion-list>\n \n  <ion-row>\n          <ion-col style="text-align: center">\n              <button ion-button color="marron" round (click)="goToReceiveFunds()">Receive Funds</button>\n          </ion-col>\n  </ion-row>\n  \n  <!-- Boton de Calculadora - Abajo a la Derecha \n  <ion-fab bottom right>\n    <button ion-fab mini (click)="modalCalculate()"><ion-icon name="calculator"></ion-icon></button>\n  </ion-fab>  -->\n  \n</ion-content>\n\n<!-- <ion-footer>\n  \n      <ion-item text-wrap *ngIf="CalculateVisibility">\n    <ion-textarea rows="3" type="text" [(ngModel)]="suggestion" placeholder="Type your suggestion here"></ion-textarea>\n    <ion-buttons item-right>\n      <button ion-button (click)="post()">Send</button>\n    </ion-buttons>\n  </ion-item>\n\n</ion-footer>  -->\n'/*ion-inline-end:"/home/ubuntu/workspace/zrm-io-smartwallet/src/pages/wallet/receivecrypto/receivecrypto.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* PopoverController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], ReceivecryptoPage);
    return ReceivecryptoPage;
}());

//# sourceMappingURL=receivecrypto.js.map

/***/ }),

/***/ 24:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Shared; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__rest_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var Shared = (function () {
    function Shared(http, toastCtrl, restService) {
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.restService = restService;
        this.AreaSet = [];
        console.log('Hello Shared Provider');
        this.AreaSet = [
            { id: 'pl', value: 'Production-LCMS' },
            { id: 'aa', value: 'AAS' },
            { id: 'ar', value: 'ARES' },
            { id: 'bp', value: 'Button Up' },
            { id: 'ct', value: 'ChemTest' },
            { id: 'eo', value: 'EMOD' },
            { id: 'es', value: 'ESS' },
            { id: 'el', value: 'Engineering-LCMS' },
            { id: 'fa', value: 'Final Assembly' },
            { id: 'gc', value: 'GFM/CDS' },
            { id: 'io', value: 'Ion Optics' },
            { id: 'if', value: 'Ion Funnel' },
            { id: 'lo', value: 'Logistics' },
            { id: 'ms', value: 'Mass Filter' },
            { id: 'me', value: 'Material Engineering' },
            { id: 'md', value: 'Medusa/DEI' },
            { id: 'mt', value: 'Mirrors/Pulsers/Towers' },
            { id: 'nc', value: 'NCM' },
            { id: 'np', value: 'NPI' },
            { id: 'pc', value: 'Procurement' },
            { id: 'qd', value: 'Quad Driver' },
            { id: 'qq', value: 'Quality' },
            { id: 'rd', value: 'R&D' },
            { id: 'sf', value: 'SFC' },
            { id: 'sc', value: 'Scanner' },
            { id: 'sd', value: 'Source/Desolvation' },
            { id: 'tp', value: 'TIS/Planning' },
            { id: 'tr', value: 'Training' },
            { id: 'ot', value: 'Others' }
        ];
        this.userId = "";
        this.username = "Anonymous";
        this.fullname = "Anonymous";
        this.avatarId = "";
        this.ideaNo = 0;
        this.actionNo = 0;
    }
    Shared.prototype.toast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000
        });
        toast.present();
    };
    Shared.prototype.getToday = function () {
        var utc = new Date().toJSON().slice(0, 10);
        return utc;
    };
    Shared.prototype.getTomorrow = function () {
        var d = new Date();
        d.setDate(d.getDate() + 1);
        var utc = d.toJSON().slice(0, 10);
        return utc;
    };
    Shared = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["q" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_3__rest_service__["a" /* RestService */]])
    ], Shared);
    return Shared;
}());

//# sourceMappingURL=shared.js.map

/***/ }),

/***/ 342:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
 // , ViewChild 
// import { SplashScreen } from '@ionic-native/splash-screen';
// import { Content } from 'ionic-angular';
// import { NavController, ViewController, ModalController } from 'ionic-angular';
// import { RestService } from '../../providers/rest-service';
// import { Shared } from '../../providers/shared';
// import { Idea } from '../../models/idea';
// import { Suggestion } from '../../models/suggestion';
// import { Action } from '../../models/action';
// import { SuggestionPage } from '../suggestion/suggestion';
var TestPage = (function () {
    function TestPage() {
    }
    TestPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-test',template:/*ion-inline-start:"/home/ubuntu/workspace/zrm-io-smartwallet/src/pages/test/test.html"*/'<ion-header>\n  <ion-navbar color=\'navbarColorBlack\'>\n\n<ion-grid>\n    <ion-row>\n      <ion-col>    \n           <ion-title>\n              <b style="color: #d08a29; font-size:20pt;">Test</b>  \n           </ion-title>\n      </ion-col>    \n      \n      <ion-col style="text-align: center">\n          <img id="myImage" src="../assets/imgs/IO_logo_transparent.svg" width="219" height="126">   <!-- id="myImage"   -->\n          <!--  <img id="myImage" src="../assets/imgs/logo_small_zerium.png" width="600" height="300"> -->  <!-- logoSW_transparente.svg" height="200" width="400"  -->\n          <!--  <img id="myImage" src="../assets/imgs/logoSW.svg" width="600" height="300">  -->\n      </ion-col>\n      \n      <ion-col>   <!--  style="text-align: right" -->\n           \n      </ion-col> \n      \n      <button ion-button menuToggle right>\n              <ion-icon name="menu" color="orange"></ion-icon>\n      </button>\n      \n    </ion-row>\n  </ion-grid>\n\n\n  </ion-navbar>\n</ion-header>\n\n<ion-content color="navbarColorBlack">\n  \n \n  <ion-item color="navbarColorBlack">\n   <ion-grid color="navbarColorBlack">\n    <ion-row>\n      <ion-col>   <!--  style="text-align: left"  -->\n          <img src="assets/imgs/ZRM.svg" height="50px" width="50px">\n      </ion-col>    \n      <ion-col>\n          <b><H1 align="center">Test</H1></b>   <!-- style="color: #d08a29;"    style="color: #ffffff;"  -->\n      </ion-col>\n      <ion-col style="text-align: right">\n         <!--  <img src="assets/imgs/ZRM_logo.svg" height="40" width="40" style="background-color: #000000; color: #000000;">\n          <button color="navbarColorBlack" (click)="goToLogin()"></button>  -->\n       \n       <button ion-button large color="navbarColorBlack" (click)="goToLogin()">\n       <img src="assets/imgs/EXIT.svg" height="50px" width="50px">\n  <!-- <ion-icon name="iconZRMLogo"></ion-icon> -->   <!-- icon-end full="false" -->\n</button>\n\n      <!--     <a href="goToLogin()">\n            <img src="assets/imgs/ZRM_logo.svg" height="40" width="40" style="background-color: #000000; color: #000000;">\n            </a>   --->\n            \n          <!-- EXIT_yellowFill-01.svg  -->\n          <!-- <button ion-button right (click)="goToLogin()">Exit</button> -->\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n  </ion-item>\n  \n  </ion-content>\n'/*ion-inline-end:"/home/ubuntu/workspace/zrm-io-smartwallet/src/pages/test/test.html"*/
        })
    ], TestPage);
    return TestPage;
}());

//# sourceMappingURL=test.js.map

/***/ }),

/***/ 343:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PostPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_shared__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_rest_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tabs_tabs__ = __webpack_require__(39);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





// import { MyApp } from './app.component';
// import { App } from ‘ionic-angular’;
// import { IonicApp } from ‘ionic-angular’;
var PostPage = (function () {
    function PostPage(navCtrl, viewCtrl, loadingCtrl, alertCtrl, shared, restService, navParams) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.shared = shared;
        this.restService = restService;
        this.navParams = navParams;
        this.areas = [];
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
    PostPage.prototype.ionViewDidLoad = function () {
        console.log('Hello PostPage Page');
    };
    PostPage.prototype.addFile = function () {
        this.fi = this.fileInput.nativeElement;
        this.filename = this.fi.files[0].name;
        this.mediaType = this.filename.substr(this.filename.lastIndexOf(".")).toLowerCase();
        this.fileExist = (this.fi.files && this.fi.files[0]);
    };
    PostPage.prototype.updateIdeaNo = function () {
        var _this = this;
        this.shared.ideaNo++;
        this.restService.updateUser(this.shared.userId, this.shared.fullname, this.shared.avatarId, this.shared.ideaNo, this.shared.actionNo)
            .subscribe(function (res) {
            console.log(_this.shared.ideaNo);
        }, function (err) {
            console.log(err);
            // ARTILUGIO PARA QUE NO SE DESHABILITE EL MENU DE IONIC
            // this.loading.dismiss();
            //this.navCtrl.insert(0,TabsPage);
            //this.navCtrl.popToRoot();
        });
    };
    PostPage.prototype.postSuggestion = function (ideaId) {
        var _this = this;
        this.restService.postSuggestion(ideaId, this.shared.username, this.shared.fullname, this.latestSuggestion, "20180131")
            .subscribe(function (data) {
        }, function (err) {
            var alert = _this.alertCtrl.create({
                title: 'Sending suggestion failed',
                message: err,
                buttons: ['Try again']
            });
            alert.present();
        });
    };
    PostPage.prototype.post = function () {
        var _this = this;
        // this.area = "100";
        // &&(this.area.trim().length>0)
        if ((this.description.trim().length > 0)
            && (this.latestSuggestion.trim().length > 0)) {
            var loading_1 = this.loadingCtrl.create({
                content: "Your idea is going live :)"
            });
            loading_1.present();
            if (this.fileExist) {
                var fileToUpload = this.fi.files[0];
                this.restService
                    .uploadFile(fileToUpload)
                    .subscribe(function (res) {
                    _this.mediaId = res.json();
                    _this.ideaOwnerAvatar = "https://thebitcoinpub-91d3.kxcdn.com/uploads/default/original/2X/1/1039a4208686b9d06d6d58f89a6aef05a8b7d513.jpg";
                    _this.restService.postIdea(_this.ideaOwner, _this.ideaOwnerFullname, _this.ideaOwnerAvatar, _this.description, res.json(), _this.mediaType, _this.area, _this.status, _this.likes, _this.likesString, _this.suggestionsNo, _this.latestSuggestionOwner, _this.latestSuggestionOwnerFullname, _this.latestSuggestion)
                        .subscribe(function (data) {
                        console.log(data);
                        _this.postSuggestion(data.id);
                        // this.updateIdeaNo();   POR EL MOMENTO NO ACTUALIZAR
                        _this.shared.toast('Idea uploaded');
                        // loading.dismiss();
                        // this.navCtrl.setRoot(TabsPage);
                        // this.IonicApp.getActiveNav().setRoot(LoginPage);
                        //////////////////// this.navCtrl.push(TabsPage);
                        /// this.viewCtrl.dismiss();            // DESHABILITA EL MENU 
                        /// this.navCtrl.setRoot(LoginPage);    // ENVIA A PAGINA DE LOGIN
                        // ARTILUGIO PARA QUE NO SE DESHABILITE EL MENU DE IONIC
                        // loading.dismiss();
                        _this.navCtrl.popToRoot();
                        _this.navCtrl.insert(0, __WEBPACK_IMPORTED_MODULE_4__tabs_tabs__["a" /* TabsPage */]);
                        /// this.navCtrl.setRoot(TabsPage).then(() =>{
                        ///      this.navCtrl.popToRoot();
                        ///      //....
                        /// }); 
                    }, function (err) {
                        loading_1.dismiss();
                        var alert = _this.alertCtrl.create({
                            title: 'Sending idea failed',
                            message: err,
                            buttons: ['Try again']
                        });
                        alert.present();
                    });
                }, function (err) {
                    loading_1.dismiss();
                    var alert = _this.alertCtrl.create({
                        title: 'Sending idea failed',
                        message: err,
                        buttons: ['Try again']
                    });
                    alert.present();
                });
            }
            else {
                this.restService.postIdea(this.ideaOwner, this.ideaOwnerFullname, this.ideaOwnerAvatar, this.description, this.mediaId, this.mediaType, this.area, this.status, this.likes, this.likesString, this.suggestionsNo, this.latestSuggestionOwner, this.latestSuggestionOwnerFullname, this.latestSuggestion)
                    .subscribe(function (data) {
                    _this.postSuggestion(data.id);
                    // this.updateIdeaNo();             POR EL MOMENTO NO ACTUALIZAR
                    _this.shared.toast('Idea sent!');
                    // ARTILUGIO PARA QUE NO SE DESHABILITE EL MENU DE IONIC
                    //loading.dismiss();
                    _this.navCtrl.popToRoot();
                    _this.navCtrl.insert(0, __WEBPACK_IMPORTED_MODULE_4__tabs_tabs__["a" /* TabsPage */]);
                    // SE REEMPLAZARON LAS DOS LINEAS SIGUIENTES POR EL ARTILUGIO    
                    // loading.dismiss();
                    // this.navCtrl.setRoot(TabsPage);
                }, function (err) {
                    loading_1.dismiss();
                    var alert = _this.alertCtrl.create({
                        title: 'Sending idea failed',
                        message: err,
                        buttons: ['Try again']
                    });
                    alert.present();
                });
            }
        }
        else {
            var alert_1 = this.alertCtrl.create({
                title: 'Oops!',
                message: 'Forgot to write your brilliance idea?',
                buttons: ['Try again']
            });
            alert_1.present();
        }
    };
    PostPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])("fileInput"),
        __metadata("design:type", Object)
    ], PostPage.prototype, "fileInput", void 0);
    PostPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-post',template:/*ion-inline-start:"/home/ubuntu/workspace/zrm-io-smartwallet/src/pages/post/post.html"*/'<!--\n  Generated template for the Post page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-toolbar>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <span color="primary" showWhen="ios">Cancel</span>\n        <ion-icon name="md-close" showWhen="android,windows"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>\n      New Idea\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n\n<ion-content padding>\n  <ion-textarea rows="10" placeholder="What\'s on your mind?" [(ngModel)]="description"></ion-textarea>\n      <ion-item>\n          <ion-label>Area</ion-label>\n          <ion-select [(ngModel)]="area">\n        <ion-option *ngFor="let a of areas" [value]="a.value">{{a.value}}</ion-option>\n      </ion-select>\n      </ion-item>\n\n  <ion-textarea rows="10" placeholder="What do you suggest?" [(ngModel)]="latestSuggestion"></ion-textarea>\n</ion-content>\n\n<ion-footer padding>\n  <div>\n    <input type="file" #fileInput (change)="addFile()"/>\n  </div>\n  <small>Supported filetype: image, video, audio, powerpoint, pdf etc</small>\n  <ion-fab right bottom>\n  <button ion-fab (click)="post()"><ion-icon name="send"></ion-icon></button>\n  </ion-fab>\n</ion-footer>\n'/*ion-inline-end:"/home/ubuntu/workspace/zrm-io-smartwallet/src/pages/post/post.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_shared__["a" /* Shared */],
            __WEBPACK_IMPORTED_MODULE_3__providers_rest_service__["a" /* RestService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], PostPage);
    return PostPage;
}());

//# sourceMappingURL=post.js.map

/***/ }),

/***/ 344:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(368);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(410);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(414);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(472);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_post_post__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_search_search__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_account_account__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_tabs_tabs__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_login_login__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_listing_listing__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_shared__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_rest_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_calculate_calculate__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_review_review__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_suggestion_suggestion__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_action_action__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_welcome_welcome__ = __webpack_require__(473);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_notavailable_notavailable__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_balance_balance__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_exchange_exchange__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_wallet_wallet__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_wallet_zrm_zrm__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_test_test__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_wallet_sendcrypto_sendcrypto__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_wallet_receivecrypto_receivecrypto__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ionic_native_status_bar__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__ionic_native_splash_screen__ = __webpack_require__(208);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





// import { Storage } from '@ionic/storage';

























var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_post_post__["a" /* PostPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_search_search__["a" /* SearchPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_account_account__["a" /* AccountPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_calculate_calculate__["a" /* CalculatePage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_review_review__["a" /* ReviewPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_suggestion_suggestion__["a" /* SuggestionPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_action_action__["a" /* ActionPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_listing_listing__["a" /* ListingPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_notavailable_notavailable__["a" /* NotavailablePage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_wallet_wallet__["a" /* WalletPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_balance_balance__["a" /* BalancePage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_exchange_exchange__["a" /* ExchangePage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_wallet_zrm_zrm__["a" /* ZrmPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_test_test__["a" /* TestPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_wallet_sendcrypto_sendcrypto__["a" /* SendcryptoPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_wallet_receivecrypto_receivecrypto__["a" /* ReceivecryptoPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_welcome_welcome__["a" /* WelcomePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {
                    tabsPlacement: 'top',
                    platforms: {
                        android: {
                            tabsPlacement: 'bottom'
                        },
                        ios: {
                            tabsPlacement: 'bottom'
                        },
                        windows: {
                            tabsPlacement: 'top'
                        }
                    }
                }, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_post_post__["a" /* PostPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_search_search__["a" /* SearchPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_account_account__["a" /* AccountPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_login_login__["a" /* LoginPage */],
                //CalculatePage,
                //ReviewPage,
                __WEBPACK_IMPORTED_MODULE_17__pages_suggestion_suggestion__["a" /* SuggestionPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_action_action__["a" /* ActionPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_listing_listing__["a" /* ListingPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_notavailable_notavailable__["a" /* NotavailablePage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_wallet_wallet__["a" /* WalletPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_balance_balance__["a" /* BalancePage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_exchange_exchange__["a" /* ExchangePage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_wallet_zrm_zrm__["a" /* ZrmPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_test_test__["a" /* TestPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_wallet_sendcrypto_sendcrypto__["a" /* SendcryptoPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_wallet_receivecrypto_receivecrypto__["a" /* ReceivecryptoPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_welcome_welcome__["a" /* WelcomePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_28__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_29__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_13__providers_shared__["a" /* Shared */],
                __WEBPACK_IMPORTED_MODULE_14__providers_rest_service__["a" /* RestService */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 39:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__search_search__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__account_account__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__balance_balance__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__exchange_exchange__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__wallet_wallet__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__test_test__ = __webpack_require__(342);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// import { HomePage } from '../home/home';






var TabsPage = (function () {
    function TabsPage() {
        // this tells the tabs component which Pages
        // should be each tab's root Page
        // @ViewChild('tabsBar') tabRef;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_6__test_test__["a" /* TestPage */];
        //tab1Root: any = HomePage;
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_1__search_search__["a" /* SearchPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_2__account_account__["a" /* AccountPage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_5__wallet_wallet__["a" /* WalletPage */];
        this.tab5Root = __WEBPACK_IMPORTED_MODULE_3__balance_balance__["a" /* BalancePage */];
        this.tab6Root = __WEBPACK_IMPORTED_MODULE_4__exchange_exchange__["a" /* ExchangePage */];
        this.color = "naranja";
        // this.tabRef.select(0);
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/ubuntu/workspace/zrm-io-smartwallet/src/pages/tabs/tabs.html"*/'\n<ion-tabs #tabsBar tabsPlacement="top" color="orange">   <!--    [color]="color"     color="testgris"  -->\n  <!-- <ion-tab [root]="tab1Root" tabTitle="Test" tabIcon="home" class="top-20"></ion-tab>   -->\n  <!-- <ion-tab [root]="tab1Root" tabIcon="home"></ion-tab> --> \n  <!-- <ion-tab [root]="tab2Root" tabIcon="search"></ion-tab>  -->\n  <!-- <ion-tab [root]="tab3Root" tabIcon="person"></ion-tab>  -->\n  <ion-tab [root]="tab4Root" tabTitle="Wallet" tabIcon="customiconWallet" class="top-20"></ion-tab>   <!-- color="#d08a29" class="tabs-icon-top tabs-positive" style="background-color: purple;"  -->\n  \n  <!-- <ion-tab [root]="tab5Root" tabTitle="Balance" tabIcon="information-circle"></ion-tab>  -->\n  <ion-tab [root]="tab6Root" tabTitle="Exchange" tabIcon="customiconExchange" class="top-20"></ion-tab>   \n</ion-tabs>\n'/*ion-inline-end:"/home/ubuntu/workspace/zrm-io-smartwallet/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 414:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_exchange_exchange__ = __webpack_require__(60);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// Agregado ViewChild

// Agregado Nav




// import { HomePage } from '../pages/home/home';

// import { WalletPage } from '../pages/wallet/wallet';

// import { BalancePage } from '../pages/balance/balance';
// import { WelcomePage } from '../pages/welcome/welcome';
// import { ZrmPage } from '../pages/wallet/zrm/zrm';
// import { TestPage } from '../pages/test/test';
// import { SearchPage } from '../pages/search/search';
// import { SendcryptoPage } from '../pages/sendcrypto/sendcrypto';
// import { ReceivecryptoPage } from '../pages/receivecrypto/receivecrypto';
var MyApp = (function () {
    function MyApp(platform, menu, statusBar, splashScreen) {
        this.platform = platform;
        this.menu = menu;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        // rootPage:any = TabsPage;
        // Cambiar rootPage
        // rootPage:any = LoginPage;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
        // { title: 'Home', component: HomePage }
        this.pages = [
            { title: 'Wallet', component: __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__["a" /* TabsPage */] },
            { title: 'Network Status', component: __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__["a" /* TabsPage */] },
            { title: 'Contacts', component: __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__["a" /* TabsPage */] },
            { title: 'Exchange', component: __WEBPACK_IMPORTED_MODULE_6__pages_exchange_exchange__["a" /* ExchangePage */] },
            { title: 'News', component: __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__["a" /* TabsPage */] },
            { title: 'ZAE', component: __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__["a" /* TabsPage */] },
            // { title: 'Demo', component: WelcomePage },
            { title: 'Settings', component: __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__["a" /* TabsPage */] },
            // { title: 'Search', component: SearchPage },
            { title: 'Exit', component: __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */] }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
        console.log(page.component);
    };
    MyApp.prototype.goToLogin = function () {
        //this.getRootNav().push(LoginPage);
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */]);
    };
    MyApp.prototype.checkMenu = function () {
        this.menu.enable(true);
        this.menu.toggle();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/ubuntu/workspace/zrm-io-smartwallet/src/app/app.html"*/'<ion-menu id="menu" side="right" [content]="content">\n  <ion-header>\n    <!--\n    <ion-toolbar>\n      <ion-title>Título del Menu Desplegable</ion-title>\n    </ion-toolbar>\n    -->\n  </ion-header>\n\n  <ion-content>\n   \n    <!--\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n    -->\n    \n     <!-- <object data="../assets/icon/logo_fixed-02.svg" type="image/svg+xml"></object> -->\n    <!-- <div style="text-align:left"><img src="assets/imgs/logo_topmenu_2.0.svg" width="400" height="100" align="top"></div>  -->\n    <div><img src="app-assets/imgs/logo_IO_top_menu.svg" width="350" height="150" align="top"></div>   <!-- 400x150   - 500 x 150 -  650 x 175 -->\n    \n    \n    <!-- <object data="../assets/icon/logo_menu_03.svg" type="image/svg+xml"></object>\n    <object data="../assets/icon/logo_menu_2.1-02.svg" type="image/svg+xml"></object>\n    <object data="../assets/icon/logo_menu_2.0-03.svg" type="image/svg+xml"></object>  -->\n    <ion-list>\n      <ion-list-header>\n          Neil\n      </ion-list-header>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        \n        <!-- <ion-icon [name]="p.icon"></ion-icon> -->\n       \n        <!-- Titulo de la Página sin condiciones -->\n        <!-- {{p.title}} --> \n        \n        <div [ngSwitch]="p.title">\n\n        <div style="text-align:left" *ngSwitchCase="\'Wallet\'"><img src="app-assets/imgs/wallet.svg" width="20" height="20" align="top">&nbsp;<b>{{p.title}}</b></div>\n        <!-- Trading -->\n        <div *ngSwitchCase="\'Exchange\'"><img class="info" src="app-assets/imgs/trading.svg" width="20" height="20"><b>Exchange</b></div>\n        <div style="text-align:left" *ngSwitchCase="\'Network Status\'"><ion-icon name="ios-cloud-upload-outline"></ion-icon>&nbsp;<b>{{p.title}}</b></div>\n        <div style="text-align:left" *ngSwitchCase="\'Contacts\'"><img src="app-assets/imgs/contacts.svg" width="20" height="20" align="top">&nbsp;<b>{{p.title}}</b></div>\n        <div style="text-align:left" *ngSwitchCase="\'News\'"><img src="app-assets/imgs/news.svg" width="20" height="20" align="top">&nbsp;<b>{{p.title}}</b></div>\n        <div style="text-align:left" *ngSwitchCase="\'ZAE\'"><img src="app-assets/imgs/avatar.svg" width="20" height="20" align="top">&nbsp;<b>{{p.title}}</b></div>\n        <!-- PARA PRUEBAS -->\n        <!-- <div style="text-align:left" *ngSwitchCase="\'Demo\'"><ion-icon name="ios-flash-outline"></ion-icon>&nbsp;<b>{{p.title}}</b></div>  -->\n        <div style="text-align:left" *ngSwitchCase="\'Settings\'"><img src="app-assets/imgs/settings.svg" width="20" height="20" align="top">&nbsp;<b>{{p.title}}</b></div>\n        <!-- PARA PRUEBAS -->\n        <!-- <div style="text-align:left" *ngSwitchCase="\'Search\'"><img src="app-assets/imgs/settings.svg" width="20" height="20" align="top">&nbsp;<b>{{p.title}}</b></div>   -->\n        \n        <!-- <div *ngSwitchCase="\'User\'">Neil</div> -->\n        <!--\n        <div style="text-align:left" *ngSwitchCase="\'Exit\'"><br>\n          <br>\n          <br>\n          <br>\n          <br><img [src]="p.imageUrl" width="20" height="20" align="top">&nbsp;<b>{{p.title}}</b></div>\n        -->\n        <!--\n        <div *ngSwitchDefault><img [src]="p.imageUrl" width="20" height="20" align="top">&nbsp;<b>{{p.title}}</b></div> \n        -->\n\n        </div>\n        \n\n        <!-- <img class="info" [src]="p.imageUrl" width="20" height="20">  -->\n        \n        <!-- <p *ngIf="p.title = \'Wallet\'">There are many heroes!</p> -->\n        \n      </button>\n      \n      <!-- <button menuClose ion-item (click)="openPage(\'SearchPage\')">\n        <div style="text-align:left"><img src="assets/imgs/settings.svg" width="20" height="20" align="top">&nbsp;<b>Search</b></div>\n      </button> -->\n    \n      <button class="btnsair" ion-item menuClose (click)="goToLogin()" color="sair-btn">\n          <div style="text-align:left">\n             <img src="app-assets/imgs/exit.svg" width="20" height="20" align="top">&nbsp;<b>Exit</b>\n          </div> \n      </button>  \n  \n    </ion-list>\n    \n    <ion-footer no-border>    \n      \n    <!--  <button class="btnsair" ion-item menuClose (click)="goToLogin()" color="sair-btn">\n          <div style="text-align:left">\n             <img src="assets/imgs/exit.svg" width="20" height="20" align="top">&nbsp;<b>Exit</b>\n          </div> \n      </button>   --> \n      \n    </ion-footer> \n  \n  \n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content (swiperight)="checkMenu()"></ion-nav>   <!-- swipeBackEnabled="false" -->'/*ion-inline-end:"/home/ubuntu/workspace/zrm-io-smartwallet/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 454:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 227,
	"./af.js": 227,
	"./ar": 228,
	"./ar-dz": 229,
	"./ar-dz.js": 229,
	"./ar-kw": 230,
	"./ar-kw.js": 230,
	"./ar-ly": 231,
	"./ar-ly.js": 231,
	"./ar-ma": 232,
	"./ar-ma.js": 232,
	"./ar-sa": 233,
	"./ar-sa.js": 233,
	"./ar-tn": 234,
	"./ar-tn.js": 234,
	"./ar.js": 228,
	"./az": 235,
	"./az.js": 235,
	"./be": 236,
	"./be.js": 236,
	"./bg": 237,
	"./bg.js": 237,
	"./bn": 238,
	"./bn.js": 238,
	"./bo": 239,
	"./bo.js": 239,
	"./br": 240,
	"./br.js": 240,
	"./bs": 241,
	"./bs.js": 241,
	"./ca": 242,
	"./ca.js": 242,
	"./cs": 243,
	"./cs.js": 243,
	"./cv": 244,
	"./cv.js": 244,
	"./cy": 245,
	"./cy.js": 245,
	"./da": 246,
	"./da.js": 246,
	"./de": 247,
	"./de-at": 248,
	"./de-at.js": 248,
	"./de-ch": 249,
	"./de-ch.js": 249,
	"./de.js": 247,
	"./dv": 250,
	"./dv.js": 250,
	"./el": 251,
	"./el.js": 251,
	"./en-au": 252,
	"./en-au.js": 252,
	"./en-ca": 253,
	"./en-ca.js": 253,
	"./en-gb": 254,
	"./en-gb.js": 254,
	"./en-ie": 255,
	"./en-ie.js": 255,
	"./en-nz": 256,
	"./en-nz.js": 256,
	"./eo": 257,
	"./eo.js": 257,
	"./es": 258,
	"./es-do": 259,
	"./es-do.js": 259,
	"./es.js": 258,
	"./et": 260,
	"./et.js": 260,
	"./eu": 261,
	"./eu.js": 261,
	"./fa": 262,
	"./fa.js": 262,
	"./fi": 263,
	"./fi.js": 263,
	"./fo": 264,
	"./fo.js": 264,
	"./fr": 265,
	"./fr-ca": 266,
	"./fr-ca.js": 266,
	"./fr-ch": 267,
	"./fr-ch.js": 267,
	"./fr.js": 265,
	"./fy": 268,
	"./fy.js": 268,
	"./gd": 269,
	"./gd.js": 269,
	"./gl": 270,
	"./gl.js": 270,
	"./gom-latn": 271,
	"./gom-latn.js": 271,
	"./he": 272,
	"./he.js": 272,
	"./hi": 273,
	"./hi.js": 273,
	"./hr": 274,
	"./hr.js": 274,
	"./hu": 275,
	"./hu.js": 275,
	"./hy-am": 276,
	"./hy-am.js": 276,
	"./id": 277,
	"./id.js": 277,
	"./is": 278,
	"./is.js": 278,
	"./it": 279,
	"./it.js": 279,
	"./ja": 280,
	"./ja.js": 280,
	"./jv": 281,
	"./jv.js": 281,
	"./ka": 282,
	"./ka.js": 282,
	"./kk": 283,
	"./kk.js": 283,
	"./km": 284,
	"./km.js": 284,
	"./kn": 285,
	"./kn.js": 285,
	"./ko": 286,
	"./ko.js": 286,
	"./ky": 287,
	"./ky.js": 287,
	"./lb": 288,
	"./lb.js": 288,
	"./lo": 289,
	"./lo.js": 289,
	"./lt": 290,
	"./lt.js": 290,
	"./lv": 291,
	"./lv.js": 291,
	"./me": 292,
	"./me.js": 292,
	"./mi": 293,
	"./mi.js": 293,
	"./mk": 294,
	"./mk.js": 294,
	"./ml": 295,
	"./ml.js": 295,
	"./mr": 296,
	"./mr.js": 296,
	"./ms": 297,
	"./ms-my": 298,
	"./ms-my.js": 298,
	"./ms.js": 297,
	"./my": 299,
	"./my.js": 299,
	"./nb": 300,
	"./nb.js": 300,
	"./ne": 301,
	"./ne.js": 301,
	"./nl": 302,
	"./nl-be": 303,
	"./nl-be.js": 303,
	"./nl.js": 302,
	"./nn": 304,
	"./nn.js": 304,
	"./pa-in": 305,
	"./pa-in.js": 305,
	"./pl": 306,
	"./pl.js": 306,
	"./pt": 307,
	"./pt-br": 308,
	"./pt-br.js": 308,
	"./pt.js": 307,
	"./ro": 309,
	"./ro.js": 309,
	"./ru": 310,
	"./ru.js": 310,
	"./sd": 311,
	"./sd.js": 311,
	"./se": 312,
	"./se.js": 312,
	"./si": 313,
	"./si.js": 313,
	"./sk": 314,
	"./sk.js": 314,
	"./sl": 315,
	"./sl.js": 315,
	"./sq": 316,
	"./sq.js": 316,
	"./sr": 317,
	"./sr-cyrl": 318,
	"./sr-cyrl.js": 318,
	"./sr.js": 317,
	"./ss": 319,
	"./ss.js": 319,
	"./sv": 320,
	"./sv.js": 320,
	"./sw": 321,
	"./sw.js": 321,
	"./ta": 322,
	"./ta.js": 322,
	"./te": 323,
	"./te.js": 323,
	"./tet": 324,
	"./tet.js": 324,
	"./th": 325,
	"./th.js": 325,
	"./tl-ph": 326,
	"./tl-ph.js": 326,
	"./tlh": 327,
	"./tlh.js": 327,
	"./tr": 328,
	"./tr.js": 328,
	"./tzl": 329,
	"./tzl.js": 329,
	"./tzm": 330,
	"./tzm-latn": 331,
	"./tzm-latn.js": 331,
	"./tzm.js": 330,
	"./uk": 332,
	"./uk.js": 332,
	"./ur": 333,
	"./ur.js": 333,
	"./uz": 334,
	"./uz-latn": 335,
	"./uz-latn.js": 335,
	"./uz.js": 334,
	"./vi": 336,
	"./vi.js": 336,
	"./x-pseudo": 337,
	"./x-pseudo.js": 337,
	"./yo": 338,
	"./yo.js": 338,
	"./zh-cn": 339,
	"./zh-cn.js": 339,
	"./zh-hk": 340,
	"./zh-hk.js": 340,
	"./zh-tw": 341,
	"./zh-tw.js": 341
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 454;

/***/ }),

/***/ 472:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_shared__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_rest_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__suggestion_suggestion__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__post_post__ = __webpack_require__(343);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var HomePage = (function () {
    function HomePage(navCtrl, navParams, loadingCtrl, modalCtrl, alertCtrl, restService, shared) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.restService = restService;
        this.shared = shared;
        this.gridfsUrl = this.restService.gridfsUrl;
        this.loading = this.loadingCtrl.create({
            content: "Getting ideas we collected..."
        });
        this.reset();
    }
    HomePage.prototype.refresh = function () {
        this.reset();
        this.content.resize();
    };
    HomePage.prototype.reset = function () {
        var _this = this;
        this.refreshToggle = false;
        this.loadIdeasSkipper = 0;
        this.loading.present();
        this.restService.getIdea(this.loadIdeasSkipper).subscribe(function (data) {
            _this.ideas = data;
            // if(this.ideas.length==0){
            //   this.notFoundMessageToggle = false;
            // }
            // else{
            //   this.notFoundMessageToggle = true;
            // }
            _this.loading.dismiss();
        }, function (err) {
            _this.loading.dismiss();
            console.log('Error');
        });
    };
    HomePage.prototype.ionViewDidLoad = function () {
        console.log('Hello LoginPage Page');
    };
    HomePage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        this.refreshToggle = true;
        this.content.resize();
        this.loadIdeasSkipper += 10;
        console.log(this.loadIdeasSkipper);
        setTimeout(function () {
            _this.restService.getIdea(_this.loadIdeasSkipper).subscribe(function (data) {
                _this.moreIdeas = data;
                _this.ideas = _this.ideas.concat(_this.moreIdeas);
            }, function (err) {
                console.log('Error');
            });
            infiniteScroll.complete();
        }, 3000);
    };
    HomePage.prototype.like = function (idea) {
        if (idea.likesString.includes(this.shared.username)) {
            var alert_1 = this.alertCtrl.create({
                title: 'Oops!',
                message: 'You liked the idea before',
                buttons: ['OK']
            });
            alert_1.present();
        }
        else {
            var loading_1 = this.loadingCtrl.create({
                content: "Submitting like..."
            });
            loading_1.present();
            console.log("username: " + this.shared.username);
            //
            // En tabla de Heroku sumaba 1 a la cantidad de Likes. Hacer reingenieria para JSON-Server
            //
            // idea.likes.push(this.shared.username);
            idea.likesString = idea.likes.toString();
            this.restService.updateIdea(idea.id, idea.status, idea.likes, idea.likesString, idea.suggestionsNo, idea.latestSuggestionOwner, idea.latestSuggestionOwnerFullname, idea.latestSuggestion)
                .subscribe(function (data) {
                loading_1.dismiss();
                console.log(data);
            }, function (err) {
                loading_1.dismiss();
                console.log(err);
            });
        }
    };
    HomePage.prototype.modalSuggestion = function (idea) {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__suggestion_suggestion__["a" /* SuggestionPage */], { idea: idea });
        modal.present();
    };
    HomePage.prototype.modalPost = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__post_post__["a" /* PostPage */]);
        modal.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
    ], HomePage.prototype, "content", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/ubuntu/workspace/zrm-io-smartwallet/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <!-- Agregado de ion-button menuToggle --> \n    <button ion-button menuToggle right>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Home</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-row responsive-sm wrap>\n    <ion-col *ngFor="let i of ideas">\n      <ion-card>\n        <ion-item>\n          <ion-avatar item-left>\n            <img [src]="i.ideaOwnerAvatar">\n          </ion-avatar>\n          <h2>i.ideaOwnerFullname</h2>\n          <!-- <ion-badge item-right>{{i.area}}</ion-badge>  -->\n          <small>i.updatedAt.substr(0, 10)</small>\n        </ion-item>\n\n        <ion-card-content>\n          <p>{{i.description}}</p>\n          <img style="object-fit:cover; width: 60%; margin: auto; display:block; image-orientation: from-image;" *ngIf="i.mediaType==\'.jpg\'||i.mediaType==\'.png\'||i.mediaType==\'.bmp\'||i.mediaType==\'.gif\'||i.mediaType==\'.jpeg\'"\n          [src]="gridfsUrl+\'/assets/img/\'+i.mediaId+i.mediaType">\n\n          <video *ngIf="i.mediaType==\'.mp4\'" width="256" height="256" style="margin:auto; display: block" controls>\n            <source [src]="gridfsUrl+\'/assets/img/\'+i.mediaId+i.mediaType" type="video/mp4">\n              Your browser does not support the video playback.\n          </video>\n\n          <audio *ngIf="i.mediaType==\'.mp3\'" controls>\n  <source [src]="gridfsUrl+\'/assets/img/\'+i.mediaId+i.mediaType" type="audio/mpeg">\n  Your browser does not support the audio playback.\n</audio>\n\n          <a ion-item text-center *ngIf="!(i.mediaType==\'.jpg\'||i.mediaType==\'.png\'||i.mediaType==\'.bmp\'||i.mediaType==\'.gif\'||i.mediaType==\'.jpeg\'||i.mediaType==\'.mp4\'||i.mediaType==\'.mp3\'||!i.mediaType)"\n          [href]="gridfsUrl+\'/assets/img/\'+i.mediaId+i.mediaType" target="_blank">\n            <ion-icon name="cloud-download"></ion-icon>{{i.mediaType}}</a>\n        </ion-card-content>\n\n        <ion-row>\n          <ion-col width-33 center text-center>\n            <button ion-button clear full primary small icon-left text-center (click)="like(i)">\n            <ion-icon name="thumbs-up"></ion-icon>\n            {{i.likes.length}}\n          </button>\n          </ion-col>\n          <ion-col width-33 center text-center>\n            <button ion-button full primary clear small icon-left text-center (click)="modalSuggestion(i)">\n            <ion-icon name="text"></ion-icon>\n            {{i.suggestionsNo}}\n          </button>\n          </ion-col>\n          <ion-col width-33 center text-center>\n        <ion-item text-center><small style="text-transform:uppercase; color:#007aff"><b>{{i.status}}</b></small>\n    </ion-item>\n          </ion-col>\n        </ion-row>\n        <ion-item padding>\n          <h3><i>{{i.latestSuggestionOwnerFullname}}</i></h3>\n          <p><i>{{i.latestSuggestion}}</i></p>\n        </ion-item>\n      </ion-card>\n    </ion-col>\n  </ion-row>\n  <!-- <ion-note *ngIf="notFoundMessageToggle"><h2>Sorry, nothing is found. Anyway, we know you\'re always keen in making our company great!</h2></ion-note> -->\n  <ion-fab right bottom *ngIf="refreshToggle">\n  <button ion-fab mini (click)="refresh()"><ion-icon name="refresh"></ion-icon></button>\n  </ion-fab>\n  <ion-fab right bottom>\n  <button ion-fab (click)="modalPost()"><ion-icon name="create"></ion-icon></button>\n  </ion-fab>\n  <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n    <ion-infinite-scroll-content\n      loadingSpinner="bubbles"\n      loadingText="Loading more data...">\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>\n'/*ion-inline-end:"/home/ubuntu/workspace/zrm-io-smartwallet/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_rest_service__["a" /* RestService */],
            __WEBPACK_IMPORTED_MODULE_2__providers_shared__["a" /* Shared */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 473:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WelcomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tabs_tabs__ = __webpack_require__(39);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// import { Storage } from '@ionic/storage';

var WelcomePage = (function () {
    function WelcomePage(navCtrl, menu, storage) {
        this.navCtrl = navCtrl;
        this.menu = menu;
        this.storage = storage;
        this.showSkip = true;
    }
    WelcomePage.prototype.startApp = function () {
        var _this = this;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__tabs_tabs__["a" /* TabsPage */]).then(function () {
            _this.storage.set('hasSeenWelcome', 'true');
        });
    };
    WelcomePage.prototype.onSlideChangeStart = function (slider) {
        this.showSkip = !slider.isEnd();
    };
    WelcomePage.prototype.ionViewWillEnter = function () {
        this.slides.update();
    };
    WelcomePage.prototype.ionViewDidEnter = function () {
        // the root left menu should be disabled on the welcome page
        this.menu.enable(false);
    };
    WelcomePage.prototype.ionViewDidLeave = function () {
        // enable the root left menu when leaving the welcome page
        this.menu.enable(true);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('slides'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Slides */])
    ], WelcomePage.prototype, "slides", void 0);
    WelcomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-welcome',template:/*ion-inline-start:"/home/ubuntu/workspace/zrm-io-smartwallet/src/pages/welcome/welcome.html"*/'<ion-header no-border>\n  <ion-navbar>\n    <ion-buttons end *ngIf="showSkip">\n      <button ion-button (click)="startApp()" color="primary">Skip</button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content no-bounce>\n  <ion-slides #slides (ionSlideWillChange)="onSlideChangeStart($event)" pager>\n\n    <ion-slide>\n      <img src="assets/imgs/ica-slidebox-img-1.png" class="slide-image"/>\n      <h2 class="slide-title">\n        Welcome to <b>ICA</b>\n      </h2>\n      <p>\n        The <b>ionic conference app</b> is a practical preview of the ionic framework in action, and a demonstration of proper code use.\n      </p>\n    </ion-slide>\n\n    <ion-slide>\n      <img src="assets/imgs/ica-slidebox-img-2.png" class="slide-image"/>\n      <h2 class="slide-title" >What is Ionic?</h2>\n      <p><b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.</p>\n    </ion-slide>\n\n    <ion-slide>\n      <img src="assets/imgs/ica-slidebox-img-3.png" class="slide-image"/>\n      <h2 class="slide-title">What is Ionic Pro?</h2>\n      <p><b>Ionic Pro</b> is a powerful set of services and features built on top of Ionic Framework that brings a totally new level of app development agility to mobile dev teams.</p>\n    </ion-slide>\n\n    <ion-slide>\n      <img src="assets/imgs/ica-slidebox-img-4.png" class="slide-image"/>\n      <h2 class="slide-title">Ready to Play?</h2>\n      <button ion-button icon-end large clear (click)="startApp()">\n        Continue\n        <ion-icon name="arrow-forward"></ion-icon>\n      </button>\n    </ion-slide>\n\n  </ion-slides>\n</ion-content>\n'/*ion-inline-end:"/home/ubuntu/workspace/zrm-io-smartwallet/src/pages/welcome/welcome.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */],
            Storage])
    ], WelcomePage);
    return WelcomePage;
}());

//# sourceMappingURL=welcome.js.map

/***/ }),

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tabs_tabs__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_rest_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_shared__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// import { SplashScreen } from '@ionic-native/splash-screen';


// import { WelcomePage } from '../welcome/welcome';


var LoginPage = (function () {
    function LoginPage(navCtrl, restService, loadingCtrl, alertCtrl, shared) {
        this.navCtrl = navCtrl;
        this.restService = restService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.shared = shared;
        this.Username = "";
        this.Password = "";
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('Hello LoginPage Page');
    };
    LoginPage.prototype.login = function () {
        if ((this.Username.trim().length > 0)
            && (this.Password.trim().length > 0)) {
            var loading = this.loadingCtrl.create({
                content: "Signing in..."
            });
            // loading.present();
            // this.restService.authUser(this.Username, this.Password).subscribe(data => {
            //  loading.dismiss();
            //  if (data) {
            //    this.restService.searchUser("username", this.Username).subscribe(data => {
            //      loading.dismiss();
            //      this.users = data;
            //      if (this.users.length>0){
            //        this.shared.userId = this.users[0].id;
            //        this.shared.username = this.users[0].username;
            //        this.shared.fullname = this.users[0].fullname;
            //        this.shared.avatarId = this.users[0].avatarId;
            //        this.shared.ideaNo = this.users[0].ideaNo;
            //        this.shared.actionNo = this.users[0].actionNo;
            this.shared.userId = 1;
            this.shared.username = "Dueño1";
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__tabs_tabs__["a" /* TabsPage */]);
            this.shared.toast("Logged in as " + this.Username);
            //        console.log(this.shared.ideaNo+' '+this.shared.actionNo);
            //      }
            //      else{
            //        this.navCtrl.push(WelcomePage, {username: this.Username});
            //      }
            //    }, (err) => {
            //      loading.dismiss();
            //      console.log('Error');
            //    });
            //  }
            //  else {
            //    let alert = this.alertCtrl.create({
            //      title: 'Login Failed',
            //      message: 'Username or Password is incorrect',
            //      buttons: ['Try again']
            //    });
            //    alert.present();
            //  }
            // }, (err) => {
            //  loading.dismiss();
            //  let alert = this.alertCtrl.create({
            //    title: 'Login Failed',
            //    message: err,
            //    buttons: ['Try again']
            //  });
            //  alert.present();
            //});
            //}
            //else {
            //  let alert = this.alertCtrl.create({
            //    title: 'Login Failed',
            //    message: 'Username or Password is empty',
            //    buttons: ['Try again']
            //  });
            //  alert.present();
            //  this.Username = "";
            //  this.Password = "";
            // }
        }
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/home/ubuntu/workspace/zrm-io-smartwallet/src/pages/login/login.html"*/'<ion-header>\n</ion-header>\n\n<ion-content>\n  <ion-card>\n        <ion-card-header>\n          <h1>Login</h1></ion-card-header>\n\n        <ion-card-content>\n\n          <ion-item>\n            <ion-label floating>Zerium Username</ion-label>\n            <ion-input [(ngModel)]="Username" type="text"></ion-input>\n          </ion-item>\n\n          <ion-item>\n            <ion-label floating>Zerium Password</ion-label>\n            <ion-input [(ngModel)]="Password" type="password"></ion-input>\n          </ion-item>\n\n          <ion-buttons>\n            <button ion-button block (click)="login()" color="orange">Sign In</button>\n          </ion-buttons>\n        </ion-card-content>\n\n      </ion-card>\n</ion-content>\n'/*ion-inline-end:"/home/ubuntu/workspace/zrm-io-smartwallet/src/pages/login/login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_rest_service__["a" /* RestService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_shared__["a" /* Shared */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExchangePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_rest_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery__ = __webpack_require__(423);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_jquery__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// import { NotavailablePage } from '../notavailable/notavailable';

var ExchangePage = (function () {
    // , private modalCtrl: ModalController
    function ExchangePage(app, navCtrl, menu, alertCtrl, restService) {
        var _this = this;
        this.app = app;
        this.navCtrl = navCtrl;
        this.menu = menu;
        this.alertCtrl = alertCtrl;
        this.restService = restService;
        this.TraderKeys = [];
        this.ExchangeKeys = [];
        this.ReceiveKeys = [];
        this.TickerSymbolArray = [];
        this.ExchangeKeyArray = [];
        this.TickerSymbolVar = '';
        this.ReceiveKeyVar = '';
        this.msgModal = '';
        this.titleModal = '';
        this.listboxLoad();
        this.restService.getListTraderKeys('TraderKeys').subscribe(function (data) {
            _this.TraderKeys = data;
            // console.log(data);
        });
        this.restService.getListExchangeKeys('ExchangeKeys').subscribe(function (data) {
            _this.ExchangeKeys = data;
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
            _this.ExchangeKeys.forEach(function (value) {
                // this.TickerSymbolArray.push(value.ExchangeKey);
                // console.log(value.ExchangeKey);
                i = i + 1;
            });
            i = 0;
            _this.ExchangeKeys.forEach(function (value) {
                // this.ExchangeKeyArray[i] = value.TickerSymbol;
                // console.log(value.TickerSymbol);
                i = i + 1;
            });
        });
    }
    ExchangePage.prototype.showConfirm = function () {
        var confirm = this.alertCtrl.create({
            title: this.titleModal,
            message: this.msgModal,
            buttons: [
                {
                    text: 'OK',
                    handler: function () {
                        console.log('OK clicked');
                    }
                }
            ]
        });
        confirm.present();
    };
    // modalNotavailable(this.ErrorMsg) {
    //    $('#idErrorMsg').text(this.ErrorMsg);
    //    let modal = this.modalCtrl.create(NotavailablePage, this.ErrorMsg);
    //    modal.present();
    // }
    ExchangePage.prototype.listboxLoad = function () {
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
        ];
    };
    ExchangePage.prototype.logout = function () {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
    };
    ExchangePage.prototype.goToLogin = function () {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
    };
    ExchangePage.prototype.UpdateList = function (TraderKeyParm, idParm) {
        var _this = this;
        this.restService.getListTraderKeys('TraderKeys').subscribe(function (data) {
            _this.TraderKeys = data;
        });
        // console.log('TraderKeyParm ' + TraderKeyParm);    
        this.TraderKeys.TraderKey = TraderKeyParm;
        // console.log('this.TraderKeys.TraderKey ' + this.TraderKeys.TraderKey); 
        // console.log('id' + idParm);
        this.TraderKeys.id = idParm;
        // console.log(this.TraderKeys.id);
        __WEBPACK_IMPORTED_MODULE_4_jquery__('#idExchangeOverSelect').text(TraderKeyParm);
    };
    // VER ESTA FUNCION QUE AL PASARLE DOS PARAMETROS SE ROMPIO    // , TraderKeyParm:string
    ExchangePage.prototype.onSelectChange = function (selectedValue) {
        // console.log('Selected', selectedValue);
        // $('#idExchangeOver').text('prueba');
        __WEBPACK_IMPORTED_MODULE_4_jquery__('#idExchangeOverSelect').text(selectedValue);
        //$('#idExchangeOverOption').text(selectedValue);
    };
    ExchangePage.prototype.onSelectChangeExchangeKeys = function (selectedValue) {
        // console.log('Selected_ExchangeKeys', selectedValue);
        // console.log(this.TickerSymbolArray);
        // console.log(this.ExchangeKeyArray);
        // var matchedIndex = this.ExchangeKeyArray.map(function (obj) { return obj; }).indexOf(selectedValue);
        var matchedIndex = this.ExchangeKeys.map(function (d) { return d['ExchangeKey']; }).indexOf(selectedValue);
        // console.log(matchedIndex);
        // console.log(this.ExchangeKeys[matchedIndex].TickerSymbol);
        this.TickerSymbolVar = this.ExchangeKeys[matchedIndex].TickerSymbol;
        // console.log(this.TickerSymbolArray[matchedIndex]);
        // this.TickerSymbolVar = this.TickerSymbolArray[matchedIndex];
        // $('#idExchangeKeySelectTicker').text(this.TickerSymbolArray[matchedIndex]);
        __WEBPACK_IMPORTED_MODULE_4_jquery__('#idExchangeKeySelectTicker').text(this.ExchangeKeys[matchedIndex].TickerSymbol);
    };
    ExchangePage.prototype.onSelectChangeReceiveKeys = function (selectedValue) {
        this.ReceiveKeyVar = selectedValue;
        this.calculateReceiveMoney();
    };
    ExchangePage.prototype.calculateReceiveMoney = function () {
        if (this.ReceiveKeyVar == 'Ethereum') {
            if (this.TickerSymbolVar == 'ETH') {
                this.titleModal = 'No está permitido';
                this.msgModal = 'No se puede realizar una operación de cambio desde y hacia la misma moneda';
                // this.modalNotavailable(this.ErrorMsg);   
                this.showConfirm();
            }
            else {
                if (this.TickerSymbolVar == 'ZRM') {
                    var factor = 0.3 / 859.42;
                }
                if (this.TickerSymbolVar == 'BTC') {
                    var factor = 8757 / 859.42;
                }
                if (this.TickerSymbolVar == 'XRP') {
                    var factor = 1.01668 / 859.42;
                }
                var receivemoney = (__WEBPACK_IMPORTED_MODULE_4_jquery__("input[type=number]").val()) * factor;
                __WEBPACK_IMPORTED_MODULE_4_jquery__('#idReceiveKeyMoney').text(receivemoney.toFixed(5) + ' ETH');
                // $('#idReceiveKeyMoney').text('20000,00 ETH');
                // console.log('ETH' + this.ReceiveKeyVar);
                // if ($( "input[type=number]" ).val() == 48) {
                //    console.log($( "input[type=number]" ).val());
                // }
            } // cierra  if (this.TickerSymbolVar == 'ETH') 
        } // cierra if (this.ReceiveKeyVar == 'Ethereum')
        if (this.ReceiveKeyVar == 'Zerium') {
            if (this.TickerSymbolVar == 'ZRM') {
                this.titleModal = 'No está permitido';
                this.msgModal = 'No se puede realizar una operación de cambio desde y hacia la misma moneda';
                // this.modalNotavailable(this.ErrorMsg);   
                this.showConfirm();
            }
            else {
                if (this.TickerSymbolVar == 'ETH') {
                    var factor = 859.42 / 0.3;
                }
                if (this.TickerSymbolVar == 'BTC') {
                    var factor = 8757 / 0.3;
                }
                if (this.TickerSymbolVar == 'XRP') {
                    var factor = 1.01668 / 0.3;
                }
                var receivemoney = (__WEBPACK_IMPORTED_MODULE_4_jquery__("input[type=number]").val()) * factor;
                __WEBPACK_IMPORTED_MODULE_4_jquery__('#idReceiveKeyMoney').text(receivemoney.toFixed(5) + ' ZRM');
            } // cierra  if (this.TickerSymbolVar  
        } // cierra if (this.ReceiveKeyVar  
        if (this.ReceiveKeyVar == 'Bitcoin') {
            if (this.TickerSymbolVar == 'BTC') {
                this.titleModal = 'No está permitido';
                this.msgModal = 'No se puede realizar una operación de cambio desde y hacia la misma moneda';
                // this.modalNotavailable(this.ErrorMsg);   
                this.showConfirm();
            }
            else {
                if (this.TickerSymbolVar == 'ETH') {
                    var factor = 859.42 / 8757;
                }
                if (this.TickerSymbolVar == 'ZRM') {
                    var factor = 0.3 / 8757;
                }
                if (this.TickerSymbolVar == 'XRP') {
                    var factor = 1.01668 / 8757;
                }
                var receivemoney = (__WEBPACK_IMPORTED_MODULE_4_jquery__("input[type=number]").val()) * factor;
                __WEBPACK_IMPORTED_MODULE_4_jquery__('#idReceiveKeyMoney').text(receivemoney.toFixed(5) + ' BTC');
            } // cierra  if (this.TickerSymbolVar  
        } // cierra if (this.ReceiveKeyVar  
        if (this.ReceiveKeyVar == 'Ripple') {
            if (this.TickerSymbolVar == 'XRP') {
                this.titleModal = 'No está permitido';
                this.msgModal = 'No se puede realizar una operación de cambio desde y hacia la misma moneda';
                // this.modalNotavailable(this.ErrorMsg);   
                this.showConfirm();
            }
            else {
                if (this.TickerSymbolVar == 'ETH') {
                    var factor = 859.42 / 1.01668;
                }
                if (this.TickerSymbolVar == 'ZRM') {
                    var factor = 0.3 / 1.01668;
                }
                if (this.TickerSymbolVar == 'BTC') {
                    var factor = 8757 / 1.01668;
                }
                var receivemoney = (__WEBPACK_IMPORTED_MODULE_4_jquery__("input[type=number]").val()) * factor;
                __WEBPACK_IMPORTED_MODULE_4_jquery__('#idReceiveKeyMoney').text(receivemoney.toFixed(5) + ' XRP');
            } // cierra  if (this.TickerSymbolVar  
        } // cierra if (this.ReceiveKeyVar  
    };
    ExchangePage.prototype.goToExchange = function () {
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
    }; // cierra goToExchange() 
    ExchangePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-exchange',template:/*ion-inline-start:"/home/ubuntu/workspace/zrm-io-smartwallet/src/pages/exchange/exchange.html"*/'<ion-header>\n  <ion-navbar  color=\'navbarColorBlack\'>\n    \n    <ion-grid>\n    <ion-row>\n      <ion-col>    \n           <ion-title>\n              <b style="color: #d08a29; font-size: 18pt;">Exchange</b>  \n           </ion-title>\n      </ion-col>    \n      \n      <ion-col style="text-align: center">\n          <img src="app-assets/imgs/IO_logo_transparent.svg" width="219" height="126">   \n      </ion-col>\n      \n      <ion-col>   <!--  style="text-align: right" -->\n           \n      </ion-col> \n      \n      <!-- Agregado de ion-button menuToggle --> \n      <button ion-button menuToggle right>\n              <ion-icon name="menu" color="orange"></ion-icon>\n      </button>\n      \n    </ion-row>\n  </ion-grid>\n\n\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding color="dark">\n \n  <ion-item color=\'navbarColorBlack\'> \n    \n    <ion-grid>\n    <ion-row>\n      <ion-col>   <!--  style="text-align: left"  -->\n          <img src="app-assets/imgs/ZRM.svg">  <!--   height="50px" width="50px"  -->\n      </ion-col>    \n      <ion-col style="text-align: center">\n          <b><H1 align="center" style="color: #ffffff; font-size: 12pt;">ZRM Exchange</H1></b>   <!-- style="color: #d08a29;"  -->  <!--  font-size: 30pt; -->\n      </ion-col>\n      <ion-col style="text-align: right"> <!--  style="text-align: right" -->\n          <button ion-button large color="navbarColorBlack" (click)="goToLogin()"><img src="app-assets/imgs/EXIT.svg"></button>  <!-- id="myImage" height="50px" width="50px" -->\n          <!-- <button ion-button right (click)="goToLogin()">Exit</button> -->\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n  \n  \n  </ion-item>  \n  \n\n  <ion-list>\n    \n  <ion-item>\n  <ion-label color=\'marron\'><b>Currency to Change</b></ion-label>\n  <ion-select (ionChange)="onSelectChangeExchangeKeys($event)">\n    <ion-option *ngFor="let Exchangekey of ExchangeKeys">{{Exchangekey.ExchangeKey}}</ion-option>\n  </ion-select>\n</ion-item>\n\n\n\n<ion-grid style="background-color:#ffffff">\n    <ion-row>\n      <ion-col style="text-align: left">   <!--  style="text-align: left"  -->\n          <ion-input id="idquantitymoney" type="number" step="0.01" placeholder="Input quantity money"></ion-input>\n\n      </ion-col>    \n      <ion-col style="text-align: right">\n          <ion-label color=\'marron\' id="idExchangeKeySelectTicker"><b>ZRM</b></ion-label>   \n          <!-- <ion-input type="text" name="exchange-quantity"></ion-input> -->  <!-- [(ngModel)]="exchange.quantity"  -->  \n          \n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n \n</ion-list>\n\n\n<ion-list>\n  <!-- <div *ngFor="let Traderkey of TraderKeys">  -->\n\n  <ion-item>\n  <ion-label color=\'marron\'><b>Exchange Over</b></ion-label>\n\n    \n    <ion-select id="idExchangeOverSelect" (ionChange)="onSelectChange($event)">   <!-- , Traderkey.TraderKey -->\n       \n       <div *ngFor="let Traderkey of TraderKeys">  \n       \n       <ion-option id="idExchangeOverOption">{{Traderkey.TraderKey}}</ion-option>   <!-- {{Traderkey}} -->\n      \n      <ion-img style="width: 80px; height: 80px;" src={{Traderkey.TraderImg}}></ion-img>\n      \n      <ion-label color=\'marron\'><b>Exchange Over</b></ion-label>\n\n      <a href=\'\'>\n        <img src={{Traderkey.TraderImg}} width="30" height="30"> \n      </a> \n      </div> \n       \n    </ion-select>\n    \n <!-- div -->  \n  \n  <!--   -->\n  \n</ion-item>\n\n<div>\n<ion-grid style="background-color:#ffffff">\n    <ion-row>\n      <ion-col *ngFor="let Traderkey of TraderKeys">   \n<button (click)="UpdateList(Traderkey.TraderKey, Traderkey.id)" color="marron" icon-end="" ion-button="" class="disable-hover button button-ios button-default button-default-ios button-ios-dark">\n  \n  <span class="button-inner" style="font-size: 9px;">  \n    {{Traderkey.TraderKey}}\n    <!-- <ion-icon name="star" role="img" class="icon icon-ios ion-ios-star" aria-label="star"></ion-icon> -->\n    &nbsp;<img src={{Traderkey.TraderImg}} width="50" height="50"> \n  </span>  \n  \n  <!-- <div class="button-effect"></div>  -->\n  </button>\n  </ion-col>\n  </ion-row>\n  </ion-grid>\n</div>\n</ion-list>\n\n\n <ion-list>\n   \n  <ion-item>\n\n  <ion-label color=\'marron\'><b>Currency to Receive</b></ion-label>\n  <ion-select (ionChange)="onSelectChangeReceiveKeys($event)">\n    <ion-option *ngFor="let Receivekey of ReceiveKeys">{{Receivekey}}</ion-option>\n  </ion-select>\n</ion-item>\n\n<ion-item>\n           \n            <ion-label color=\'marron\' id="idReceiveKeyMoney" style="text-align: center"></ion-label> \n          </ion-item>\n\n</ion-list> \n\n  <ion-grid>\n        <ion-row>\n          <ion-col style="text-align: center">\n              <button ion-button color="marron" round (click)="goToExchange()">Exchange</button>\n             \n          </ion-col>\n        </ion-row>\n  </ion-grid>\n  \n          \n         \n           \n\n</ion-content>\n'/*ion-inline-end:"/home/ubuntu/workspace/zrm-io-smartwallet/src/pages/exchange/exchange.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_rest_service__["a" /* RestService */]])
    ], ExchangePage);
    return ExchangePage;
}());

//# sourceMappingURL=exchange.js.map

/***/ })

},[344]);
//# sourceMappingURL=main.js.map