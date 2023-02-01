import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		children: [
			{
				path: 'home',
				component: UserDashboardComponent,
				...canActivate(() => redirectUnauthorizedTo(['/signin'])),
			},
			{
				path: 'shop',
				component: ShopComponent,
				...canActivate(() => redirectUnauthorizedTo(['/signin'])),
			},
			{ path: '**', redirectTo: 'home' },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PagesRoutingModule {}
