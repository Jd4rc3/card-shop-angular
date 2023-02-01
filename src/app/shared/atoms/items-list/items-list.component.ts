import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-items-list',
	templateUrl: './items-list.component.html',
	styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent implements OnInit {
	@Input()
	classList: string[] = [];

	constructor() {}

	ngOnInit(): void {}
}
