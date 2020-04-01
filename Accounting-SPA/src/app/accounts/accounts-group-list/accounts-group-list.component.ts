import { Component, OnInit } from '@angular/core';
import { AccountGroup } from 'src/app/_models/accountgroup';
import { AccountsService } from 'src/app/_services/accounts.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-accounts-group-list',
  templateUrl: './accounts-group-list.component.html',
  styleUrls: ['./accounts-group-list.component.css']
})
export class AccountsGroupListComponent implements OnInit {
accountGroups: AccountGroup[];
pagination: Pagination;
showingItemFrom: any;
showingItemTo: any;
  constructor(private accountService: AccountsService, private alertify: AlertifyService,
    private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
    this.accountGroups = data['accountGroups'].result;
    this.pagination = data['accountGroups'].pagination;
    });
    this.calculateShowingFromTo();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadAccountGroups();
    this.calculateShowingFromTo();
  }

  calculateShowingFromTo() {
    this.showingItemFrom =  (this.pagination.currentPage.valueOf() - 1) *
      this.pagination.itemsPerPage.valueOf() + 1;
    this.showingItemTo = ((this.pagination.currentPage.valueOf() - 1) *
      this.pagination.itemsPerPage.valueOf() + this.pagination.itemsPerPage.valueOf()) < this.pagination.totalItems ?
      ((this.pagination.currentPage.valueOf() - 1) *
      this.pagination.itemsPerPage.valueOf() + this.pagination.itemsPerPage.valueOf()) :
      this.pagination.totalItems;
  }

  loadAccountGroups() {
    this.accountService
      .getGroupAccoutPaginatedList(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe((res: PaginatedResult<AccountGroup[]>) => {
      this.accountGroups = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }

  deleteAccountGroup(id: number) {
    this.alertify.confirm('Are you sure! you want to delete the message?' , () => {
      this.accountService.deleteAccountGroup(id , this.authService.decodedToken.nameid).subscribe(() => {
        this.accountGroups.splice(this.accountGroups.findIndex(m => m.id === id), 1);
        this.alertify.success('Message has been deleted!');
      }, error => {
        this.alertify.error('Failed to delete the message!');
      });
    });
  }
}
