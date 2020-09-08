import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomSearchPipe } from './custom-search.pipe';


@NgModule({
  declarations: [CustomSearchPipe],
  imports: [
    CommonModule
  ],
  exports: [CustomSearchPipe]
})
export class SharedModule { }
