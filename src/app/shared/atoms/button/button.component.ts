import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
	ngOnInit(): void {}

	@Output()
	eventEmitter: EventEmitter<void> = new EventEmitter();

	emit() {
		this.eventEmitter.emit();
	}
}
