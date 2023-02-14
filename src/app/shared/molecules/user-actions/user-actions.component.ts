import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-user-actions',
	templateUrl: './user-actions.component.html',
	styleUrls: ['./user-actions.component.scss'],
})
export class UserActionsComponent implements OnInit {
	@Input()
	imageUrl: string = '';

	@Input()
	iconsList: string[][] = [];

	@Output('signOut')
	eventEmitter: EventEmitter<void> = new EventEmitter();

	constructor() {}

	ngOnInit(): void {}

	emit() {
		this.eventEmitter.emit();
	}
}
