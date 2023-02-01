import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-title',
	templateUrl: './title.component.html',
	styleUrls: ['./title.component.scss'],
})
export class TitleComponent implements OnInit {
	@Input('text')
	title: string = '';

	@Input()
	level: number = 1;

	@Input()
	classList: string[] = [];

	constructor() {}

	ngOnInit(): void {}
}
