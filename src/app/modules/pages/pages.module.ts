import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { AtomsModule } from '../../shared/atoms/atoms.module';
import { LoginComponent } from './login/login.component';
import { MoleculesModule } from '../../shared/molecules/molecules.module';
import { PagesRoutingModule } from './pages-routing.module';
import { OrganismsModule } from '../../shared/organisms/organisms.module';

@NgModule({
	declarations: [HomeComponent, LoginComponent],
	imports: [
		CommonModule,
		AtomsModule,
		MoleculesModule,
		PagesRoutingModule,
		OrganismsModule,
	],
})
export class PagesModule {}
