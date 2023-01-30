import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { AtomsModule } from '../../shared/atoms/atoms.module';

@NgModule({
	declarations: [HomeComponent],
	imports: [CommonModule, PagesRoutingModule, AtomsModule],
})
export class PagesModule {}
