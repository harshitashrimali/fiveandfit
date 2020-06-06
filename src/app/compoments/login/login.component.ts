import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: string;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    
  }

  login(loginForm){
    let loginData = loginForm.value;
    let result = this.userService.login(loginData);
    result.then(response => {
      this.router.navigate(['/']);
    }).catch(error => {
      this.errorMessage = error.message;
    });
  }

}
