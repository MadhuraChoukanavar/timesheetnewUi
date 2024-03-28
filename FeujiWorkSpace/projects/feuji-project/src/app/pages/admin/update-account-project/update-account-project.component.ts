import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountprojectService } from '../../../../models/accountproject.service';

@Component({
  selector: 'app-update-account-project',
  templateUrl: './update-account-project.component.html',
  styleUrl: './update-account-project.component.css'
})
export class UpdateAccountProjectComponent  implements OnInit {

  constructor( private router: Router,private ref:ActivatedRoute,private accountProjectService :AccountprojectService){}
     public uuid!:number;
  

    ngOnInit(): void {


}
}
