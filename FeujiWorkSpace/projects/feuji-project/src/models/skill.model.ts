export class Skill{
    constructor(
      public skillId:number,
      public skillName:string,
      public techinicalCategoryId:number,
      public skillCategoryId:number,
      public description:string,
      public isDeleted:string,
      public uuid:string,
      public createdBy:string,
       public createdOn:Date,
      public modifiedBy:string,
       public modifiedOn:Date,
    ){}
  }
  
  