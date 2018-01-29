import { Component, OnInit, OnDestroy } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {
    this.subscription = this.regresaObservable()
      .subscribe(
        numero => console.log('subs,' + numero),
        error => console.error('Error en el obs ', error),
        () => console.log('El observador termino!'));
  }
  ngOnInit() {
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  regresaObservable(): Observable<any> {
    return new Observable(observer => {
      let contador = 0;
      const intervalo = setInterval(() => {
        const salida = {
          valor: contador
        }
        contador += 1;
        observer.next(salida);
/*         if (contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        } */
        // if (contador === 2) {
        //   clearInterval(intervalo);
        //   observer.error('Auxilio');
        // }
      }, 500);
    }).retry().map((resp: any) => {
      return resp.valor + 1;
    }).filter((valor, index) => {
      if ( valor % 2 === 1 ){
        //impar
        return true;
      } else {
        //false
        return false;
       }
    });
  }
}
