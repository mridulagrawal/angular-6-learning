import {
  Component,
  OnInit
} from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase';

import { DataStorageService } from '../../shared/data-storage.service';
import * as fromApp from '../../store/app.reducer';
import * as fromAuth from '../../auth/store/auth.reducer';
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  authState: Observable<fromAuth.State>;

  constructor(private dataStorageService: DataStorageService,
    private store: Store<fromApp.AppState>) { }


  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onSaveData() {
    this.dataStorageService.storeRecipes()
      .subscribe(data => {
        console.log(data);
      });
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes();
  }

  logout() {
    // firebase.auth().signOut();
    this.store.dispatch(new AuthActions.LogoutAction());
  }

}
