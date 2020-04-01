import { Component, OnInit } from '@angular/core';
import { AccountGroup } from 'src/app/_models/accountgroup';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-accounts-group-detail',
  templateUrl: './accounts-group-detail.component.html',
  styleUrls: ['./accounts-group-detail.component.css']
})
export class AccountsGroupDetailComponent implements OnInit {
  accountGroup: AccountGroup;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.accountGroup = data['accountGroup'];
    });
  }

}
