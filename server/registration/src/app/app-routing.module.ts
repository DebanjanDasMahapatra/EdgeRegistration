import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { FlawlessComponent } from './flawless/flawless.component';
import { BughuntComponent } from './bughunt/bughunt.component';
import { CryptoquestComponent } from './cryptoquest/cryptoquest.component';
import { WebdesignComponent } from './webdesign/webdesign.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'flawless', component: FlawlessComponent },
  { path: 'bughunt', component: BughuntComponent },
  { path: 'cryptoquest', component: CryptoquestComponent },
  { path: 'webdesign', component: WebdesignComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
