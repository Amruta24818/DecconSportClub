import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-temp-message',
  templateUrl: './temp-message.component.html',
  styleUrls: ['./temp-message.component.scss']
})
export class TempMessageComponent implements OnInit {

  constructor(private _activatedRoute:ActivatedRoute,private userService:UserService) { }
str:any;
status:any;

  ngOnInit(): void {
    this.str = this._activatedRoute.snapshot.params['email'];
    if(this.str==="reg"){
      this.status = "FROMREG";
    }else{
      this.status = "FROMEMAIL";
      this.userService.activateAccount(this.str).subscribe(res=>{
        console.log(res);
      })
    }
  }

}
