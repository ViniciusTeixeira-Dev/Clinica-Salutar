import { Component, OnInit } from '@angular/core';
import { FichaPaciente } from '../../model/FichaPaciente';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WaitIconComponent } from '../wait-icon/wait-icon.component';
import { FichaService } from '../../servicos/ficha.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, WaitIconComponent, FormsModule, RouterModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

public lista: FichaPaciente[] = [];
public keyword: string = "";
public loading: boolean = false;
public constructor(private fichaService: FichaService, private router: Router) {

}
  
ngOnInit(): void {

    this.todosPacientes();

  }

  public pesquisar(){
    this.loading = true;
    
    this.fichaService.buscarPacientes(this.keyword).subscribe({
      next: (res: FichaPaciente[]) => {
        this.loading = false;
        this.lista = res;
      },
      error: (err: any) => {
        if(err.status == 404){
          alert("Nao encontrei pacientes com este nome")
        }
        else{
          alert("Erro ao Buscar Paciente");
        }
        this.loading = false;
      }
   })
  }

  
  public adicionarFicha(): void{
    this.router.navigate(['ficha']);

  }

  public logout():void {
    localStorage.removeItem("SalutarTK");
    this.router.navigate(["/"]);
  }

  public todosPacientes(){
    this.fichaService.buscarTodosPacientes().subscribe({
      next: (res: FichaPaciente[]) => {
        this.lista = res;
      },
      error: (err : any) => {
        console.log(err);
      }
      });

   }

}
