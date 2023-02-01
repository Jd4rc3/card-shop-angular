import { Component, OnInit } from '@angular/core';
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

	constructor(
		private readonly _userService: UserService,
		private readonly _authService: AuthService,
	) {}

	async ngOnInit() {
		const currentUser = this._authService.getCurrentUser();
		this.user = (await this._userService.findUser(currentUser!.uid!))!;
	}
}
