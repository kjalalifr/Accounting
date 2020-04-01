import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolver/member-detail.resolver';
import { MemberListResolver } from './_resolver/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolver/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes-guard';
import { ListsResolver } from './_resolver/lists.resolver';
import { MessagesResolver } from './_resolver/messages.resolver';
import { AccountsGroupListComponent } from './accounts/accounts-group-list/accounts-group-list.component';
import { AccountGroupListResolver } from './_resolver/accounts-grouplist.resolver';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountsGroupDetailComponent } from './accounts/accounts-group-detail/accounts-group-detail.component';
import { AccountGroupDetailResolver } from './_resolver/accounts-group-detail.resolver';
import { AccountGroupEditComponent } from './accounts/account-group-edit/account-group-edit.component';
import { AccountGroupEditResolver } from './_resolver/account-group-edit.resolver';
import { AccountGroupNewComponent } from './accounts/account-group-new/account-group-new.component';



export const appRoutes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'accounts/accountgroup/new', component: AccountGroupNewComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'members', component: MemberListComponent,
                resolve: {users: MemberListResolver}},
            {path: 'members/:id', component: MemberDetailComponent,
                resolve: {user: MemberDetailResolver}},
            {path: 'member/edit', component: MemberEditComponent,
                resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChanges]},
            {path: 'messages', component: MessagesComponent,
                resolve: {messages: MessagesResolver}},
            {path: 'lists', component: ListsComponent,
                resolve: {users: ListsResolver}},
            {path: 'accounts/accountgroup' , component: AccountsGroupListComponent,
                resolve: {accountGroups: AccountGroupListResolver}},
            {path: 'accounts/accountgroup/:id', component: AccountsGroupDetailComponent,
                resolve: {accountGroup: AccountGroupDetailResolver}},
            {path: 'accounts/accountgroup/edit/:id', component: AccountGroupEditComponent,
                resolve: {accountGroup: AccountGroupEditResolver}, canDeactivate: [PreventUnsavedChanges]},
        ]
    },
    {path: '**', redirectTo: 'home', pathMatch: 'full'},
];
