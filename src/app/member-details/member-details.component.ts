import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

// This interface may be useful in the times ahead...
interface Member {
  firstName: string;
  lastName: string;
  jobTitle: string;
  team: string;
  status: string;
}

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit, OnChanges {
  memberModel: Member;
  memberForm: FormGroup;
  submitted = false;
  alertType: String;
  alertMessage: String;
  teams = [];

  constructor(private fb: FormBuilder, private appService: AppService, private router: Router) { }

  ngOnInit() {
    this.appService.getTeams().subscribe(teams => (this.teams = teams))

    this.initializeFormGroup()
  }

  ngOnChanges() { }

  // TODO: Add member to members
  onSubmit(form: FormGroup) {
    this.memberModel = form.value

    this.appService.addMember(form.value).subscribe(_ => this.goBack())
  }

  goBack() {
    this.router.navigate(['/members'])
  }

  initializeFormGroup() {
    this.memberForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      jobTitle: new FormControl(),
      team: new FormControl(),
      status: new FormControl()
    })
  }
}
