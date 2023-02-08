import { UserGuardService } from './services/user-guard/user-guard.service';
import { ManagerGuardService } from './services/manager-guard/manager-guard.service';
import { AdminGuardService } from './services/admin-guard/admin-guard.service';
import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { AdminDashComponent } from './components/admin/admin-dash/admin-dash.component';

import { ManagerDetailsComponent } from './components/admin/manager-details/manager-details.component';
import { NavbarComponent } from './components/misc/navbar/navbar.component';
import { ProfileDetsComponent } from './components/misc/profile-dets/profile-dets.component';
import { SportsDetailsComponent } from './components/admin/sports-details/sports-details.component';
import { UserDetailsComponent } from './components/admin/user-details/user-details.component';
import { SidenavComponent } from './components/misc/sidenav/sidenav.component';
import { UsersComponent } from './components/admin/users/users.component';
import { AddSportsComponent } from './components/admin/add-sports/add-sports.component';
import { ManagerDashComponent } from './components/manager/manager-dash/manager-dash.component';
import { ApprovalDetailsComponent } from './components/manager/approval-details/approval-details.component';
import { BatchDetailsComponent } from './components/manager/batch-details/batch-details.component';
import { OfferDetailsComponent } from './components/manager/offer-details/offer-details.component';
import { UserDashComponent } from './components/user/user-dash/user-dash.component';
import { EnrolledDetailsComponent } from './components/user/enrolled-details/enrolled-details.component';
import { MembershipDetailsComponent } from './components/user/membership-details/membership-details.component';
import { ApplyRenewMembershipComponent } from './components/user/apply-renew-membership/apply-renew-membership.component';
import { LoginComponent } from './components/common/login/login.component';
import { RegisterComponent } from './components/common/register/register.component';
import { SportCategoryComponent } from './components/common/sport-category/sport-category.component';
import { SportsComponent } from './components/common/sports/sports.component';
import { PaymentComponent } from './components/common/payment/payment.component';
import { HomepageComponent } from './components/common/homepage/homepage.component';
import { FeedbackComponent } from './components/misc/feedback/feedback.component';
import { LikeCommentLogsComponent } from './components/user/like-comment-logs/like-comment-logs.component';
import { LikeCommentLogsAdminComponent } from './components/admin/like-comment-logs-admin/like-comment-logs-admin.component';
import { FeedbackDetailsComponent } from './components/admin/feedback-details/feedback-details.component';

import { ChangePasswordComponent } from './components/common/change-password/change-password.component';

import { AddManagerComponent } from './components/admin/add-manager/add-manager.component';
import { EditManagerComponent } from './components/admin/edit-manager/edit-manager.component';
import { EditSportsComponent } from './components/admin/edit-sports/edit-sports.component';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ActivityComponent } from './components/misc/activity/activity.component';
import { GalleryComponent } from './components/misc/gallery/gallery.component';

import { AddBatchComponent } from './components/manager/add-batch/add-batch.component';
import { EditBatchComponent } from './components/manager/edit-batch/edit-batch.component';
import { AddOfferComponent } from './components/manager/add-offer/add-offer.component';
import { EditOfferComponent } from './components/manager/edit-offer/edit-offer.component';

import { OtpComponent } from './components/common/otp/otp.component';
import { TempMessageComponent } from './components/misc/temp-message/temp-message.component';
import { ForgetPassComponent } from './components/misc/forget-pass/forget-pass.component';
import { AboutUsComponent } from './components/misc/about-us/about-us.component';
import { ContactUsComponent } from './components/misc/contact-us/contact-us.component';
import { ToastrService } from 'ngx-toastr';

const routes: Routes = [
  // login
  {
    path: 'login',
    component: LoginComponent,
  },
  // register
  {
    path: 'register',
    component: RegisterComponent,
  },
  // sidebar
  {
    path: 'sidebar',
    component: SidenavComponent,
  },
  {
    path: 'navbar',
    component: NavbarComponent,
  },

  //default component
  {
    path: 'homepage',
    component: HomepageComponent,
  },
  {
    path: '',
    redirectTo: '/homepage',
    pathMatch: 'full',
  },

  //
  //

  // Dashboards -> ADMIN
  {
    path: 'admin',
    canActivate: [AdminGuardService],
    children: [
      {
        path: 'admin-dash',
        component: AdminDashComponent,
        canActivate: [AdminGuardService],
      },
      {
        path: 'manager-details',
        component: ManagerDetailsComponent,
        canActivate: [AdminGuardService],
      },
      {
        path: 'user-details',
        component: UserDetailsComponent,
        canActivate: [AdminGuardService],
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [AdminGuardService],
      },
      {
        path: 'sports-details',
        component: SportsDetailsComponent,
        canActivate: [AdminGuardService],
      },
      {
        path: 'like-comment-logs-admin',
        component: LikeCommentLogsAdminComponent,
        canActivate: [AdminGuardService],
      },
      {
        path: 'add-sports',
        component: AddSportsComponent,
        canActivate: [AdminGuardService],
      },
      {
        path: 'feedback-details',
        component: FeedbackDetailsComponent,
        canActivate: [AdminGuardService],
      },
      {
        path: 'addManager',
        component: AddManagerComponent,
        canActivate: [AdminGuardService],
      },
      {
        path: 'editManager/:id',
        component: EditManagerComponent,
        canActivate: [AdminGuardService],
      },
      {
        path: 'editSports/:id',
        component: EditSportsComponent,
        canActivate: [AdminGuardService],
      },
    ],
  },

  // Manager
  {
    path: 'manager',
    canActivate: [ManagerGuardService],
    children: [
      {
        path: 'manager-dash',
        component: ManagerDashComponent,
        canActivate: [ManagerGuardService],
      },
      {
        path: 'batch-details',
        component: BatchDetailsComponent,
        canActivate: [ManagerGuardService],
      },
      {
        path: 'offer-details',
        component: OfferDetailsComponent,
        canActivate: [ManagerGuardService],
      },
      {
        path: 'approval-details',
        component: ApprovalDetailsComponent,
        canActivate: [ManagerGuardService],
      },
      {
        path: 'addBatch',
        component: AddBatchComponent,
        canActivate: [ManagerGuardService],
      },
      {
        path: 'editBatch/:id',
        component: EditBatchComponent,
        canActivate: [ManagerGuardService],
      },
      {
        path: 'addOffer',
        component: AddOfferComponent,
        canActivate: [ManagerGuardService],
      },
      {
        path: 'editOffer/:id',
        component: EditOfferComponent,
        canActivate: [ManagerGuardService],
      },
    ],
  },

  // User
  {
    path: 'user',
    canActivate: [UserGuardService],
    children: [
      {
        path: 'user-dash',
        component: UserDashComponent,
        canActivate: [UserGuardService],
      },
      {
        path: 'enroller-details',
        component: EnrolledDetailsComponent,
        canActivate: [UserGuardService],
      },
      {
        path: 'membership-details',
        component: MembershipDetailsComponent,
        canActivate: [UserGuardService],
      },
      {
        path: 'apply-renew-details',
        component: ApplyRenewMembershipComponent,
        canActivate: [UserGuardService],
      },
      {
        path: 'like-comment-logs',
        component: LikeCommentLogsComponent,
        canActivate: [UserGuardService],
      },
      {
        path: 'payment',
        component: PaymentComponent,
        canActivate: [UserGuardService],
      },
      // sports of perticular category
      {
        path: 'sports/:sportsId',
        component: SportsComponent,
        canActivate: [UserGuardService],
      },
    ],
  },

  // Common accessible for all

  {
    path: 'gallery',
    component: GalleryComponent,
  },
  {
    path: 'otp/:switch',
    component: OtpComponent,
  },
  {
    path: 'temp-message/:email',
    component: TempMessageComponent,
  },
  {
    path: 'forget-pass/:email',
    component: ForgetPassComponent,
  },
  {
    path: 'aboutUs',
    component: AboutUsComponent,
  },
  {
    path: 'contactUs',
    component: AboutUsComponent,
  },
  {
    path: 'profile-dets',
    component: ProfileDetsComponent,
  },
  {
    path: 'profile-dets/changePass/:id',
    component: ChangePasswordComponent,
  },
  {
    path: 'activity',
    component: ActivityComponent,
  },
  // sport category indoor / outdoor
  {
    path: 'sport-category/:category',
    component: SportCategoryComponent,
  },
  // sports of perticular category
  {
    path: 'sports/:sportsId',
    component: SportsComponent,
  },
  {
    path: 'feedback',
    component: FeedbackComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor(private router: Router, private toastr: ToastrService) {
    this.router.errorHandler = (error: any) => {
      console.log(error);
      this.toastr.error('400 : Bad Request  ');
      this.router.navigate(['/']); // or redirect to default route
    };
  }
}
