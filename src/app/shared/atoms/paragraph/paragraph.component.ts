import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-paragraph',
	templateUrl: './paragraph.component.html',
	styleUrls: ['./paragraph.component.scss'],
})
export class ParagraphComponent implements OnInit {
	@Input() textContent: string = '';

	@Input() classList: string[] = [];

	constructor() {}

	ngOnInit(): void {}
}
