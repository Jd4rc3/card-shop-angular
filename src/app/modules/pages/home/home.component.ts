import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListItem } from 'src/app/shared/atoms/list-item/list-item-model';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../core/domain/entities/user.model';
import { UserService } from '../../core/services/user.service';

@Component({
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	user!: User;

	listItems: ListItem[] = [
		{ label: 'Home', value: '/game/home' },
		{ label: 'Shop', value: '/game/shop' },
	];

	navBarIcons = [['fa-solid', 'fa-right-from-bracket']];

	constructor(
		private readonly _router: Router,
		private readonly _userService: UserService,
		private readonly _authService: AuthService,
	) {}

	async ngOnInit() {
		const currentUser = this._authService.getCurrentUser();
		this.user = (await this._userService.findUser(currentUser!.uid!))!;
	}

	signOut() {
		this._authService
			.logOut()
			.then(() => this._router.navigate(['/signin']));
	}
}
