import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundErrorPageComponent } from './components/not-found-errorpage/not-found-errorpage.component';
import { LAYOUT_CHILD_ROUTES } from './routes';
import { LayoutComponent } from './components/layout/layout.component';

export const appRoutes: Routes = [
  { path: '', component: LayoutComponent, children: LAYOUT_CHILD_ROUTES },
  { path: '**', component: NotFoundErrorPageComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
],
exports: [
    RouterModule
]
})
export class AppRoutingModule { }
