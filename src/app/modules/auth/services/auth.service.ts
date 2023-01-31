import { Injectable } from '@angular/core';

import {
	User as GoogleUser,
	Auth,
	GoogleAuthProvider,
	signInWithPopup,
} from '@angular/fire/auth';

import { UserService } from '../../core/services/user.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(
		private readonly _userService: UserService,
		private readonly auth: Auth,
	) {}

	login(): Promise<void> {
		return signInWithPopup(this.auth, new GoogleAuthProvider()).then(
			async ({ user }) => {
				const savedUser = await this._userService.findUser(user.uid);

				if (!savedUser) {
					this._userService.saveUser({
						uid: user.uid,
						email: user.email || '',
						avatar: user.photoURL || '',
						username: user.displayName || '',
						balance: 0,
						deck: [],
						recharges: [],
					});
				}
			},
		);
	}

	getCurrentUser(): GoogleUser | null {
		return this.auth.currentUser;
	}

	logOut(): Promise<void> {
		return this.auth.signOut();
	}
}
