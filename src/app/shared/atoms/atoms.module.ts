import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { CardComponent } from './card/card.component';
import { IconComponent } from './icon/icon.component';

@NgModule({
	declarations: [ButtonComponent, CardComponent, IconComponent],
	exports: [IconComponent, ButtonComponent, CardComponent],
	imports: [CommonModule],
})
export class AtomsModule {}
