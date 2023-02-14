import { Component, OnInit, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../core/domain/entities/user.model';
import { UserService } from '../../core/services/user.service';

@Component({
	selector: 'app-user-dashboard',
	templateUrl: './user-dashboard.component.html',
	styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
	user!: User;

	@ViewChild('right')
	rightAlert!: SwalComponent;

	@ViewChild('wrong')
	wrongAlert!: SwalComponent;

	@ViewChild('rechargeSwal')
	alert!: SwalComponent;

	constructor(
		private readonly _userService: UserService,
		private readonly _authService: AuthService,
	) { }

	async ngOnInit() {
		const currentUser = this._authService.getCurrentUser();
		this._userService.streamToUser(currentUser!.uid!).subscribe((u) => { this.user = u })
	}


	async recharge(amount: string) {
		const uid = this._authService.getCurrentUser()?.uid;

		if (!uid) return;

		const response = await this._userService.recharge(uid, parseInt(amount));




		if (!response.success) {
			this.wrongAlert.title = "Something went wrong";
			this.wrongAlert.text = response.message;

			this.wrongAlert.fire();

			return;
		}

		this.rightAlert.title = "Success";
		this.rightAlert.text = response.message;


		this.rightAlert.fire();
	}

}
