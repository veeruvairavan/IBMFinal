export class User {
  firstName:string;
  lastName:string;
  empId:number;
  _id:number;

  constructor(firstName:string,lastName:string,empId:number,id:number){
    this.firstName = firstName;
    this.lastName = lastName;
    this.empId = empId;
    this._id = id;
  }
}
