import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AccountsService } from 'src/app/_services/accounts.service';
import { AuthService } from 'src/app/_services/auth.service';
import { AccountGroup } from 'src/app/_models/accountgroup';

@Component({
  selector: 'app-account-group-new',
  templateUrl: './account-group-new.component.html',
  styleUrls: ['./account-group-new.component.css']
})
export class AccountGroupNewComponent implements OnInit {
  newForm: FormGroup;
  accountGroup: AccountGroup;

  constructor(private route: ActivatedRoute, private alertify: AlertifyService, private fb: FormBuilder,
    private accountsService: AccountsService, private authService: AuthService) { }

  ngOnInit() {
   this.createNewForm();
  }


  createNewForm() {
    this.newForm = this.fb.group({
      type: ['ترازنامه ای'],
      code: ['', [Validators.required, Validators.maxLength(1)]],
      name: ['', Validators.required],
      description: ['']
    });
  }

newAccountGroup() {
 this.accountGroup = Object.assign({}, this.newForm.value);
 this.accountsService.newAccountGroup(this.authService.decodedToken.nameid, this.accountGroup).subscribe(next => {
   this.alertify.success('Account Group Added successfully!');
   this.newForm.reset(this.accountGroup);
 }, error => {
   console.log(this.accountGroup.id);
   console.log(this.authService.decodedToken.nameid);
   console.log(this.accountGroup);
   this.alertify.error(error);
 });
}
}
