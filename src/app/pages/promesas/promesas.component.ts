import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

   contador: number = 0;

  constructor() {
    this.contarTres().then((cont) => {
      console.log('Funciono! ' + cont);
    }).catch( (error) => {
      console.error('Error en la promesa, ' + error);
    });
  }
  ngOnInit() {
  }
  contarTres(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        this.contador += 1;
        if  ( this.contador <= 3 ) {
          resolve(true);
          clearInterval(interval);
        } else {
          reject(false);
          clearInterval(interval);
        }
      }, 1000);
    });
  }
}
