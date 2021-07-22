import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from '../components/homepage/homepage.component'
import { BoardComponent } from '../components/board/board.component';
import { ErrorPageComponent } from '../components/error-page/error-page.component';

const routes: Routes = [
{
path: '',
component: HomepageComponent
},
{
  path: 'board/:id',
  component: BoardComponent
},
{
  path: 'error',
  component: ErrorPageComponent
}
];

@NgModule({
imports: [
RouterModule.forRoot(routes)
],
exports: [
RouterModule
],
declarations: []
})
export class AppRoutingModule { }