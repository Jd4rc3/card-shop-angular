import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginCardComponent } from './login-card/login-card.component';
import { AtomsModule } from '../atoms/atoms.module';
import { BalanceComponent } from './balance/balance.component';
import { UserDataComponent } from './user-data/user-data.component';
import { CardComponent } from './card/card.component';
import { NavLinksComponent } from './nav-links/nav-links.component';
import { UserActionsComponent } from './user-actions/user-actions.component';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [
		LoginCardComponent,
		BalanceComponent,
		UserDataComponent,
		CardComponent,
		NavLinksComponent,
		UserActionsComponent,
	],
	exports: [
		LoginCardComponent,
		BalanceComponent,
		UserDataComponent,
		CardComponent,
		NavLinksComponent,
		UserActionsComponent,
	],
	imports: [CommonModule, AtomsModule, RouterModule],
})
export class MoleculesModule {}
