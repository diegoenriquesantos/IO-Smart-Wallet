import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { User } from '../models/user';
import { Idea } from '../models/idea';
import { Suggestion } from '../models/suggestion';
import { TraderKeys } from '../models/traderkeys';
import { ExchangeKeys } from '../models/exchangekeys';

import { Action } from '../models/action';
import { Review } from '../models/review';

@Injectable()
export class RestService {
  authUrl = 'https://jsonplaceholder.typicode.com'; //Please use your desired authUrl
  apiUrl = 'https://jsonplaceholder.typicode.com';
  
  apiUrl2 = 'https://zerium-linanayail.c9users.io:8081';
  gridfsUrl2 = 'https://zerium-linanayail.c9users.io:8081';
  imgsUrl = 'https://zerium-linanayail.c9users.io:8080';
  
  gridfsUrl = 'https://protected-temple-59341.herokuapp.com';
  
  // apiUrl2 = 'https://zerium-wiki-linanayail.c9users.io:8081';
  // gridfsUrl= 'https://zerium-wiki-linanayail.c9users.io:8081';


  constructor(public http: Http) {
    console.log('Hello RestService Provider');
  }

  
  postUser(username: string, fullname: string, avatarId: string, ideaNo: number, actionNo: number): Observable<User> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.apiUrl}/users?id=20&name="Juancito"username=${username}`, { headers: headers })
      .map(res => <User>res.json());
  }
  
  postUser2(username: string, fullname: string, avatarId: string, ideaNo: number, actionNo: number): Observable<User> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.apiUrl}/user?username=${username}&fullname=${fullname}&avatarId=${avatarId}&ideaNo=${ideaNo}&actionNo=${actionNo}`, { headers: headers })
      .map(res => <User>res.json());
  }

  authUser(name, password): Observable<boolean> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.authUrl}/users/10`, { headers: headers })//working
      .map(res => <boolean>res.json());
  }
  
  authUser2(name, password): Observable<boolean> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.authUrl}/user?username=${name}&password=${password}`, { headers: headers })//working
      .map(res => <boolean>res.json());
  }

  searchUser(key: string, value: string): Observable<User[]> {
    return this.http.get(`${this.apiUrl}/user?${key}=${value}&sort=updatedAt DESC`)
      .map(res => <User[]>res.json());
  }

  updateUser(id: string, fullname: string, avatarId: string, ideaNo: number, actionNo: number): Observable<User> {
    let data = {
      fullname: fullname,
      avatarId: avatarId,
      ideaNo: ideaNo,
      actionNo: actionNo
    };
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.apiUrl+'/user/'+id, JSON.stringify(data), { headers: headers })
      .map(res => <User>res.json());
  }

  postIdea(ideaOwner:string,
    ideaOwnerFullname: string,
  ideaOwnerAvatar: string,
  description: string,
  mediaId: string,
  mediaType: string,
  area: string,
  status: string,
  likes: string[],
  likesString: string,
  suggestionsNo: number,
  latestSuggestionOwner: string,
  latestSuggestionOwnerFullname: string,
  latestSuggestion: string): Observable<Idea> {
    let data = {
      ideaOwner : ideaOwner,
      ideaOwnerFullname: ideaOwnerFullname,
      ideaOwnerAvatar : ideaOwnerAvatar,
      description : description,
      mediaId : mediaId,
      mediaType : mediaType,
      area : area,
      status : status,
      likes : likes,
      likesString: likesString,
      suggestionsNo : suggestionsNo,
      latestSuggestionOwner : latestSuggestionOwner,
      latestSuggestionOwnerFullname: latestSuggestionOwnerFullname,
      latestSuggestion : latestSuggestion,
    };
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.apiUrl2+'/ideas/', JSON.stringify(data), { headers: headers })
      .map(res => <Idea>res.json());
  }

  updateIdea(ideaId:string,
  status: string,
  likes: string[],
  likesString: string,
  suggestionsNo: number,
  latestSuggestionOwner: string,
  latestSuggestionOwnerFullname: string,
  latestSuggestion: string): Observable<Idea> {
    let data = {
      status : status,
      likes : likes,
      likesString: likesString,
      suggestionsNo : suggestionsNo,
      latestSuggestionOwner : latestSuggestionOwner,
      latestSuggestionOwnerFullname: latestSuggestionOwnerFullname,
      latestSuggestion : latestSuggestion,
    };
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.apiUrl2+'/ideas/'+ideaId, JSON.stringify(data), { headers: headers })
      .map(res => <Idea>res.json());
  }

  updateIdeaStatus(ideaId:string,
  status: string): Observable<Idea> {
    let data = {
      status : status
    };
    console.log("monitorea updateIdeaStatus");
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.apiUrl2+'/ideas/'+ideaId, JSON.stringify(data), { headers: headers })
      .map(res => <Idea>res.json());
  }

  getIdea(loadIdeasSkipper: number): Observable<Idea[]> {
    console.log("monitorea getIdea");
    return this.http.get(`${this.apiUrl2}/ideas`)
      .map(res => <Idea[]>res.json());
  }
  
  getIdea2(loadIdeasSkipper: number): Observable<Idea[]> {
    console.log("cargando ideas desde el servidor");
    return this.http.get(`${this.apiUrl}/idea?sort=updatedAt DESC&limit=10&skip=${loadIdeasSkipper}`)
      .map(res => <Idea[]>res.json());
  }

  getOneIdea(ideaId:string): Observable<Idea> {
    return this.http.get('/ideas/'+ideaId)
      .map(res => <Idea>res.json());
  }

  searchIdea(key: string, value: string, area: string, status: string, startDate: string, endDate: string): Observable<Idea[]> {
      return this.http.get(`${this.apiUrl2}/ideas?{"${key}":{"contains":"${value}"}, "area":{"contains":"${area}"}, "status":{"contains":"${status}"}, "updatedAt":{">=": "${startDate}", "<=": "${endDate}"}}`)
        .map(res => <Idea[]>res.json());
  }
  
  searchIdea2(key: string, value: string, area: string, status: string, startDate: string, endDate: string): Observable<Idea[]> {
      return this.http.get(`${this.apiUrl}/idea?where={"${key}":{"contains":"${value}"}, "area":{"contains":"${area}"}, "status":{"contains":"${status}"}, "updatedAt":{">=": "${startDate}", "<=": "${endDate}"}}`)
        .map(res => <Idea[]>res.json());
  }

  postSuggestion(ideaId: string, suggestionOwner: string, suggestionOwnerFullname: string, suggestion: string, updatedAt: string): Observable<Suggestion> {
    let data = {
      ideaId: ideaId,
      suggestionOwner: suggestionOwner,
      suggestionOwnerFullname: suggestionOwnerFullname,
      suggestion: suggestion,
      updatedAt: updatedAt
    };
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.apiUrl2+'/suggestion/', JSON.stringify(data), { headers: headers })
      .map(res => <Suggestion>res.json());
  }

  getSuggestion(ideaId: string): Observable<Suggestion[]> {
    return this.http.get(`${this.apiUrl2}/suggestion?ideaId=${ideaId}&sort=updatedAt ASC`)
      .map(res => <Suggestion[]>res.json());
  }

  deleteSuggestion(ideaId: string): Observable<Suggestion> {
    return this.http.delete(`${this.apiUrl}/suggestion/${ideaId}`)
      .map(res => <Suggestion>res.json());
  }

  searchSuggestion(key: string, value: string, startDate: string, endDate: string): Observable<Suggestion[]> {
    return this.http.get(`${this.apiUrl2}/suggestion?{"${key}":{"contains":"${value}"}, "updatedAt":{">=": "${startDate}", "<=": "${endDate}"}}`)
      .map(res => <Suggestion[]>res.json());
  }

  postAction(ideaId: string, suggestionId: string, actionOwner: string, actionOwnerFullname: string, action: string, actionDeadline: string): Observable<Action> {
    let data = {
      ideaId: ideaId,
      suggestionId: suggestionId,
      actionOwner: actionOwner,
      actionOwnerFullname: actionOwnerFullname,
      action: action,
      actionDeadline: actionDeadline
    };
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.apiUrl+'/action/', JSON.stringify(data), { headers: headers })
      .map(res => <Action>res.json());
  }

  getAction(suggestionId: string): Observable<Action[]> {
    return this.http.get(`${this.apiUrl}/action?suggestionId=${suggestionId}&sort=updatedAt ASC`)
      .map(res => <Action[]>res.json());
  }

  deleteAction(actionId: string): Observable<Action> {
    return this.http.delete(`${this.apiUrl}/action/${actionId}`)
      .map(res => <Action>res.json());
  }

  searchAction(key: string, value: string, startDate: string, endDate: string): Observable<Action[]> {
    return this.http.get(`${this.apiUrl}/action?where={"${key}":{"contains":"${value}"}, "actionDeadline":{">=": "${startDate}", "<=": "${endDate}"}}`)
      .map(res => <Action[]>res.json());
  }

  uploadFile(fileToUpload: any) {
    let input = new FormData();
    input.append("file", fileToUpload);
    return this.http
      .post(this.gridfsUrl2 + "/file/", input);
  }

  postReview(review: Review): Observable<Review> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.apiUrl+'/review/', JSON.stringify(review), { headers: headers })
      .map(res => <Review>res.json());
  }

  getListTraderKeys(TraderKey:string): Observable<TraderKeys> {
    console.log(TraderKey);
    return this.http.get(this.apiUrl2+'/TraderKeys')
      .map(res => <TraderKeys>res.json());
    
  }
  
  getListExchangeKeys(ExchangeKey:string): Observable<ExchangeKeys> {
    console.log(ExchangeKey);
    return this.http.get(this.apiUrl2+'/ExchangeKeys')
      .map(res => <ExchangeKeys>res.json());
    
  }
  
}
