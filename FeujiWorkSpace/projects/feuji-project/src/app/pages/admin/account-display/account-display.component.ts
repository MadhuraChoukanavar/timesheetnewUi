import { Component, OnInit } from '@angular/core';
import { AccountserviceService } from '../../../../models/accountservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-display',
  templateUrl: './account-display.component.html',
  styleUrl: './account-display.component.css'
})
export class AccountDisplayComponent implements OnInit {
  public account:any[]=[];
  constructor(private accountService: AccountserviceService, private router: Router ){}
  ngOnInit(){
    console.log("loaded");
    this.getAccount();
  }




  getAccount(){
    this.accountService.getAccount().subscribe(data=>{
     console.log(data);
     this.account=data;
     console.log(this.account);
   })

}

editItem(id: string) {
  console.log(id);

  this.router.navigate(['/update-account', id]);
}
}
