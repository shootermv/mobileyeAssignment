import { Component, Input } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent  {
  @Input() map: mapboxgl.Map | null = null;
  term: string = '';

  search() {
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.term}.json?access_token=${environment.accessKey}`)
    .then(r => r.json())
    .then(data => {
      this.map?.flyTo({
        center: data.features[0].center
      });
    })
  }
}
