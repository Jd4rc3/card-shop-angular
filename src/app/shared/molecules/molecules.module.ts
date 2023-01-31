import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginCardComponent } from './login-card/login-card.component';
import { AtomsModule } from '../atoms/atoms.module';

@NgModule({
	declarations: [LoginCardComponent],
	exports: [LoginCardComponent],
	imports: [CommonModule, AtomsModule],
})
export class MoleculesModule {}
