import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { Customer } from "../models/customer.model";
import { PaginatedResponse } from "../models/paginated-response.mode";

@Injectable({
    providedIn: 'root'
})

export class CustomerService{

    private _httpClient: HttpClient;
    private url = environment;

    constructor( httpClient:HttpClient  ){
        this._httpClient = httpClient;
    }
    save(item: Customer): Observable<any> {
        return this._httpClient.post(this.url.api + '/onsystem/customers', item);
    }
    update(item: Customer): Observable<any> {
        return this._httpClient.put(this.url.api + '/onsystem/customers', item);
    }
    findAll(): Observable<Array<Customer>> {
        return this._httpClient.get<Array<Customer>>(this.url.api + '/onsystem/customers');
    }
    findByDocumentNumber(documentNumber: string){
        return this._httpClient.get<Customer>(this.url.api + '/onsystem/customers/' + documentNumber);
    }
    deleteByDocumentNumber(documentNumber: string){
        return this._httpClient.patch(this.url.api + '/onsystem/customers/deactivation/' + documentNumber, {});
    }
    findAllPaginated(page: number, size: number): Observable<PaginatedResponse<Customer>> {
        const params = new HttpParams()
          .set('page', page.toString())
          .set('size', size.toString());
    
        return this._httpClient.get<PaginatedResponse<Customer>>(this.url.api + '/onsystem/customers/pageable', { params });
      }
      checkEmailExists(email: string): Observable<boolean> {
        return this._httpClient.get<boolean>(`${this.url.api}/onsystem/customers/check-email?email=${email}`);
      }
    
}