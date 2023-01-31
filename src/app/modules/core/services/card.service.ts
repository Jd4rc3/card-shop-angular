import { Injectable } from '@angular/core';
import {
	collectionData,
	Firestore,
	getDoc,
	query,
	setDoc,
	where,
} from '@angular/fire/firestore';
import { collection, CollectionReference, doc } from '@firebase/firestore';
import { uuidv4 } from '@firebase/util';
import { Observable } from 'rxjs';
import { Card } from '../domain/entities/card.model';
import { HistoryType } from '../domain/enums/historyType.model';
import { UserService } from './user.service';

@Injectable({
	providedIn: 'root',
})
export class CardService {
	private readonly _baseCollection: CollectionReference = collection(
		this.firestore,
		'pokemons',
	);

	constructor(
		private readonly firestore: Firestore,
		private readonly _userService: UserService,
	) {}

	findAvailableCards() {
		const qry = query(
			this._baseCollection,
			where('activeForSale', '==', true),
		);

		return collectionData(qry) as Observable<Card[]>;
	}

	findCard(cardId: string) {
		return getDoc(doc(this.firestore, `pokemons/${cardId}`)).then(
			(documentSnapshot) =>
				documentSnapshot.data()
					? (documentSnapshot.data() as Card)
					: undefined,
		);
	}

	saveCard(card: Card) {
		const cardRef = doc(collection(this.firestore, 'pokemons'), card.uid);

		return setDoc(cardRef, card);
	}

	async purchaseCard(cardId: string, buyerId: string): Promise<boolean> {
		const pokemon = await this.findCard(cardId).catch((err) =>
			console.log({ err }),
		);

		const buyer = await this._userService
			.findUser(buyerId)
			.catch((err) => console.log({ err }));

		if (!(pokemon && buyer)) return false;

		pokemon.activeForSale = false;
		buyer.deck?.push(pokemon);

		this._userService.saveUser(buyer);

		pokemon.history.push({
			uid: uuidv4(),
			owner: {
				uid: buyer.uid,
				email: buyer.email,
				username: buyer.username,
				avatar: buyer.avatar,
			},
			type: HistoryType.PURCHASE,
		});

		this.saveCard(pokemon);

		return true;
	}

	async giftCard(ownerId: string, receiverId: string, cardId: string) {
		const owner = await this._userService.findUser(ownerId);
		const receiver = await this._userService.findUser(receiverId);
		const cardToGift = owner?.deck?.find((card) => card.uid == cardId);

		if (!(owner && receiver && cardToGift)) return false;

		owner.deck = owner?.deck?.filter((card) => card.uid !== cardId);
		receiver.deck?.push(cardToGift);

		await this._userService.saveUser(owner);
		await this._userService.saveUser(receiver);

		return true;
	}
}
