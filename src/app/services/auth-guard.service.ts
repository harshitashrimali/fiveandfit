import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return this.authService.user$.pipe(
      map(user => {
        if(user){
          // User is logged in
          return true;
          /*if(state.url === "/login" || state.url === "/register"){
            this.router.navigate(['/']);
            return false;
          }else{
            return true;
          }*/
          
        }else{
          // User is NOT logged in
          this.router.navigate(['/login']);
          return false;
          /*if(state.url === "/login" || state.url === "/register"){
            return true;
          }else{
            this.router.navigate(['/login']);
            return false;
          }*/
          
        }
      })
    );
  }
}
