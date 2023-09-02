import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteActiveListComponent } from './note/note-active-list/note-active-list.component';
import { NoteArchivedListComponent } from './note/note-archived-list/note-archived-list.component';
import { CreateNoteComponent } from './note/create-note/create-note.component';
import { EditNoteComponent } from './note/edit-note/edit-note.component';

const routes: Routes = [
  { path: 'notesList', component: NoteActiveListComponent, pathMatch: 'full' },
  { path: 'archivedNotes', component: NoteArchivedListComponent, pathMatch: 'full' },
  { path: 'createNote', component: CreateNoteComponent, pathMatch: 'full' },
  { path: 'editNote/:id', component: EditNoteComponent, pathMatch: 'full' },

  { path: '**', redirectTo: 'notesList' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
