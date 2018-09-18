import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'ngrp-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    test$: Observable<string> = of('Observable string');

    constructor() {}

    ngOnInit(): void {}
}
