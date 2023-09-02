import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Note } from './note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
private activeListUrl: string = environment.baseUrl + 'note/activeList';
private archivedListUrl: string = environment.baseUrl + 'note/archivedList';
private createNoteUrl: string = environment.baseUrl + 'note/create';
private editNoteUrl: string = environment.baseUrl + 'note/update/';
private getById: string = environment.baseUrl + 'note/list/';
private deleteNoteUrl: string = environment.baseUrl + 'note/delete/';
private archiveNoteUrl: string = environment.baseUrl + 'note/archive/';
private unarchiveNoteUrl: string = environment.baseUrl + 'note/unarchive/';

constructor(private http: HttpClient) { }

getActiveNotes(): Observable<Note[]> {
  return this.http.get<Note[]>(this.activeListUrl);
}

getArchivedNotes(): Observable<Note[]> {
  return this.http.get<Note[]>(this.archivedListUrl);
}

createNote(note: Note): Observable<Note> {
  const url = this.createNoteUrl;
  return this.http.post<Note>(url, note)
}

editNote(noteId: number, note: Note): Observable<Note> {
  const url = `${this.editNoteUrl}${noteId}`; 
  console.log(note)
  return this.http.put<Note>(url, note );
}

getNoteById(noteId:number): Observable<Note> {
  const url = `${this.getById}${noteId}`;
  return this.http.get<Note>(url);
}


deleteNote(noteId:number):Observable<void>{
  const url = `${this.deleteNoteUrl}${noteId}`;
  return this.http.delete<void>(url)
}

archiveNote(noteId: number): Observable<string> {
  const url = `${this.archiveNoteUrl}${noteId}`;
  return this.http.put<string>(url, null);
}

unarchiveNote(noteId: number): Observable<string> {
  const url = `${this.unarchiveNoteUrl}${noteId}`;
  return this.http.put<string>(url, null);
}

}
