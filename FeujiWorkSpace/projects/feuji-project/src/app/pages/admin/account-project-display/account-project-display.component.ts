import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Accountproject } from '../../../../models/accountproject.model';
import { AccountprojectService } from '../../../../models/accountproject.service';

@Component({
  selector: 'app-account-project-display',
  templateUrl: './account-project-display.component.html',
  styleUrl: './account-project-display.component.css'
})
export class AccountProjectDisplayComponent implements OnInit{


  public accountProject:any={};
  constructor(private accountProjectService: AccountprojectService ,private router: Router ){}
  ngOnInit(){
    console.log("loaded");
    this.getAccountProjects();
  }




  getAccountProjects(){
    this.accountProjectService.getAccountProjects().subscribe(data=>{
      this.accountProject=data;
      console.log(this.accountProject)
    })

  // onEditClicked(uuid:string){
  //   let currentProject=this.accountProject.find((p)=>{return p.uuid ===uuid})
  //   console.log(currentProject)
  // }

  //  onRemove(index:number){
  //   console.log("component delete")
  //  console.log("component delete",this.accountProject[index]);
  //   this.accountProjectService.deleteRow(this.accountProject[index].accountProjectId).subscribe(res=>{
  //     const response=res;
  //   })
    // this.accountProject.splice(index,1);
    // this.
  }


  deleteProject(projectId: number): void {
    alert(JSON.stringify(this.accountProject))
    console.log("Deleting Project ", projectId);
    this.accountProjectService.deleteRow(projectId)
      .subscribe(
        () => {
          alert("Project deleted successfully");
          console.log("Project deleted successfully");
          this.getAccountProjects();
        },
        error => {
          console.error('Error deleting project:', error);
        }
     );
  }

  // onRemove(index: number) {
  //   this.accountProjectService.deleteRow(this.accountProject[index].accountProjectId).subscribe(res => {
  //     const response = 1;
  //   });
  // }

  // onRemove(index: number) {
  //   // Use this.accountProject[index].accountProjectId directly
  //   this.accountProjectService.deleteRow(this.accountProject[index].accountProjectId).subscribe(res => {
  //     const response = 1;
  //
  // onRemove(index: number) {
  //   console.log(this.accountProject[index]); // Log the object
  //   // Check if this.accountProject[index] is defined before accessing its properties
  //   if (this.accountProject[index]) {
  //     const accountProjectId = this.accountProject[index].accountProjectId;
  //     this.accountProjectService.deleteRow(accountProjectId).subscribe(res => {
  //       const response = 1;
  //     });
  //   }
  // }

}






