import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlawlessComponent } from './flawless/flawless.component';
import { RegistrationComponent } from './registration/registration.component';
import { BughuntComponent } from './bughunt/bughunt.component';
import { CryptoquestComponent } from './cryptoquest/cryptoquest.component';
import { WebdesignComponent } from './webdesign/webdesign.component';
import { EventspageComponent } from './eventspage/eventspage.component';
import { CompileandrunComponent } from './compileandrun/compileandrun.component';

const routes: Routes = [
  { path: '', redirectTo: '/registration', pathMatch: 'full' },
  { path: 'registration', component: RegistrationComponent, pathMatch: 'full' },
  { path: 'flawless', component: FlawlessComponent, pathMatch: 'full' },
  { path: 'bughunt', component: BughuntComponent, pathMatch: 'full' },
  { path: 'cryptoquest', component: CryptoquestComponent, pathMatch: 'full' },
  { path: 'webdesign', component: WebdesignComponent, pathMatch: 'full' },
  { path: 'eventspage', component: EventspageComponent, pathMatch: 'full' },
  { path: 'compiler', component: CompileandrunComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
