import { Component, OnInit } from '@angular/core';
import { HolidayService } from '../../../../models/holidayservice.service';
import { holidayRepo } from '../../../../models/holiday.repo';
import { Holiday } from '../../../../models/holiday.model';
import { Router } from '@angular/router';



@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrl: './holiday.component.css'
})
export class HolidayComponent  implements OnInit
{
  public holidays:Holiday[]=[];

  constructor(private repository:holidayRepo,private data:HolidayService,private router:Router){}

  
  ngOnInit(): void {
      this.getholiday()
  }
  getholiday(){
this.data.getholiday().subscribe(d=>{
  this.holidays=d;
})
}


navigateeditholiday(holiday:Holiday){
  console.log(holiday);
  this.router.navigate(["/editholiday"],{state:{holiday:holiday}})
  
}


delete(index:any){
const isConfirm=confirm("are you sure you want to delete")
if(isConfirm){
  console.log("component deleted",index);
  console.log("component deleted",this.holidays[index]);
  this.data.deleteRow(index).subscribe(res=>{
    console.log(res);
    const reponse:any=res;
    if(reponse.deleted==true){
      console.log(reponse.deleted)
      this.data.getholiday().subscribe(d=>{
        this.holidays=d;
        console.log(d)
      })
    }
  })

}
  console.log(this.holidays)
}
}
