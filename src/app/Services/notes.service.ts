import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NotesService {
  baseURL = "https://routeegypt.herokuapp.com/";


  constructor(private _HttpClient: HttpClient) { }

  getAllNotes(data: any): Observable<any> {
    return this._HttpClient.post(this.baseURL + 'getUserNotes', data)
  }
  addNote(data: any): Observable<any> {
    return this._HttpClient.post(this.baseURL + 'addNote', data)
  }
  deleteNote(data: any): Observable<any> {
    let options = {
      headers: new HttpHeaders({

      }),
      body: {
        NoteID: data.NoteID,
        token: data.token
      }
    }
    return this._HttpClient.delete(this.baseURL + 'deleteNote', options)
  }
  updateNote(data: any): Observable<any> {
    return this._HttpClient.put(this.baseURL + 'updateNote', data)
  }

}
