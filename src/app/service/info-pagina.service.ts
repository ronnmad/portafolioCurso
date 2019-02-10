import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';
import { InfoEquipo } from '../interfaces/info-equipo.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
 info: InfoPagina = {};
 cargada = false;
 equipo: any[] = [];


  constructor( private http: HttpClient) { 
    this.cargarInfo();
    this.cargarEquipo();
1  }
  
  private cargarInfo(){
    this.http.get('assets/data-pagina.json')
     .subscribe(
        (resp:InfoPagina)=>{ 
            this.cargada = true;
            this.info = resp;
           
         }
     )
  }

  private cargarEquipo(){
    this.http.get('https://angular-curso-1e7f8.firebaseio.com/equipo.json')
      .subscribe(
       (resp2:InfoEquipo[])=>{ 
          this.cargada = true;
            this.equipo = resp2;
        }
      )

  }


}
