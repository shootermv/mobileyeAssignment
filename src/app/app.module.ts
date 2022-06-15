import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { counterReducer as reducer, metaReducers } from './store/reducer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { InfoComponent } from './info/info.component';
import { SearchComponent } from './search/search.component';
import { AnnotationListComponent } from './annotation-list/annotation-list.component';
import { OutletComponent } from './outlet/outlet.component';

@NgModule({
  declarations: [AppComponent, InfoComponent, SearchComponent, AnnotationListComponent, OutletComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({ annotations: reducer }, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
  ],
  providers: [],
  bootstrap: [OutletComponent],
})
export class AppModule {}
