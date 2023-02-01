import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	constructor(
		private readonly _authService: AuthService,
		private readonly _router: Router,
	) {}

	ngOnInit(): void {}

	signIn() {
		this._authService.login().then(() => {
			this._router.navigate(['/game/home']);
		});
	}
}
