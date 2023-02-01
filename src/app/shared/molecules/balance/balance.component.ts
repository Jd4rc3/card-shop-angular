import { Component, Input, OnInit } from '@angular/core';
import { Recharge } from 'src/app/modules/core/domain/entities/recharge.model';
import { ListItem } from '../../atoms/list-item/list-item-model';

@Component({
	selector: 'app-balance',
	templateUrl: './balance.component.html',
	styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent implements OnInit {
	@Input() balance: number = 0;

	@Input() recharges: Recharge[] = [];

	items!: ListItem[];

	constructor() {}

	ngOnInit(): void {
		this.items = this.recharges.map((r) => ({
			label: `${r.amount} - ${new Date(r.performedAt).toLocaleString()}`,
			value: r.uid,
		}));
	}
}
