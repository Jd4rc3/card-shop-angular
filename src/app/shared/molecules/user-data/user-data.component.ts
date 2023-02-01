import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/modules/core/domain/entities/user.model';

@Component({
	selector: 'app-user-data',
	templateUrl: './user-data.component.html',
	styleUrls: ['./user-data.component.scss'],
})
export class UserDataComponent implements OnInit {
	@Input() userData!: User;

	constructor() {}

	ngOnInit(): void {}
}
