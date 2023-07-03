import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  phone: string;
  otp: string;
  hash: string

  selectedValue: 'Tata Trust';
  userDetails = []

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    //this.authService.getAllUsers();

    this.authService.getAllUsers().subscribe((res) => {
      console.log('getAllUsers', res);
      this.userDetails = res
      console.log('userDetails', this.userDetails);
    }, (err) => {
      console.log('getAllUsers error', err)
    });
  }

  onModelChange(event): void {
    // Perform actions based on the selected value
    console.log(event);
  }
  
  getOTP() {
    // Implement the logic to send OTP
    console.log('Sending OTP to', this.phone);
    if(this.phone) {
      this.authService.sendOtp(this.phone).subscribe((res) => {
        console.log('sendOtp', res);
        if(res.success) {
          console.log('sendOtp data', res.data);
          this.hash = res.data.hash
          alert(res.message+' and your otp for login is '+ res.data.otp)
        } else{
          alert(res.message)
        }
      }, (err) => {
        console.log('sendOtp error', err)
        alert("Mobile no. is not valid!")
      });
    }
  }

  login() {
    // Implement the logic to verify OTP and perform login
    console.log('Verifying OTP', this.otp);
    console.log('Verifying hash', this.hash);
    if(this.otp && this.hash) {
      this.authService.verifyOtp(this.phone, this.otp, this.hash).subscribe((res) => {
        console.log('verifyOtp', res);
        if(res.success) {
          console.log("router")
          //alert(res.message)
          this.authService.setAuthenticated(true);
          this.router.navigate(['/verify-certificate'])
        } else{
          alert(res.message)
        }
      }, (err) => {
        console.log('verifyOtp error', err)
        alert("Otp verification failed!")
      });
    }
  }

}
