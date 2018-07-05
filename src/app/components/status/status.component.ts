import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';

//import { AppState } from '../../store/app.state';
import { GetStatus } from '../../store/auth.actions';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new GetStatus);
  }

}
