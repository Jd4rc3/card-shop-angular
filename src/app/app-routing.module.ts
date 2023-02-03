import { NgModule } from '@angular/core';
import { canActivate, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/pages/login/login.component';

const routes: Routes = [
	{
		path: 'game',
		loadChildren: () =>
			import('./modules/pages/pages.module').then((m) => m.PagesModule),
	},
	{
		path: 'signin',
		component: LoginComponent,
		...canActivate(() => redirectLoggedInTo(['game/home'])),
	},
	{ path: '**', redirectTo: 'game' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
