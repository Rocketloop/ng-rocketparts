import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'home', component: HomeComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
    enableTracing: false,
    useHash: true
});
