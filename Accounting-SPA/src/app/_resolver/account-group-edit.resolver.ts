import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AccountGroup } from '../_models/accountgroup';
import { AccountsService } from '../_services/accounts.service';

@Injectable()
export class AccountGroupEditResolver implements Resolve<AccountGroup> {
    constructor (private accountService: AccountsService,
        private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<AccountGroup> {
        return this.accountService.getAccountGroup(route.params['id']).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data!');
                this.router.navigate(['/accounts']);
                return of(null);
            })
        );
    }
}
