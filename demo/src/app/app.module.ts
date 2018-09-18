import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { HomeComponent } from './home/home.component';
import { NgRocketPartsModule } from '../../../projects/ng-rocketparts/src/lib/ng-rocketparts.module';

@NgModule({
    declarations: [AppComponent, HomeComponent],
    imports: [BrowserModule, routing, NgRocketPartsModule],
    bootstrap: [AppComponent]
})
export class AppModule {}
