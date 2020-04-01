import { Component, OnInit, HostListener } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AccountGroup } from 'src/app/_models/accountgroup';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { AccountsService } from 'src/app/_services/accounts.service';

@Component({
  selector: 'app-account-group-edit',
  templateUrl: './account-group-edit.component.html',
  styleUrls: ['./account-group-edit.component.css']
})
export class AccountGroupEditComponent implements OnInit {
  editForm: FormGroup;
  accountGroup: AccountGroup;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
}

  constructor(private route: ActivatedRoute, private alertify: AlertifyService, private fb: FormBuilder,
    private accountsService: AccountsService, private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.accountGroup = data['accountGroup'];
    });
    this.createEditForm();
}

   createEditForm() {
     this.editForm = this.fb.group({
       type: [this.accountGroup.type],
       code: [this.accountGroup.code, [Validators.required, Validators.maxLength(1)]],
       name: [this.accountGroup.name, Validators.required],
       description: [this.accountGroup.description]
     });
   }

updateAccountGroup() {
  this.accountsService.updateAccountGroup(this.accountGroup.id, this.authService.decodedToken.nameid, this.accountGroup).subscribe(next => {
    this.alertify.success('Account Group updated successfully!');
    this.editForm.reset(this.accountGroup);
  }, error => {
    console.log(this.accountGroup.id);
    console.log(this.authService.decodedToken.nameid);
    console.log(this.accountGroup);
    this.alertify.error(error);
  });
}

}
