import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Add } from './store/actions';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxDraw from '@mapbox/mapbox-gl-draw';
import { Feature } from 'geojson';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  annotations: Feature[] = [];
  map: mapboxgl.Map | null = null;
  modes: string[] = ['Point', 'Line', 'Poly'];
  draw: MapboxDraw | null = null;
  selectedMode: string = '';

  constructor(private store: Store<{ annotations: Feature[] }>) {
    store.select('annotations').subscribe((data: Feature[]) => {
      this.annotations = data;
    });
  }
  ngOnInit() {
    (mapboxgl as any).accessToken = environment.accessKey;

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-79.4512, 43.6568],
      zoom: 13,
    });

    this.draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        line_string: false,
        polygon: false,
        point: false,
        trash: false,
      },
    });

    this.map.addControl(this.draw);

    this.map.on('draw.create', (evt: any) => {
      const newFeature = evt.features[0];
      this.store.dispatch(Add({ annotation: newFeature }));
      // reset mode
      this.selectedMode = '';
    });
    // populate shapes on the map
    if (this.annotations.length) {
      this.draw?.set({
        type: 'FeatureCollection',
        features: this.annotations,
      });
    }
  }

  changeMode(mode: string) {
    this.selectedMode = mode;
    const modesMap: any = {
      Poly: 'polygon',
      Line: 'line_string',
      Point: 'point',
      Nothing: 'simple_select',
    };
    this.draw?.changeMode(`draw_${modesMap[mode]}` as 'draw_line_string');
  }
}
