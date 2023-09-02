import { Category } from "../category/category";
import { CategoryNote } from "./categoryNote";



export class Note {
 id: number;
 title: string;
 content: string;
 lastEdited: Date;
 archived: boolean;
 categories: CategoryNote[];


 constructor(
    id: number,
    title: string,
    content: string,
    lastEdited: Date,
    archived:boolean,
    categories: CategoryNote[]

   
  ) {
    this.id = id;
    this.title = title;
    this.content=content;
    this.lastEdited=lastEdited;
    this.archived=archived;
    this.categories=categories
 
  }
 
}
