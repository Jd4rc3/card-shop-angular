import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: 'shop',
		loadChildren: () =>
			import('./modules/pages/pages.module').then((m) => m.PagesModule),
	},
	{ path: '**', redirectTo: 'shop' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
