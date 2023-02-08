import { LoginComponent } from './components/common/login/login.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SidenavComponent } from './components/misc/sidenav/sidenav.component';
import { AdminDashComponent } from './components/admin/admin-dash/admin-dash.component';
import { NavbarComponent } from './components/misc/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { ManagerDetailsComponent } from './components/admin/manager-details/manager-details.component';
import { UserDetailsComponent } from './components/admin/user-details/user-details.component';
import { SportsDetailsComponent } from './components/admin/sports-details/sports-details.component';
import { ProfileDetsComponent } from './components/misc/profile-dets/profile-dets.component';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './angular-material.module';
import { UsersComponent } from './components/admin/users/users.component';
import { AddSportsComponent } from './components/admin/add-sports/add-sports.component';
import { ApprovalDetailsComponent } from './components/manager/approval-details/approval-details.component';
import { BatchDetailsComponent } from './components/manager/batch-details/batch-details.component';
import { ManagerDashComponent } from './components/manager/manager-dash/manager-dash.component';
import { OfferDetailsComponent } from './components/manager/offer-details/offer-details.component';
import { ApplyRenewMembershipComponent } from './components/user/apply-renew-membership/apply-renew-membership.component';
import { EnrolledDetailsComponent } from './components/user/enrolled-details/enrolled-details.component';
import { MembershipDetailsComponent } from './components/user/membership-details/membership-details.component';
import { UserDashComponent } from './components/user/user-dash/user-dash.component';
import { RegisterComponent } from './components/common/register/register.component';
import { SportsComponent } from './components/common/sports/sports.component';
import { SportCategoryComponent } from './components/common/sport-category/sport-category.component';
import { PaymentComponent } from './components/common/payment/payment.component';
import { MessageDisplayComponent } from './components/common/message-display/message-display.component';
import { HomepageComponent } from './components/common/homepage/homepage.component';
import { FeedbackComponent } from './components/misc/feedback/feedback.component';
import { LikeCommentLogsComponent } from './components/user/like-comment-logs/like-comment-logs.component';
import { LikeCommentLogsAdminComponent } from './components/admin/like-comment-logs-admin/like-comment-logs-admin.component';
import { FeedbackDetailsComponent } from './components/admin/feedback-details/feedback-details.component';
import { FooterComponent } from './components/misc/footer/footer.component';

import { ChangePasswordComponent } from './components/common/change-password/change-password.component';

import { AddManagerComponent } from './components/admin/add-manager/add-manager.component';
import { OtpComponent } from './components/common/otp/otp.component';
import { EditManagerComponent } from './components/admin/edit-manager/edit-manager.component';
import { EditSportsComponent } from './components/admin/edit-sports/edit-sports.component';
import { ActivityComponent } from './components/misc/activity/activity.component';
import { GalleryComponent } from './components/misc/gallery/gallery.component';

import { AddBatchComponent } from './components/manager/add-batch/add-batch.component';
import { AddOfferComponent } from './components/manager/add-offer/add-offer.component';
import { EditBatchComponent } from './components/manager/edit-batch/edit-batch.component';
import { EditOfferComponent } from './components/manager/edit-offer/edit-offer.component';

import { TempMessageComponent } from './components/misc/temp-message/temp-message.component';
import { ForgetPassComponent } from './components/misc/forget-pass/forget-pass.component';

import { NgxCaptchaModule } from 'ngx-captcha';
import { ToastrModule } from 'ngx-toastr';
import { AboutUsComponent } from './components/misc/about-us/about-us.component';
import { ContactUsComponent } from './components/misc/contact-us/contact-us.component';
// import {FlexLayoutModule} from '@angular/flex-layout'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidenavComponent,
    AdminDashComponent,
    ManagerDetailsComponent,
    UserDetailsComponent,
    SportsDetailsComponent,
    ProfileDetsComponent,
    UsersComponent,
    AddSportsComponent,
    ApprovalDetailsComponent,
    BatchDetailsComponent,
    ManagerDashComponent,
    OfferDetailsComponent,
    ApplyRenewMembershipComponent,
    EnrolledDetailsComponent,
    MembershipDetailsComponent,
    UserDashComponent,
    LoginComponent,
    RegisterComponent,
    SportCategoryComponent,
    SportsComponent,
    PaymentComponent,
    MessageDisplayComponent,
    HomepageComponent,
    FeedbackComponent,
    LikeCommentLogsComponent,
    LikeCommentLogsAdminComponent,
    FeedbackDetailsComponent,
    FooterComponent,
    ChangePasswordComponent,
    AddManagerComponent,
    OtpComponent,
    EditManagerComponent,
    EditSportsComponent,

    ActivityComponent,
    GalleryComponent,

    AddBatchComponent,
    AddOfferComponent,
    EditBatchComponent,
    EditOfferComponent,
    TempMessageComponent,
    ForgetPassComponent,

    AboutUsComponent,
    ContactUsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    ToastrModule.forRoot({
      timeOut: 2500,
      maxOpened: 0,
      // autoDismiss: true,
      //  preventDuplicates: true,
    }),
    // FlexLayoutModule
  ],
  entryComponents: [MessageDisplayComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
