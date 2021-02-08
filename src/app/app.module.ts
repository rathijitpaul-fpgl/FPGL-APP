import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { HomepageComponent } from './homepage/homepage.component';
import { RouterModule } from '@angular/router';
import { CtrComponent } from './ctr/ctr.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CtrService } from './services/ctr-service.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ZippyComponent } from './zippy/zippy.component';
import { ChartsModule } from 'ng2-charts';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import {InterceptorService} from './loader/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomepageComponent,
    CtrComponent,
    ContactComponent,
    ZippyComponent,
    BarChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    LayoutModule,
    ChartsModule,
    RouterModule.forRoot([
      {
        path: '', component: HomepageComponent
      },
      {
        path: 'ctr', component: CtrComponent
      },
      {
        path: 'contact', component: ContactComponent
      },
      {
        path: '**', component: HomepageComponent
      }
    ])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true
    },
    CtrService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
