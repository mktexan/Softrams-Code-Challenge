import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members = [];
  teams = []

  constructor(public appService: AppService, private router: Router) { }

  ngOnInit() {
    this.getMembers()
  }

  goToAddMemberForm() {
    this.router.navigate(['/member-details'])
  }

  editMemberByID(id: number, type: string, event: any) {
    let item = this.members.find(i => i.id === id)

    const newValue = event.target.value ? event.target.value : event.target.textContent

    item[type] = newValue

    this.appService.modifyMember(item).subscribe(_ => this.getMembers())
  }

  getMembers() {
    this.appService.getTeams().subscribe(teams => (this.teams = teams))
    this.appService.getMembers().subscribe(members => (this.members = members))
  }

  deleteMemberById(id: number) {
    this.appService.deleteMember({ id: id }).subscribe(_ => this.getMembers())
  }
}
