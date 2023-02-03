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

	async recharge(userId: string, amount: number) {
		const user = (
			await getDoc(doc(this.firestore, `users/${userId}`))
		).data() as User;

		if (!user) return false;

		const todayAmount = user.recharges
			?.filter((r) => {
				const date = new Date(r.performedAt);
				const currentDate = new Date();

				return date.getDate() === currentDate.getDate();
			})
			.reduce((acc, current) => acc + current.amount, 0)!;

		if (todayAmount + amount < 200) console.log('xd');

		return true;
	}

	saveUser(user: User) {
		const userRef = doc(collection(this.firestore, 'users'), user.uid);

		return setDoc(userRef, user);
	}
}
