import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlawlessComponent } from './flawless/flawless.component';
import { RegistrationComponent } from './registration/registration.component';
import { BughuntComponent } from './bughunt/bughunt.component';
import { CryptoquestComponent } from './cryptoquest/cryptoquest.component';
import { WebdesignComponent } from './webdesign/webdesign.component';
import { SearchPipe } from './search.pipe';
import { EventspageComponent } from './eventspage/eventspage.component';
import { CompileandrunComponent } from './compileandrun/compileandrun.component';

@NgModule({
  declarations: [
    AppComponent,
    FlawlessComponent,
    RegistrationComponent,
    BughuntComponent,
    CryptoquestComponent,
    WebdesignComponent,
    EventspageComponent,
    SearchPipe,
    CompileandrunComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
