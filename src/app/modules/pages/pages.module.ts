import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeComponent } from "./home/home.component";
import { AtomsModule } from "../../shared/atoms/atoms.module";
import { LoginComponent } from "./login/login.component";
import { MoleculesModule } from "../../shared/molecules/molecules.module";
import { PagesRoutingModule } from "./pages-routing.module";
import { OrganismsModule } from "../../shared/organisms/organisms.module";
import { UserDashboardComponent } from "./user-dashboard/user-dashboard.component";
import { ShopComponent } from "./shop/shop.component";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";

@NgModule({
	declarations: [
		HomeComponent,
		LoginComponent,
		UserDashboardComponent,
		ShopComponent,
	],
	imports: [
		CommonModule,
		AtomsModule,
		MoleculesModule,
		PagesRoutingModule,
		OrganismsModule,
    SweetAlert2Module
	],
	exports: [LoginComponent],
})
export class PagesModule {}
