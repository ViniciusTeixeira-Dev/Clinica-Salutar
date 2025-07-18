import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { MainComponent } from './componentes/main/main.component';
import { FichapacienteComponent } from './componentes/fichapaciente/fichapaciente.component';

export const routes: Routes = [
    {path:"", component: LoginComponent},
    {path:"main", component: MainComponent},
    {path:"ficha/:id", component: FichapacienteComponent}
];
