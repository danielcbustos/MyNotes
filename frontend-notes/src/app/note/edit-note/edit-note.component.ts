import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Note } from '../note';
import { Category } from 'src/app/category/category';
import { NoteService } from '../note.service';
import { CategoryService } from 'src/app/category/category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit {

  noteForm!: FormGroup;
  note!: Note;
  note_id: number=0;
  categoriesList: Array<Category>=[];
  newCategoryName: string = '';

  constructor(private noteService: NoteService,
    private categoryService:CategoryService,
    private routerPath: Router,    
    private fb: FormBuilder,
    private router: ActivatedRoute) { }

  ngOnInit():void {
  this.note_id = parseInt(this.router.snapshot.params['id']);
  this.noteService.getNoteById(this.note_id).subscribe((n) => {
    this.note = n;
    this.categoryService.getCategories().subscribe((ct) => {
      this.categoriesList = ct;
      let selectedCategoriesId = this.note.categories.map((item) => {
        return item.id;
      });
      this.categoriesList.map((ct) => {
        if (selectedCategoriesId.includes(ct.id)) {
          ct.selected = true;
        } else {
         ct.selected = false;
        }
      });
      this.noteForm = this.fb.group({
        title: [this.note.title, Validators.required],
        content: [this.note.content, Validators.required],
        categories: this.fb.array([]),
      });
      this.initialCategories();
    });
  }


)}
initialCategories() {
  const checkArray: FormArray = this.noteForm.get(
    'categories'
  ) as FormArray;
  let selectedItems = this.categoriesList.filter((x) => x.selected);
  let ids = selectedItems.map((item) => {
    return item.id;
  });
  ids.forEach((x) => {
    checkArray.push(new FormControl(x));
  });
}

onSubmit(note: Note) {
  note.categories=note.categories.map((x:any)=>{
    return{"id":x}; 
  });
  this.noteService.editNote(this.note_id, note).subscribe(
    (note) => {      
      this.noteForm.reset();
      if (this.note.archived) {
        this.routerPath.navigate(['/archivedNotes']);
      } else {
        this.routerPath.navigate(['/notesList']);
      }     
    },
    (error) => {
      if (error.statusText === 'UNAUTHORIZED') {
      console.log(error)
      } else if (error.statusText === 'UNPROCESSABLE ENTITY') {
        console.log(error)
      } else {
        console.log(error)
      }
    }
  );
}

onCheckboxChange(e:any, id:any) {
  const checkArray: FormArray = this.noteForm.get(
    'categories'
  ) as FormArray;
  if (e.target.checked) {
    checkArray.push(new FormControl(id));
  } else {
    let i: number = 0;
    checkArray.controls.forEach((item: any) => {
      if (item.value == id) {
        checkArray.removeAt(i);
        return;
      }
      i++;
    });
  }
}

createCategory():void{
  if (this.newCategoryName.trim() !== '') {
    const newCategory: Category = {
      id: 0, 
      name: this.newCategoryName,
      notes: [],
      selected: true
    };
    this.categoryService.createCategory(newCategory).subscribe((createdCategory) => {
      console.log('Category created:', createdCategory);
      this.categoriesList.push(createdCategory); 
      this.newCategoryName = '';
    });
  }
}

cancelNote(): void {
  this.noteForm.reset();
  if (this.note.archived) {
    this.routerPath.navigate(['/archivedNotes']);
  } else {
    this.routerPath.navigate(['/notesList']);
  }

}
}
