import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileLoaderService {
  constructor(private http: HttpClient) {}

  /**
   * Loads a JSON file from assets/data.
   * @param fileName Name of the JSON file (without .json extension)
   * @returns Observable with the JSON data
   */
  getJsonData(fileName: string): Observable<any> {
    return this.http.get(`assets/data/${fileName}.json`);
  }
}