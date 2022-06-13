import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.prod";
import { Observable } from "rxjs";
@Injectable()
export class marcadoresProvider {
    AppUrl: string = environment.urlApp;
    Apiurl: string = environment.urlApi;

    constructor(private http: HttpClient) {
    }
    GetMarcadores(): Observable<any> {
        return this.http.get(this.AppUrl + this.Apiurl);
    }
}