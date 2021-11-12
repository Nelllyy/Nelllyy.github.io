import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

    readonly baseUrl = 'https://opentdb.com';

    constructor(private httpClient: HttpClient) { }

    getCategories() {
        return this.httpClient.get(`${this.baseUrl}/api_category.php`);
    }

    getQuestion(amount: number) {
        return this.httpClient.get(`${this.baseUrl}/api.php?amount=${amount}`)
    }
}
