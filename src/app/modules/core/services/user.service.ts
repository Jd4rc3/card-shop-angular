import { Injectable } from '@angular/core';
import { collection, collectionData, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { doc, getDoc } from '@firebase/firestore';
import { User } from '../domain/entities/user.model';
import { TransactionStatusModel } from '../domain/valueObject/transaction.status.model';
import { Recharge } from '../domain/entities/recharge.model';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	constructor(private readonly firestore: Firestore) { }

	findUser(userId: string): Promise<User | undefined> {
		return getDoc(doc(this.firestore, `users/${userId}`)).then((d) =>
			d.data() ? (d.data() as User) : undefined,
		);
	}

	streamToUser(userId: string) {
		return docData(doc(this.firestore, `users/${userId}`)) as Observable<User>;
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

				const stringDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
				const now = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`

				return stringDate === now;
			})
			.reduce((acc, current) => acc + Number(current.amount), 0);

		return (todayAmount! + amount) <= 200;
	}

	saveUser(user: User): Promise<void> {
		const userRef = doc(collection(this.firestore, 'users'), user.uid);

		return setDoc(userRef, user);
	}
}
