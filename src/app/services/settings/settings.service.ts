import { Injectable, Inject} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

  constructor( @Inject(DOCUMENT) private _document) {
    this.cargarAjustes();
  }

  //Con esto guardo en el localstorage
  guardarAjustes() {
    console.log('Guardo en el localStorage');
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustes(){
    //Puede q haya o no ajustes
    if (localStorage.getItem('ajustes')){
      //Si existen los ajustes hago esto
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      console.log('Carganodo ajustes de localStorage');
      this.aplicarTema(this.ajustes.tema);
    }else {
      console.log('No hay ajustes para cargar');
    }
  }
  aplicarTema( tema: string ) {
    let url = `assets/css/color/${tema}.css`;
    this._document.getElementById('tema').setAttribute('href', url );
    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;
    this.cargarAjustes();
  }

}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
