import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListItem } from '../../atoms/list-item/list-item-model';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
	@Input()
	links: ListItem[] = [];

	@Input()
	imageUrl: string = '';

	@Input()
	icons: string[][] = [];

	@Output('signOut')
	eventEmitter: EventEmitter<void> = new EventEmitter();

	constructor() {}

	ngOnInit(): void {}

	signOut() {
		console.log('navbar');

		this.eventEmitter.emit();
	}
}
