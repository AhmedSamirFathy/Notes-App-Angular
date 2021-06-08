import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotesService } from 'src/app/Services/notes.service';
import jwt_decode from "jwt-decode";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThisReceiver, ThrowStmt } from '@angular/compiler';

declare var $: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  allNotes: any;
  token: any;
  decoded: any;
  isLoaded = false;
  isClicked = false;

  constructor(private _Router: Router, private _NotesService: NotesService) {

    try {
      this.token = localStorage.getItem('TOKEN');
      this.decoded = jwt_decode(this.token);
    } catch (error) {
      localStorage.clear()
      this._Router.navigate(['/signin'])
    }

    this.getAllNotes()

    if (!localStorage.getItem('TOKEN')) {
      this._Router.navigate(['/signin'])
    }
  }

  //form groups
  addNote = new FormGroup({
    title: new FormControl('', Validators.required),
    desc: new FormControl('', Validators.required)
  })
  editNote = new FormGroup({
    title: new FormControl('', Validators.required),
    desc: new FormControl('', Validators.required)
  })

  //get all notes
  getAllNotes() {
    let data = {
      token: this.token,
      userID: this.decoded._id
    }

    this._NotesService.getAllNotes(data).subscribe(res => {
      // console.log(res);

      if (res.message == 'success') {
        this.isLoaded = true;
        this.allNotes = res.Notes
      } else {
        localStorage.clear()
        this._Router.navigate(['/signin'])
      }

    })
  }

  //add note
  addData() {
    let data = {
      title: this.addNote.value.title,
      desc: this.addNote.value.desc,
      token: this.token,
      citizenID: this.decoded._id
    }
    this._NotesService.addNote(data).subscribe(res => {
      if (res.message == 'success') {
        $("#addNote").modal('hide')
        this.getAllNotes()
        this.addNote.reset()
      }

    })


  }
  //get note id
  noteID: any;
  getID(id: any) {
    this.noteID = id
  }

  //delete note
  deleteNote() {
    let data = {
      token: this.token,
      NoteID: this.noteID

    }
    this._NotesService.deleteNote(data).subscribe(res => {
      // console.log(res);
      if (res.message == "deleted") {
        $("#deleteNote").modal('hide');
        this.getAllNotes()
      }

    })
  }


  // set value in inputs in updates
  setValue() {
    for (let index = 0; index < this.allNotes.length; index++) {
      if (this.allNotes[index]._id == this.noteID) {
        // console.log(this.allNotes[index]);
        this.editNote.controls.title.setValue(this.allNotes[index].title)
        this.editNote.controls.desc.setValue(this.allNotes[index].desc)

      }
    }
  }

  //edit note
  EditNote() {
    let data = {
      token: this.token,
      title: this.editNote.value.title,
      desc: this.editNote.value.desc,
      NoteID: this.noteID
    }
    this._NotesService.updateNote(data).subscribe(res => {
      // console.log(res);
      if (res.message == 'updated') {
        $("#editNote").modal('hide');
        this.getAllNotes();
        this.isClicked = true;
      }

    })
  }

  ngOnInit(): void {
  }

}
