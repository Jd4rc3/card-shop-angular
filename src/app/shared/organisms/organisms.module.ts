import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeckComponent } from './deck/deck.component';
import { AtomsModule } from '../atoms/atoms.module';
import { MoleculesModule } from '../molecules/molecules.module';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
	declarations: [DeckComponent, NavbarComponent],
	exports: [DeckComponent, NavbarComponent],
	imports: [CommonModule, AtomsModule, MoleculesModule],
})
export class OrganismsModule {}
