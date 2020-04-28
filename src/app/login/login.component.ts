import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  rollNo;
  email;

  constructor(private httpClient: HttpClient, private router: Router) {}

  ngOnInit() {}

  isEmailValidated() {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(this.email).toLowerCase());
  }

  writeRollNo(event) {
    this.rollNo = event.target.value;
  }

  writeEmail(event) {
    this.email = event.target.value;

    if (!this.isEmailValidated()) {
      this.showError("email");
    } else {
      this.hideError("email");
    }
  }

  showError(id) {
    document.getElementById(id).style.opacity = "1";
  }
  hideError(id) {
    document.getElementById(id).style.opacity = "0";
  }

  login() {
    if (this.isEmailValidated()) {
      //login
      this.hideError("email");
      this.hideError("rollno");

      console.log(this.email, this.rollNo);

      let url = "otp url";
      let otpRecieved;
      this.httpClient.post(url, { email: this.email }).subscribe(res => {
        otpRecieved = res;
      });

      let otp = prompt("Enter otp : ");

      if (otpRecieved == otp) {
        let loginUrl = "login url";
        let data = {
          rollno: this.rollNo,
          email: this.email
        };

        this.httpClient.post(loginUrl, data).subscribe(res => {
          alert("Marks sent to mail");
        });
      }
    }
  }

  checkAuth(){
    const pass="Rishabh123@";
    let passInput=prompt("Enter password : ");

    if(passInput == pass){
      localStorage.setItem('auth','true');
      this.router.navigate(['/add-data']);
    }
    else{
      alert("Wrong passkey");
    }
  }
}
