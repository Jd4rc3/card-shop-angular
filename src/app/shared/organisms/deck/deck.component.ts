import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/modules/core/domain/entities/card.model';

@Component({
	selector: 'app-deck',
	templateUrl: './deck.component.html',
	styleUrls: ['./deck.component.scss'],
})
export class DeckComponent implements OnInit {
	@Input()
	card!: Card;

	constructor() {}

	ngOnInit(): void {}
}
