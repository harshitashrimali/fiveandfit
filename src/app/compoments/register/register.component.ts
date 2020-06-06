import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errorMessage: string;
  constructor(private userService: UserService, private router: Router) { 
    
  }

  ngOnInit() {
  }

  register(registerForm){
    let registerData = registerForm.value;
    let result = this.userService.register(registerData);
    result.then(response => {
      let uid = response.user.uid;
      this.userService.createUser(uid, registerData);
      this.router.navigate(['/']);
    }).catch(error => {
      this.errorMessage = error.message;
    });
    
  }

}
