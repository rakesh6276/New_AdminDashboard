import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {Addusers} from '../users/usersupdate';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  getusers:any;
  p:number = 1;
  pageSize:number= 15;
  total:number;
  order: string='Tool_Name';
  reverse: boolean = false;
  term:any;
  groups:any;
  submitted=true
  enter_group_name: any;

  constructor(private _service:DataService,private router:Router) { }
  users : Addusers = new Addusers;
  
  ngOnInit() {
    this._service.getAllusers().subscribe(data=>{
      this.getusers = data;
    })
    this.Getgroups();
  }

  saveNewUser(users){
    this._service.saveNewuser(users).subscribe(data=>{
      this._service.getAllusers().subscribe(data=>{
        this.getusers = data;
      })
    })
  }

Getgroups(){
  this._service.getgroups().subscribe(data=>{
    this.groups = data;
  })
}

  enterGroupName() {
    console.log('value', this.enter_group_name);
    this._service.saveNewGroup(this.enter_group_name).subscribe(data=>{
      this.Getgroups();
    })
 }


  titleCaseWord1(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
    }
    this.users.first_name = str.join(' ');
    // return str.join(' ');
  }

  titleCaseWord2(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
    }
    this.users.last_name = str.join(' ');
    // return str.join(' ');
  }


}


