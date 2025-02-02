import { Routes } from '@angular/router';
import {LoginPage} from "./pages/login/login.page";
import {HomePage} from "./pages/proyectos/home.page";
import {AuthGuard} from "./services/auth/auth.guard";
import {LoginGuard} from "./services/auth/login.guard";
import {ProyectoDetailsPage} from "./pages/proyectos/proyecto-details/proyecto-details.page";
import {ProyectoCreatePage} from "./pages/proyectos/proyecto-create/proyecto-create.page";
import {ProyectoEditPage} from "./pages/proyectos/proyecto-edit/proyecto-edit.page";
import {TareaCreatePage} from "./pages/proyectos/tareas/tarea-create/tarea-create.page";
import {TareaEditPage} from "./pages/proyectos/tareas/tarea-edit/tarea-edit.page";

export const routes: Routes = [
  { path: '', redirectTo: 'proyectos', pathMatch: 'full' },
  { path: 'login', component: LoginPage, canActivate: [LoginGuard]},
  { path: 'proyectos', component: HomePage, canActivate: [AuthGuard] },
  { path: 'proyectos/details/:id', component: ProyectoDetailsPage, canActivate: [AuthGuard] },
  { path: 'proyectos/:proyectoId/tareas/create', component: TareaCreatePage, canActivate: [AuthGuard] },
  { path: 'proyectos/:proyectoId/tareas/edit/:id', component: TareaEditPage, canActivate: [AuthGuard] },
  { path: 'proyectos/create', component: ProyectoCreatePage, canActivate: [AuthGuard] },
  { path: 'proyectos/edit/:id', component: ProyectoEditPage, canActivate: [AuthGuard] },
];
