import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NoteService } from '../note.service';
import { Router } from '@angular/router';
import { Category } from 'src/app/category/category';
import { CategoryService } from 'src/app/category/category.service';

@Component({
  selector: 'app-note-active-list',
  templateUrl: './note-active-list.component.html',
  styleUrls: ['./note-active-list.component.css']
})
export class NoteActiveListComponent implements OnInit {
  notes: Array<Note> = [];
  categories: Array<Category> = [];
  selectedCategory: Category | undefined; 

  constructor(private noteService: NoteService,
    private categoryService: CategoryService,
    private routerPath: Router
   ) { }

 
  getActiveNotes(): void {
    this.noteService.getActiveNotes().subscribe((notes) => {
      this.notes = notes;
    });  }
  
  
  deleteNote(noteId:number){
    if (window.confirm('Are you sure you want to delete this note?')) {
      this.noteService.deleteNote(noteId).subscribe(
        () => {
          console.log('successfully deleted');  
          this.getActiveNotes();     
        },
        (error) => {
          console.error(error);
          this.getActiveNotes(); 
        }
      );
    }
  }
  archiveNote(noteId: number) {
    this.noteService.archiveNote(noteId).subscribe(
      (response) => {
        console.log(response);         
        this.filterNotesByCategoryAndActive();
      },
      error => {
        console.error(error);
      }
    );
  }
  
  ngOnInit() {
    this.filterNotesByCategoryAndActive();
    this.getCategories();    
  }

 getCategories(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  filterNotesByCategoryAndActive(): void {
    if (this.selectedCategory) {
      this.categoryService
        .filterByCategoryAndActiveNote(this.selectedCategory.name)
        .subscribe((category) => {
          this.notes = category.notes;
        });
    } else {   
      this.noteService.getActiveNotes().subscribe((notes) => {
        this.notes = notes;
      });
    
  } 

  }
}
