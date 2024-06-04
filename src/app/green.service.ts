import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GreenService {
  private apiUrl = 'https://7103.api.greenapi.com';
  private idInstance = '7103942823';
  private apiTokenInstance = 'dc028f5ed65b4640832619723bf1e7128c961eddc7d5416bb8';
  
  constructor(private http: HttpClient) {}
  
  getSettings(): Observable<any> {
    const url = `${this.apiUrl}/waInstance${this.idInstance}/getSettings/${this.apiTokenInstance}`;
    return this.http.get(url);
  }
  
  getStateInstance(): Observable<any> {
    const url = `${this.apiUrl}/waInstance${this.idInstance}/getStateInstance/${this.apiTokenInstance}`;
    return this.http.get(url);
  }
  
  sendMessage(chatId: string, message: string): Observable<any> {
    const url = `${this.apiUrl}/waInstance${this.idInstance}/sendMessage/${this.apiTokenInstance}`;
    const body = { chatId, message };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, body, { headers });
  }
  
  sendFileByUrl(chatId: string, urlFile: string, fileName: string, caption?: string): Observable<any> {
    const url = `${this.apiUrl}/waInstance${this.idInstance}/sendFileByUrl/${this.apiTokenInstance}`;
    const body = { chatId, urlFile, fileName, caption };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, body, { headers });
  }
}
  