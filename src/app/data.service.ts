import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Github User API Base URL
  apiBaseUrl:string='https://api.github.com/users/';
  token:string='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'
  headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
  });
  constructor(private http: HttpClient) { }
  //Return username from local json file
  getUserName():Observable<any>{
    return this.http.get<any>('assets/server/db.json')
  }
  //return user detail from github api
  getUserDetail(username:string):Observable<any>{
    let headers=this.headers;
    return this.http.get<any>(this.apiBaseUrl + username,{headers})
  }
}
