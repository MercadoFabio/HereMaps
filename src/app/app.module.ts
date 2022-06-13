import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'


import { AppComponent } from './app.component';
import { MapaComponent } from './Mapa/mapa.component';
import { marcadoresProvider } from './providers/marcadorProvider';

@NgModule({
  declarations: [
    AppComponent,
    MapaComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    
  ],
  providers: [marcadoresProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
