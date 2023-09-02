import { Note } from "../note/note";

export class Category {

    id: number;
    name: string;
    notes: Note[]; 
    selected:boolean;
  
    constructor(id: number, name: string, notes: Note[], selected:boolean) {
      this.id = id;
      this.name = name;
      this.notes = notes;
      this.selected=selected;
    }
  }
  
  
  
  
  
  
  
