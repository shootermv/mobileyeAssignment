import { Component, Input } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent  {
  @Input() map: mapboxgl.Map | null = null;
  @Input() accessToken: string = '';
  term: string = '';

  search() {
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.term}.json?access_token=${this.accessToken}`)
    .then(r => r.json())
    .then(data => {
      this.map?.flyTo({
        center: data.features[0].center
      });
    })
  }
}
