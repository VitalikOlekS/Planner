import { not } from '@angular/compiler/src/output/output_ast';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventModel } from 'src/app/models/event.model';
import { NoteModel } from 'src/app/models/note.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private events:EventModel[] = [
    new EventModel("New Years Day", "...", "01/01/2022", "https://www.zvuki.ru/images/photo/64/64603.jpg", true),
    new EventModel("Project", "...", "26/08/2021","https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Microsoft_Project_%282019%E2%80%93present%29.svg/1200px-Microsoft_Project_%282019%E2%80%93present%29.svg.png", false),
    new EventModel("Householding duties", "...", "23/11/2021","https://s-english.ru/images/topik/t-301.jpg", false),
    new EventModel("School", "...", "11/05/2021","https://naurok-test.nyc3.cdn.digitaloceanspaces.com/63747/images/326441_1574416640.jpg", false),
  ]

  private notes:NoteModel[]=[]

  changeEvents = new EventEmitter<boolean>();


  addEnvet(model: EventModel) {
    this.events.push(new EventModel(model.title, model.description, model.date, model.image));
    this.changeEvents.emit(true);
  }

  getEvents():EventModel[]{
    return this.events;
  }

  changeIsHidden(id:string): void {
    const index = this.events.findIndex(item => item.id === id);
    this.events[index].isHidden=!this.events[index].isHidden;
    console.log(this.events);
    this.changeEvents.emit(true);
  }

  changeIsPriority(id:string): void {
    const index = this.events.findIndex(item => item.id === id);
    this.events[index].isPriority=!this.events[index].isPriority;
    console.log(this.events);
    this.changeEvents.emit(true);
  }

  getVisibleEvents():EventModel[]{
   return  this.events.filter( (obj) => {
      return obj.isHidden===false;
    });
  }

  getHiddenEvents():EventModel[]{
    return  this.events.filter( (obj) => {
       return obj.isHidden===true;
     });
   }

  addNote(note: NoteModel):void{
    this.notes.push(new NoteModel(note.text, note.eventId));
    this.changeEvents.emit(true);
    console.log("Add note: ", note);
    console.log("Notes: ",this.notes)
  }

  getEventById(id:string):EventModel{
    return this.events.find(x => x.id == id);
  }

  updateEvent(model:EventModel):Observable<void>{
    const index = this.events.findIndex(item => item.id === model.id);
    this.events[index] = model;
    console.log('updating event: ', model);
    this.changeEvents.emit(true);
    return 
  }

  getEventNotes(eventId:string):NoteModel[]{
    return  this.notes.filter( (obj) => {
      return obj.eventId===eventId;
    });
  }
  
constructor() { }

}
