import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { PlayPageComponent } from './components/play-page/play-page.component';

const routes: Routes = [
  {path: '', component: WelcomePageComponent},
  {path: 'play', component: PlayPageComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    PlayPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [ RouterModule ]
})
export class AppModule { }
