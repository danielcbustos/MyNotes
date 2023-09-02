import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteActiveListComponent } from './note-active-list/note-active-list.component';
import { NoteArchivedListComponent } from './note-archived-list/note-archived-list.component';
import { CreateNoteComponent } from './create-note/create-note.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditNoteComponent } from './edit-note/edit-note.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule, 
    AppRoutingModule
  ],
  exports: [NoteActiveListComponent, NoteArchivedListComponent,CreateNoteComponent, EditNoteComponent],
  declarations: [NoteActiveListComponent,NoteArchivedListComponent,CreateNoteComponent, EditNoteComponent]
})
export class NoteModule { }
