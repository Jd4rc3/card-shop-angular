import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
	ngOnInit(): void { }

	@Output('buttonClick')
	eventEmitter: EventEmitter<void> = new EventEmitter();

	@Input('classes')
	classList: string[] = [];

	emit() {
		this.eventEmitter.emit();
	}
}
