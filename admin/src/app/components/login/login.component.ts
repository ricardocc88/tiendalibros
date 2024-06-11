import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'console';
import { title } from 'process';
import { AdminService } from 'src/app/services/admin.service';

declare var jQquery:any;
declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user : any = {};
  public usuario : any = {};
  public token : any = {};


  constructor(
    private _adminService: AdminService,
    private _router: Router
  ) {
     this.token = this._adminService.getToken();

  }

  ngOnInit(): void {
    console.log(this.token);
    if(this.token){
      this._router.navigate(['/']);

  }else{
    // MAntener en el componente
  }
}



  login(loginForm: { valid: any }) {
    if (loginForm.valid) {
      let data = {
        email: this.user.email,
        password: this.user.password
      };

      this._adminService.login_admin(data).subscribe(
        response => {
          console.log(response);
          if(response.data == undefined){
            iziToast.show({
              title: 'ERROR',
              titleColor: '#FF0000',
              class: 'text-danger',
              position: 'topRight',
              message: response.message
            });
          }
          else{
            this.usuario = response.data;
            localStorage.setItem('token',response.token);
            localStorage.setItem('_id',response.data._id);
  
            this._router.navigate(['/']);
  
          }
          console.log(response);
        }, 
  
        
        error => {
          console.log(error);
           
        }
      );
      }else{
    iziToast.show({
        title:'ERROR',
        titleColor:'#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos del formulario no son validos',
      
    });
    
  
  }

  }

}




    
  
