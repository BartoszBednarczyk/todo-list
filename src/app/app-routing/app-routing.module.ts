import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from '../components/homepage/homepage.component'
import { BoardComponent } from '../components/board/board.component';

const routes: Routes = [
{
path: '',
component: HomepageComponent
},
{
  path: 'board/:id',
  component: BoardComponent
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