import { Injectable } from '@angular/core';
import { collection, Firestore, setDoc } from '@angular/fire/firestore';
import { doc, getDoc } from '@firebase/firestore';
import { User } from '../domain/entities/user.model';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	constructor(private readonly firestore: Firestore) {}

	findUser(userId: string): Promise<User | undefined> {
		return getDoc(doc(this.firestore, `users/${userId}`)).then((d) =>
			d.data() ? (d.data() as User) : undefined,
		);
	}

	saveUser(user: User) {
		const userRef = doc(collection(this.firestore, 'users'), user.uid);

		return setDoc(userRef, user);
	}
}
