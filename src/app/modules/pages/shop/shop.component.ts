import { Component, OnInit, ViewChild } from "@angular/core";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import { parseInt } from "lodash";
import { AuthService } from "../../auth/services/auth.service";
import { Card } from "../../core/domain/entities/card.model";
import { CardService } from "../../core/services/card.service";
import { UserService } from "../../core/services/user.service";

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
		private readonly _userService: UserService,
	) {}

	ngOnInit(): void {
		this._cardService.findAvailableCards().subscribe((cards) => {
			this.availableCards = cards;
		});
	}

	@ViewChild('right')
	rightAlert!: SwalComponent;

	@ViewChild('wrong')
	wrongAlert!: SwalComponent;

	@ViewChild('rechargeSwal')
	alert!: SwalComponent;

	async recharge(amount: string) {
		const uid = this._authService.getCurrentUser()?.uid;

		if (!uid) return;

		const response = await this._userService.recharge(uid, parseInt(amount));

		if (!response.success) {
			// this.wrongAlert.fire();
			// console.log(this.wrongAlert.title);
			console.log(this.alert);

			return;
		}

		// this.rightAlert.fire();
	}

	purchaseCard(card: Card) {
		this._cardService
			.purchaseCard(card.uid, this._authService.getCurrentUser()!.uid)
			.then((response) => {
				if (response) console.log("comprado");
			});
	}
}
