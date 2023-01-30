import { Injectable } from '@angular/core';

import {
	User as GoogleUser,
	Auth,
	GoogleAuthProvider,
	signInWithPopup,
} from '@angular/fire/auth';

import {
	CollectionReference,
	doc,
	DocumentData,
	Firestore,
	getDoc,
	setDoc,
} from '@angular/fire/firestore';

import { collection } from '@firebase/firestore';
import { User } from '../../core/domain/entities/user.model';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private _userCollectionReference: CollectionReference = collection(
		this.firestore,
		'users',
	);

	constructor(
		private readonly auth: Auth,
		private readonly firestore: Firestore,
	) {}

	login(): Promise<void> {
		return signInWithPopup(this.auth, new GoogleAuthProvider()).then(
			async ({ user }) => {
				const savedUser = await this.findUser(user.uid);

				if (!savedUser) {
					this.saveUser({
						uid: user.uid,
						email: user.email!,
						avatar: user.photoURL!,
						username: user.displayName!,
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

	findUser(userId: string): Promise<User | undefined> {
		return getDoc(doc(this.firestore, `users/${userId}`)).then((d) =>
			d.data() ? (d.data() as User) : undefined,
		);
	}

	private saveUser(user: User): void {
		const userRef = doc(this._userCollectionReference, user.uid);

		setDoc(userRef, user).then();
	}

	logOut(): Promise<void> {
		return this.auth.signOut();
	}
}
