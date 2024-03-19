 import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Holiday } from '../../../../models/holiday.model';
import { holidayRepo } from '../../../../models/holiday.repo';

@Component({
  selector: 'app-add-holiday',
  templateUrl: './add-holiday.component.html',
  styleUrl: './add-holiday.component.css'
})
export class AddHolidayComponent {
  holiday:Holiday=new Holiday(0,new Date,'','','','',false,'','',new Date,'',new Date);
  constructor(private repo:holidayRepo,private datePipe: DatePipe) { }

  SendHoliday(holiday:Holiday){
    //console.log("*"+holiday);
    //alert(JSON.stringify(holiday));
   this.repo.SendHoliday(holiday);
  }

  updateDayOfWeek() {
    const selectedDate = this.holiday.holidayDate;
    const dayOfWeek = this.datePipe.transform(selectedDate, 'EEEE') ?? ''; // Provide an empty string as default value if the result is null
    this.holiday.holidayDay = dayOfWeek;
  }


}
