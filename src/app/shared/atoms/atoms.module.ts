import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { IconComponent } from './icon/icon.component';
import { TitleComponent } from './title/title.component';
import { ParagraphComponent } from './paragraph/paragraph.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { CardBodyComponent } from './card-body/card-body.component';
import { CardHeaderComponent } from './card-header/card-header.component';
import { CardFooterComponent } from './card-footer/card-footer.component';
import { ListItemComponent } from './list-item/list-item.component';
import { AvatarComponent } from './avatar/avatar.component';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [
		ButtonComponent,
		IconComponent,
		TitleComponent,
		ParagraphComponent,
		ItemsListComponent,
		CardBodyComponent,
		CardHeaderComponent,
		CardFooterComponent,
		ListItemComponent,
		AvatarComponent,
	],
	exports: [
		TitleComponent,
		ParagraphComponent,
		IconComponent,
		ButtonComponent,
		ItemsListComponent,
		CardBodyComponent,
		CardHeaderComponent,
		CardFooterComponent,
		ItemsListComponent,
		AvatarComponent,
		ListItemComponent,
	],
	imports: [CommonModule, RouterModule],
})
export class AtomsModule {}
