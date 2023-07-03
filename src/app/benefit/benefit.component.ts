import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-benefit',
  templateUrl: './benefit.component.html',
  styleUrls: ['./benefit.component.scss']
})
export class BenefitComponent implements OnInit {

  config: { "grade": "class-1", "schoolName": "New India" }

  studentVerified: Boolean = true
  studentVerifiedNot: Boolean

  instituteVerified: Boolean = true
  instituteVerifiedNot: Boolean

  academicVerified: Boolean = true
  academicVerifiedNot: Boolean

  genderVerified: Boolean = true
  genderVerifiedNot: Boolean



  routerState: any
  constructor(private readonly router: Router,) {
    const navigation = this.router.getCurrentNavigation();
    this.routerState = navigation.extras.state;
  }

  ngOnInit(): void {

    console.log("this.routerState", this.routerState)

    if (this.routerState) {
      for (const iterator of this.routerState) {
        console.log("iterator", iterator)
        if (iterator.title.Gender == 'female') {
          console.log("Gender")
          this.genderVerified = true
          this.genderVerifiedNot = false
        }
        if (iterator.title.Institute == 'Tekdi') {
          console.log("Institute")
          this.instituteVerified = true
          this.instituteVerifiedNot = false
        }
        if (iterator.title.AcademicYear == '2022-2023') {
          console.log("AcademicYear")
          this.academicVerified = true
          this.academicVerifiedNot = false
        }

      }
    }

    if (this.instituteVerified == true && this.academicVerified == true && this.genderVerified == true) {
      this.studentVerified = true
    }



  }


}
