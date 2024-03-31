import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'crud-project';

  @ViewChild('myModal')
  modal!: ElementRef;

  studentObj: Student = new Student();

  // local students
  localStudents: Student[] = [];
  
  ngOnInit(): void {
    const localStudents = JSON.parse(localStorage.getItem('students') as any);
    this.localStudents = [...localStudents];
    console.log(this.localStudents)
  }

  OpenModal() {
    const modal = document.getElementById('myModal')
    if(modal !== null) {
      modal.style.display = 'block';
    }
  }
  CloseModal() {
    if(this.modal !== null) {
      this.modal.nativeElement.style.display = 'none'
    }
  }
  onSave() {
    console.log(this.studentObj);
    const isLocal = localStorage.getItem('students');
    if(isLocal !== null) {
      const oldStudents = JSON.parse(isLocal);
      oldStudents.push(this.studentObj);
      localStorage.setItem('students', JSON.stringify(oldStudents));
      this.CloseModal();
      window.location.reload()
    } else {
      const newStudents = [];
      newStudents.push(this.studentObj);
      localStorage.setItem('students', JSON.stringify(newStudents))
      this.CloseModal();
      window.location.reload()
    }
  }
}


export class Student {
  name: string;
  NO: string;
  email: string;
  city: string;
  state: string;
  pinCode: string;
  address:string;

  constructor() {
    this.name = '';
    this.NO = '';
    this.email = '';
    this.city = '';
    this.state = '';
    this.pinCode = '';
    this.address = '';
  }
}