import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import {NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";


import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { InicioComponent } from './components/inicio/inicio.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { IndexClienteComponent } from './components/clientes/index-cliente/index-cliente.component';
import { CreateClienteComponent } from './components/clientes/create-cliente/create-cliente.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    SidebarComponent,
    LoginComponent,
    IndexClienteComponent,
    CreateClienteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpClientModule, // Solo importa HttpClientModule aquí, no HttpClient
    NgbPaginationModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }