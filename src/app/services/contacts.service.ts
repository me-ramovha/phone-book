import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { PhoneBook } from '../model/phone-book';
import { map, catchError, tap } from 'rxjs/operators';
import { PhoneBookData } from './phone-book-data';
@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  apiurl = 'api/phoneBooks';
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
  httpOptions = {
    headers: this.headers
  };

  constructor(private http: HttpClient) { }

  private handleError(error: any) {
    // console.error(error);                                       
    return throwError(error);
  }
 

  getPhoneBooks(): Observable<PhoneBook[]> {
    return this.http.get<PhoneBook[]>(this.apiurl).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  addPhoneBook(contact: PhoneBook): Observable<PhoneBook> { 
    contact.id=null;
    return this.http.post<PhoneBook>(this.apiurl, contact, this.httpOptions).pipe(
    tap(data => console.log(data)),
    catchError(this.handleError)
  );
}

updatePhoneBook(contact: PhoneBook): Observable<PhoneBook>{
  const url = `${this.apiurl}/${contact.id}`;
  return this.http.put<PhoneBook>(this.apiurl, contact, this.httpOptions).pipe(
    map(() => contact),
    catchError(this.handleError)
  );
}

getPhoneBook(id:number):Observable<PhoneBook>{
  const url = `${this.apiurl}/${id}`;
  return this.http.get<PhoneBook>(url).pipe(
    catchError(this.handleError)
  );
}


deletePhoneBook(id: number): Observable<PhoneBook> {
  const url = `${this.apiurl}/${id}`;
  return this.http.delete<PhoneBook>(url, this.httpOptions).pipe(
    catchError(this.handleError)
  );
}


}
