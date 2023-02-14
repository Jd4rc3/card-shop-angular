import { Component, OnInit, ViewChild } from "@angular/core";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import { SweetAlertResult } from "sweetalert2";
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
	) { }

	ngOnInit(): void {
		this._cardService.findAvailableCards().subscribe((cards) => {
			this.availableCards = cards;
		});
	}

	@ViewChild('right')
	rightAlert!: SwalComponent;

	@ViewChild('wrong')
	wrongAlert!: SwalComponent;

	@ViewChild('confirm')
	confirmAlert!: SwalComponent;


	async purchaseCard(card: Card) {
		const response: SweetAlertResult = await this.confirmAlert.fire();

		if (response.isConfirmed) {
			const result = await this._cardService
				.purchaseCard(card.uid, this._authService.getCurrentUser()!.uid)

			if (result.success) {
				this.rightAlert.title = "Success";
				this.rightAlert.text = result.message;

				this.rightAlert.fire();

				return;
			}

			this.wrongAlert.title = "Something went wrong";
			this.wrongAlert.text = result.message;
			this.wrongAlert.fire();
		}
	}
}
