import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AccountGroup } from '../_models/accountgroup';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Authorization': 'Bearer ' + localStorage.getItem('token')
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

getAccountGroup(id): Observable<AccountGroup> {
  return this.http.get<AccountGroup>(this.baseUrl + 'accounts/accountgroup/' + id);
}


getGroupAccoutPaginatedList(page? , itemsPerPage?): Observable<PaginatedResult<AccountGroup[]>> {
  const paginatedResult: PaginatedResult<AccountGroup[]> = new PaginatedResult<AccountGroup[]>();

  let params = new HttpParams();

  if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber' , page);
    params = params.append('pageSize' , itemsPerPage);
  }

  return this.http.get<AccountGroup[]>(this.baseUrl + 'accounts/accountgroup' , {observe: 'response' , params})
    .pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
}

updateAccountGroup(id: number, userId: number, accountGroup: AccountGroup) {
  return this.http.put(this.baseUrl + 'accounts/accountgroup/'  + userId + '/update/' + id, accountGroup);
}

deleteAccountGroup(id: number, userId: number) {
  return this.http.post(this.baseUrl + 'accounts/accountgroup/'  + userId + '/delete/' + id , {});
}

newAccountGroup(userId: number, accountGroup: AccountGroup) {
  return this.http.post(this.baseUrl + 'accounts/accountgroup/'  + userId + '/new', accountGroup);
}
}
