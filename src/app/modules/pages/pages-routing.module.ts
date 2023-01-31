import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import {
	canActivate,
	redirectLoggedInTo,
	redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'signin',
				component: LoginComponent,
				...canActivate(() => redirectLoggedInTo(['/shop/home'])),
			},
			{
				path: 'home',
				component: HomeComponent,
				...canActivate(() => redirectUnauthorizedTo(['/shop/signin'])),
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
