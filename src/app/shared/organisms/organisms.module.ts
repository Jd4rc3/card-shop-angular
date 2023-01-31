import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeckComponent } from './deck/deck.component';
import { BalanceComponent } from './balance/balance.component';
import { UserDataComponent } from './user-data/user-data.component';

@NgModule({
	declarations: [DeckComponent, BalanceComponent, UserDataComponent],
	exports: [DeckComponent, BalanceComponent, UserDataComponent],
	imports: [CommonModule],
})
export class OrganismsModule {}
