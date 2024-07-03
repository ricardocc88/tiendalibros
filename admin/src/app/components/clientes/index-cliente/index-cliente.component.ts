import { Component, OnInit } from '@angular/core';
import { error } from 'console';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-index-cliente',
  templateUrl: './index-cliente.component.html',
  styleUrls: ['./index-cliente.component.css']
})
export class IndexClienteComponent implements OnInit {

  public clientes : Array<any>=[];
  public filtro_apellidos = '';
  public filtro_correo = '';
  public filtro_nombres = '';

  public pageSize = 2;
  public page = 1;

  constructor(
    private _clienteService : ClienteService
  ) { }

  ngOnInit(): void {
    this.init_Data();
  }
  init_Data(){
    this._clienteService.listar_clientes_filtro_admin(null,null).subscribe(
      response=>{
        
        this.clientes = response.data;

        console.log(response);
      },
      error=>{
        console.log(error)
      }
    )
  }

  filtro(tipo: any){

    console.log(tipo);
    console.log(this.filtro_nombres);
    console.log(this.filtro_apellidos);
    console.log(this.filtro_correo);
    

    if(tipo == 'apellidos'){
      this._clienteService.listar_clientes_filtro_admin(tipo,this.filtro_apellidos).subscribe(
        response=>{
          this.clientes = response.data;
          console.log(this.clientes);

        },
        error=>{
          console.log(error);
        }
      );
    }else if(tipo== 'correo'){
      this._clienteService.listar_clientes_filtro_admin(tipo,this.filtro_correo).subscribe(
        response=>{
          this.clientes = response.data;
          console.log(this.clientes);
        },error=>{
          console.log(error);
        }
      );
    }else if(tipo == 'nombres'){
      this._clienteService.listar_clientes_filtro_admin(tipo, this.filtro_nombres).subscribe(
        response=>{
          this.clientes = response.data;
          console.log(this.clientes);
        },error =>{
          console.log(error);
        }
      )
    }
    else{
      this.init_Data();
    }

  }

}