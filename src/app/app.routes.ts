import { Routes } from '@angular/router';
import { AuthGuard } from './services/protection/protection';

export const routes: Routes = [

    {
        path: '', 
        redirectTo: 'login', 
        pathMatch: 'full'

    },
    {
        path: 'login',
        loadComponent: () => import('./views/login/login.component').then(m =>
            m.LoginComponent
        )
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./views/dashboard/dashboard.component').then(m =>
            m.DashboardComponent
        )


    },

    {
        path: 'user' , canActivate: [AuthGuard] ,
        loadComponent: () => import('./views/dashboard/user/user.component').then(m =>
            m.UserComponent
        )


    }
,
    {
        path: 'student' , canActivate: [AuthGuard] ,
        loadComponent: () => import('./views/dashboard/student/student.component').then(m =>
            m.StudentComponent
        )


    },
    {
        path: 'course' , canActivate: [AuthGuard] ,
        loadComponent: () => import('./views/dashboard/course/course.component').then(m =>
            m.CourseComponent
        )


    },
    {
        path: 'roles' , canActivate: [AuthGuard] ,
        loadComponent: () => import('./views/dashboard/roles/roles.component').then(m =>
            m.RolesComponent
        )


    }

];
