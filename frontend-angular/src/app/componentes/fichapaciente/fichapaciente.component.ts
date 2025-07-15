import { Component, OnInit } from '@angular/core';
import { FichaPaciente } from '../../model/FichaPaciente';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CepService } from '../../servicos/cep.service';
import { DadosCEP } from '../../model/DadosCEP';
import { WaitIconComponent } from '../wait-icon/wait-icon.component';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FichaService } from '../../servicos/ficha.service';
import { PathToFile } from '../../model/PathToFile';
import path from 'path';
import { UploadService } from '../../servicos/upload.service';
import { Midia } from '../../model/Midia';


@Component({
  selector: 'app-fichapaciente',
  standalone: true,
  imports: [CommonModule, FormsModule, WaitIconComponent],
  templateUrl: './fichapaciente.component.html',
  styleUrl: './fichapaciente.component.css'
})
export class FichapacienteComponent implements OnInit {

  public ficha: FichaPaciente;
  public loading: boolean = false;
  private idFicha : string = ""; 
  public msgModal: string = "";
  public estiloMsg: string = "";
  private pathTofile: PathToFile;
  private mode: string = "";
  public midiaDesc: string = "";


  public constructor(private cepService: CepService, 
                     private activatedRoute: ActivatedRoute, 
                     private fichaService : FichaService,
                     private router: Router,
                     private uploadService: UploadService){
    this.ficha = new FichaPaciente();
    this.ficha.linkFoto = "/assets/avatar.png";
    this.pathTofile = new PathToFile();
    
    this.idFicha = this.activatedRoute.snapshot.params["id"];
    if(this.idFicha != "NOVA"){
      this.loading = true;
      this.fichaService.buscarFichaPeloId(this.idFicha).subscribe({
        next: (res: FichaPaciente) => {
          this.loading = false;
          this.ficha = res;
        },
        error: (err: any) => {
          this.exibirModal("Erro ao Recuperar Ficha")
          this.loading = false;
        }
    });
    }

  }
  
  ngOnInit(): void {
  }

  public scroll(id: string){
    document.getElementById(id)?.scrollIntoView();
  }

  public buscarCep(){
    this.loading = true;
    let cep = this.ficha.cep.replaceAll("-", "").replaceAll(".", "");
    this.cepService.buscarCEP(cep).subscribe({
      next: (res: DadosCEP) => {
        this.loading = false;
        this.ficha.endereco = res.logradouro;
        this.ficha.cidade = res.localidade;
        this.ficha.estado = res.uf;
      },
      error: (err: any) => {
        this.exibirModal("CEP INVALIDO");
        this.loading = false;
      }
    });

  }

  public salvarFicha(){
    if(this.ficha.idFicha == 0){
      this.gravarNovaFicha(); 
    }
    else{
      this.atualizarFichaExistente();
    }
  }

  public atualizarFichaExistente(){
    this.loading = true;
    this.fichaService.atualizarFicha(this.ficha).subscribe({
        next : (res: FichaPaciente) => {
          this.exibirModal("Ficha Atualizada com Sucesso");
          this.loading = false;
          this.ficha = res;
          this.idFicha = this.ficha.idFicha.toString();

        },
        error : () => {
          this.loading = false;
          this.exibirModal("Erro ao atualizar a ficha");

        }
      });
  }

  public gravarNovaFicha(){
    this.loading = true;
    this.fichaService.cadastrarNovaFicha(this.ficha).subscribe({
        next : (res: FichaPaciente) => {
          this.loading = false;
          this.exibirModal("Ficha Cadastrada com Sucesso");
          this.ficha = res;
          this.idFicha = this.ficha.idFicha.toString();

        },
        error : () => {
          this.loading = false;
          this.exibirModal("Erro ao Cadastrar Nova Ficha");

        }
      });
  }

  public voltar(): void{
    this.router.navigate(['main']);
  }

  public realizarUpload(data: any): void{
    let file = data.target.files[0];
    let formData = new FormData();
    formData.append("arquivo", file ,file.name);
    this.loading = true;
    this.uploadService.uploadFile(formData).subscribe({
      next: (res: PathToFile) => {
        this.loading = false;
        this.pathTofile = res;
        this.exibirModal("Upload Realizado");
        if(this.mode == 'profile'){
          this.ficha.linkFoto = "/assets/midia/"+this.pathTofile.path;
          console.log(this.ficha.linkFoto);
        }
        else{
          let midia: Midia = new Midia();
          midia.descricao = this.midiaDesc;
          midia.linkMidia = "/assets/midia/" + this.pathTofile.path;
          this.ficha.midias.push(midia);

        }

      },
      error: (err: any) => {
        this.loading = false;
        this.exibirModal("Falha ao realizar Upload");
      }
    });
  }

  public exibirModal(mensagem: string): void{
    this.msgModal = mensagem;
    document.getElementById("btnModalAlerta")?.click();

  }

  public chamarUpload(mode : string):void{
    this.mode = mode;
    if(mode == 'profile'){
      document.getElementById("btnModalUpload")?.click();
    }
    else{
      document.getElementById("btnModalUploadMidia")?.click();
    }

  }

}
