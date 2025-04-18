import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonModule } from './features/pokemon/pokemon.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardComponent } from './shared/components/card/card.component';
import { SearchBarComponent } from './shared/components/search-bar/search-bar.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PokemonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CardComponent,
    SearchBarComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
