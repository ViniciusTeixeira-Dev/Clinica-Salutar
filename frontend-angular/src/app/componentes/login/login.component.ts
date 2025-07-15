import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginService } from '../../servicos/login.service';
import { Usuario } from '../../model/Usuario';
import { FormsModule } from '@angular/forms';
import { SalutarToken } from '../../model/SalutarToken';
import { WaitIconComponent } from '../wait-icon/wait-icon.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, WaitIconComponent, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public usuario: Usuario = new Usuario;
  public loading: boolean = false;
  public mensagem: string = "";
  public constructor(private route:Router, private service: LoginService){

  }

  public logar(){
      this.loading = true;
      this.service.efetuarLogin(this.usuario).subscribe({
        
       next: (res: SalutarToken) => {
            this.loading = false;
            localStorage.setItem("SalutarTK", res.token);
            this.route.navigate(['main']);
        },
       error: (err: any) => {
          this.mensagem = "Usuario/Senha Invalidos";
          this.loading = false;
        }
      }
      );
  }
}
