import { Midia } from "./Midia";

export class FichaPaciente{
  idFicha: number = 0;
  nomePaciente: string = "";
  dataNascimento: string = "";
  sexo: string = "";
  cep: string  = "";
  endereco: string  = "";
  numeroComplemenento: string  = "";
  cidade: string  = "";
  estado: string  = "";
  ocupacao: string  = "";
  diagnosticoClinico: string  = "";
  queixaPrincipal: string  = "";
  hmpHma: string  = "";
  medicacoes: string  = "";
  examesComplementares: string  = "";
  exameFisico: string  = "";
  condutaClinica: string  = "";
  diagnostico: string  = "";
  evolucaoClinica: string = "";
  uuid: string  = "";
  linkFoto: string  = "";
  ativo: number = 0;
  midias: Midia[] = [];
 }