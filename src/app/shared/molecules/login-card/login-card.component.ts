import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-login-card',
	templateUrl: './login-card.component.html',
	styleUrls: ['./login-card.component.scss'],
})
export class LoginCardComponent implements OnInit {
	constructor() {}

	@Output('signIn') eventEmitter: EventEmitter<void> = new EventEmitter();

	emit() {
		this.eventEmitter.emit();
	}

	ngOnInit(): void {}
}
