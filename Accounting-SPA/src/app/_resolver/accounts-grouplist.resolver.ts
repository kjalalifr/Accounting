import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AccountGroup } from '../_models/accountgroup';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AccountsService } from '../_services/accounts.service';

@Injectable()
export class AccountGroupListResolver implements Resolve<AccountGroup[]> {
    pageNumber = 1;
    pageSize = 5;

    constructor (private accountService: AccountsService,
        private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<AccountGroup[]> {
        return this.accountService.getGroupAccoutPaginatedList(this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data!');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
