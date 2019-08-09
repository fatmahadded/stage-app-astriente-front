import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { LoaderService } from '../../Service/loader.service';
import { LoaderState } from '../../Entity/loader';

@Component({
  selector: 'app-loader-component',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit , OnDestroy{
  show = false;
  private subscription: Subscription;
  constructor(
      private loaderService: LoaderService
  ) { }
  ngOnInit() {
    this.subscription = this.loaderService.loaderState
        .subscribe((state: LoaderState) => {
          this.show = state.show;
        });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
