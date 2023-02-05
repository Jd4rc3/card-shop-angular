import { Injectable } from '@angular/core';
import { collection, Firestore, setDoc } from '@angular/fire/firestore';
import { doc, getDoc } from '@firebase/firestore';
import { User } from '../domain/entities/user.model';
import { TransactionStatusModel } from '../domain/valueObject/transaction.status.model';
import { Recharge } from '../domain/entities/recharge.model';

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

	async recharge(
		userId: string,
		amount: number,
	): Promise<TransactionStatusModel> {
		const user = (
			await getDoc(doc(this.firestore, `users/${userId}`))
		).data() as User;

		if (!user) return { message: 'User not found', success: false };

		if (!this.hasEnoughCreditToday(user, amount))
			return {
				message: 'You have reached the limit of recharge per day',
				success: false,
			};

		user.balance! += amount;

		user.recharges!.push({
			amount,
			performedAt: new Date().toISOString(),
		} as Recharge);

		try {
			this.saveUser(user);
		} catch (error) {
			return { message: `${error}`, success: false };
		}

		return { message: `${amount} recharged`, success: true };
	}

	private hasEnoughCreditToday(user: User, amount: number) {
		const todayAmount = user.recharges
			?.filter((r) => {
				const date = new Date(r.performedAt);
				const currentDate = new Date();

				return date.getDate() === currentDate.getDate();
			})
			.reduce((acc, current) => acc + current.amount, 0);

		return todayAmount! + amount <= 200;
	}

	saveUser(user: User): Promise<void> {
		const userRef = doc(collection(this.firestore, 'users'), user.uid);

		return setDoc(userRef, user);
	}
}
