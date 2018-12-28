import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router){}

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //   return true;
  // }

  canActivate(): boolean{
    console.log("this._authService.loggedIn() :: ", this._authService.loggedIn());
    if (this._authService.loggedIn()) {
      return true;
    }
    else {
      this._router.navigate(['/login']);
      return false;
    }
  }

}
