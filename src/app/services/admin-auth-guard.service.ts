import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(){
    return this.authService.dbUser$.pipe(
      map(dbUser => {
        if(dbUser.isAdmin === true){
          return true;
        }else{
          this.router.navigate(['/']);
          return false;
        }
      })
    );
  }
}

