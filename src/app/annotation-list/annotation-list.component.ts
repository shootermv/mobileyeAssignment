import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Remove } from '../store/actions';
import { Feature } from 'geojson';

@Component({
  selector: 'annotation-list',
  templateUrl: './annotation-list.component.html',
  styleUrls: ['./annotation-list.component.css']
})
export class AnnotationListComponent {
  annotations: Feature[] = [];
  @Input() draw: any;
  constructor(private store: Store<{ annotations: Feature[] }>) {
    store.select('annotations').subscribe((data: Feature[]) => {
      this.annotations = data;
    });   
  }

  select(id: string | number | null) {
    if (!id) return;
    this.draw.changeMode('simple_select', { featureIds: id })
  }

  remove(id: string | number | null) {
    if (!id) return;
    this.store.dispatch(Remove({ annotationId: id + ''}));
    this.draw.delete(id)
  }
}
