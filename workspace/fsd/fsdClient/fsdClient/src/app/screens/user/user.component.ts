import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FilterPipe } from '../../pipes/filter.pipe';
import { User } from '../../vo/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

 displayItems:User[];
 searchItem : string = "firstName";

  constructor(private userService:UserService) {

    userService.getUsers().subscribe(users=>{
      this.displayItems = users;
    },error=>{console.log(error)});


  }

  ngOnInit() {
  }

  searchText:string = "";
  displayInputUser : User = new User("","",0,0);;



  isAdd:Boolean = true;

  select(data){
    if(data.action == 'delete'){
        this.userService.deleteUser(data.displayItem).subscribe((data)=>{
          console.log(data);

        },
      (error)=>{
        console.log(error);
      });

      this.displayItems = this.displayItems.filter(user=>{
        return (user._id != data.displayItem._id);
      });
    }else{
      //edit
      this.displayInputUser.firstName = data.firstName;
      this.displayInputUser.lastName = data.lastName;
      this.displayInputUser.empId = data.empId;
      this.displayInputUser._id = data._id;

      this.isAdd = false;

    }
  }

  reset(){
    this.displayInputUser = new User("","",0,0);
    this.isAdd = true;
  }

  add(){
    if(!this.validate()){
      return;
    }
    //console.log(this.displayInputUser);
    let newUser = new User(this.displayInputUser.firstName,
                                    this.displayInputUser.lastName,
                                    this.displayInputUser.empId,
                                    null
                                  );


    this.userService.addUser(newUser).subscribe(user=>{
                                                    this.displayItems.push(user);
                                                    this.reset();
                                                  },
                                                error=>{console.log(error)});


  }

  update(){
    let updateUser = new User(this.displayInputUser.firstName,
                                    this.displayInputUser.lastName,
                                    this.displayInputUser.empId,
                                    this.displayInputUser._id);

    this.userService.updateUser(updateUser).subscribe(
                    user=>{
                            this.displayItems.forEach((user)=>{
                              if(user._id == updateUser._id){
                                user.firstName = updateUser.firstName;
                                user.lastName = updateUser.lastName;
                                user.empId = updateUser.empId;
                              };
                            });

                            this.isAdd = true;
                            this.reset();
                          },
                  error=>{
                            console.log(error);
                          });
  }

  sortBy(by){
    this.displayItems.sort(this.compareValues(by));
  }

  // function for dynamic sorting
  compareValues(key, order='asc') {
    return function(a, b) {
      if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }

      const varA = (typeof a[key] === 'string') ?
        a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ?
        b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order == 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  private validate(){
    let isValid = true;

    this.displayItems.forEach(item=>{
      Object.keys(item).forEach(key=>{
        if(!item[key] && key != '__v')
          isValid = false;
      });
    });

    return isValid;
  }
}
