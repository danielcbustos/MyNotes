import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup,  FormArray, FormControl, Validators } from '@angular/forms';
import { Category } from 'src/app/category/category';
import { Note } from '../note';
import { NoteService } from '../note.service';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/category/category.service';


@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit {
  noteForm!: FormGroup;
  notes: Array<Note> = [];
  categoriesList: Array<Category>=[];
  newCategoryName: string = '';

  constructor(private noteService: NoteService,
    private routerPath: Router,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService) { }

  createNote(note: Note){
    note.archived=false;    
    note.categories =note.categories.map((x: any)=>{
      return{"id":x}
    });
    this.noteService.createNote(note).subscribe((note) => {
      console.log('successfully created');  
      this.noteForm.reset();
      this.routerPath.navigate(['/notesList']);
      }, (error) => {
        console.error(error);
      })

  }
  ngOnInit() {
    this.noteForm = this.formBuilder.group({
      title: ["", [Validators.required, Validators.minLength(2)]],
      content: ["", [Validators.required, Validators.maxLength(100)]],      
      categories: this.formBuilder.array([])


    });
    this.getCategories();
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(p=>{
      this.categoriesList=p;
    })

  }

  cancelNote(): void {
    this.noteForm.reset();
    this.routerPath.navigate(['/notesList']);
  }

  onCheckboxChange(e:any) { 
    const checkArray: FormArray = this.noteForm.get('categories') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
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
}
