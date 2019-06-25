import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgProgressModule, NgProgressComponent } from '@ngx-progressbar/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FlawlessComponent } from './flawless/flawless.component';
import { BughuntComponent } from './bughunt/bughunt.component';
import { CryptoquestComponent } from './cryptoquest/cryptoquest.component';
import { WebdesignComponent } from './webdesign/webdesign.component';
import { RegistrationComponent } from './registration/registration.component';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatTableModule, MatChipsModule, MatTooltipModule, MatSnackBarModule, MatSlideToggleModule, MatMenuModule, MatProgressSpinnerModule, MatToolbarModule } from '@angular/material';
import { EnrollmentService } from './enrollment.service';
import { UserInfoDialogComponent } from './user-info-dialog/user-info-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FlawlessComponent,
    BughuntComponent,
    CryptoquestComponent,
    WebdesignComponent,
    RegistrationComponent,
    RegisterDialogComponent,
    UserInfoDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgProgressModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatChipsModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    BrowserAnimationsModule
  ],
  providers: [EnrollmentService, NgProgressComponent],
  bootstrap: [AppComponent],
  entryComponents: [RegisterDialogComponent,UserInfoDialogComponent]
})
export class AppModule { }
