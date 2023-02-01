import { Component, Input, OnInit } from '@angular/core';
import { ListItem } from '../../atoms/list-item/list-item-model';

@Component({
	selector: 'app-nav-links',
	templateUrl: './nav-links.component.html',
	styleUrls: ['./nav-links.component.scss'],
})
export class NavLinksComponent implements OnInit {
	@Input()
	links: ListItem[] = [];

	constructor() {}

	ngOnInit(): void {}
}
