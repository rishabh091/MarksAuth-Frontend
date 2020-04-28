import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent implements OnInit {

  constructor(private router: Router, private httpClient: HttpClient) { }

  rollNo;
  email;
  marks;
  attendance;

  ngOnInit() {
    this.checkPass();
  }

  checkPass(){
    let auth=localStorage.getItem('auth');

    console.log(auth);
    if(auth != 'true'){
      this.router.navigate(['/login']);
    }
  }
  logout(){
    localStorage.removeItem('auth');
    this.router.navigate(['/login']);
  }

  enterRollNo(event){
    this.rollNo=event.target.value;
    console.log(this.rollNo);
  }
  enterEmail(event){
    this.email=event.target.value;
    console.log(this.email);
  }
  enterMarks(event){
    this.marks=event.target.value;
    console.log(this.marks);
  }
  enterAttendance(event){
    this.attendance=event.target.value;
    console.log(this.attendance);
  }

  checkValue(value){
    if(value != null && value != '' && value != ' '){
      return true;
    }

    return false;
  }

  upload(){
    let url="upload url";

    if(this.checkValue(this.rollNo) &&
    this.checkValue(this.email) &&
    this.checkValue(this.marks) &&
    this.checkValue(this.attendance)){

      let data={
        rollNo: this.rollNo,
        email: this.email,
        marks: this.marks,
        attendance: this.attendance
      }

      console.log(data);

      this.httpClient.post(url,data).subscribe(res=>{
        alert('Data added successfully');
      },error=>{
        alert("Data already found");
      });
    }
    else{
      alert("Please enter correct values");
    }
  }

}
