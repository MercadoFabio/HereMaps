import { environment } from "src/environments/environment.prod";
import { Component, ViewChild, ElementRef } from '@angular/core';
import H from '@here/maps-api-for-javascript';
import { marcadoresProvider } from '../providers/marcadorProvider';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent {
  ListaMarcadores: [] = [];
  private map?: H.Map;
  constructor(private marcadorApi: marcadoresProvider) {
  }
  async obtenerMarcadores(map: H.Map) {
    this.marcadorApi.GetMarcadores().subscribe((data) => {
      if (data.ok) {
        this.ListaMarcadores = data.listaMarcadores;
        this.getMarcadores(map, this.ListaMarcadores);

      } else {
        alert(data.error);
      }
    })
  }
  getMarcadores(map: H.Map, arrayMarcadores: Array<any>) {
    const marker = [];
    for (var index = 0; index < arrayMarcadores.length; index++) {
      const element = { lat: arrayMarcadores[index].latitud, lng: arrayMarcadores[index].longitud };
      marker.push(new H.map.Marker(element));
      map.addObject(marker[index]);
    }
  }
  @ViewChild('map') mapDiv?: ElementRef;

  ngAfterViewInit(): void {

    if (!this.map && this.mapDiv) {
      // instantiate a platform, default layers and a map as usual
      const platform = new H.service.Platform({
        apikey: environment._apiKey
      });
      const layers = platform.createDefaultLayers();
      const map = new H.Map(
        this.mapDiv.nativeElement,
        layers.vector.normal.map,
        {
          pixelRatio: window.devicePixelRatio,
          center: { lat: -31.442422, lng: -64.1954641 },
          zoom: 10,
        },
      );
      this.map = map;
      var scroll = new H.mapevents.MapEvents(map);
      new H.mapevents.Behavior(scroll);
      H.ui.UI.createDefault(map, layers, 'es-ES').getControl('mapsettings')
      this.obtenerMarcadores(map)
    }
  }
}
