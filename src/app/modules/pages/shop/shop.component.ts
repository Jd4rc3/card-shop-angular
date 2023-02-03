import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Card } from '../../core/domain/entities/card.model';
import { CardService } from '../../core/services/card.service';

@Component({
	selector: 'app-shop',
	templateUrl: './shop.component.html',
	styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
	availableCards!: Card[];

	constructor(
		private readonly _cardService: CardService,
		private readonly _authService: AuthService,
	) {}

	ngOnInit(): void {
		this._cardService.findAvailableCards().subscribe((cards) => {
			this.availableCards = cards;
		});
	}

	purchaseCard(card: Card) {
		this._cardService
			.purchaseCard(card.uid, this._authService.getCurrentUser()!.uid)
			.then((response) => {
				if (response) console.log('comprado');
			});
	}
}
