import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Endereco } from './endereco';
import { Mapa } from './mapa';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'formulario';
  endereco: Endereco = new Endereco();
  mapa: Mapa = new Mapa();

  constructor(private http: HttpClient) {

  }



  BuscaCep() {
    this.http.get(`https://viacep.com.br/ws/${this.endereco.cep}/json/`).toPromise().then(
      data => {
        const dado: any = data;
        this.endereco.logradouro = dado.logradouro;
        this.endereco.bairro = dado.bairro;
        this.endereco.cidade = dado.localidade;
        this.endereco.uf = dado.uf;
      })
  }

  BuscaCordenadas() {
    this.http.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.endereco.logradouro}%20${this.endereco.bairro}.json?access_token=pk.eyJ1IjoidmlpbmlvbGl2ZWlyYSIsImEiOiJja25wOHV2NG4wMGdsMm9tdm42NWI2N2JuIn0.lvokJq504sfZ6F4wxgKf6Q`).toPromise().then(
      data => {
        const cordenadas: any = data;

        this.mapa.longitude = cordenadas.features[0].geometry.coordinates[0];
        this.mapa.latitude = cordenadas.features[0].geometry.coordinates[1];

      })

  }

  lat = this.mapa.latitude
  long = this.mapa.longitude
}
