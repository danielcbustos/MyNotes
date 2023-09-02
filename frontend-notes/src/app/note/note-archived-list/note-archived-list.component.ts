import { Component, OnInit } from '@angular/core';
import { NoteService } from '../note.service';
import { Note } from '../note';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note-archived-list',
  templateUrl: './note-archived-list.component.html',
  styleUrls: ['./note-archived-list.component.css']
})
export class NoteArchivedListComponent implements OnInit {
  notes: Array<Note> = [];

  constructor(private noteService: NoteService,
    private routerPath: Router ) { }

  getArchivedNotes(): void {
    this.noteService.getArchivedNotes().subscribe((notes) => {
      this.notes = notes;      
    });

  }
  deleteNote(noteId:number){
    if (window.confirm('Are you sure you want to delete this note?')) {
      this.noteService.deleteNote(noteId).subscribe(
        () => {
          console.log('successfully deleted');
          this.routerPath.navigate(['/notesList'])
          this.getArchivedNotes()
        },
        (error) => {
          console.error(error);
          this.getArchivedNotes()     
        }
      );
    }


  }

  unarchiveNote(noteId: number) {
    this.noteService.unarchiveNote(noteId).subscribe(
      response => {
        console.log(response); 
        this.getArchivedNotes(); 
      },
      error => {
        console.error(error);
      }
    );
  }

  ngOnInit() {
    this.getArchivedNotes();
    
  } 

}
