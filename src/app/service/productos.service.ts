import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];
  constructor(private http: HttpClient) { 
    this.CargarProductos();
  }

  private CargarProductos(){
    return new Promise( (resolve,reject)=> {
        
      this.http.get('https://angular-curso-1e7f8.firebaseio.com/productos_idx.json')
      .subscribe(
        (resp: Producto[])=> {
          console.log(resp);
          this.productos = resp;
          this.cargando = false;
          resolve();
        }
      );

    })

  }

  public getProducto( id: string ){
   return  this.http.get(`https://angular-curso-1e7f8.firebaseio.com/productos/${ id }.json`)
  }

  public buscarPoducto( termino: string ){

    if(this.productos.length === 0){
      this.CargarProductos().then(()=>{
          this.filtrarProductos(termino);
      })
    }
    else{
      this.filtrarProductos(termino);
    }
    //  this.productosFiltrado = this.productos.filter(producto =>{ return true;});
   

}

private filtrarProductos( termino: string ){
    termino = termino.toLocaleLowerCase();
    this.productosFiltrado = [];
    console.log("limpio "+ this.productosFiltrado);
    this.productos.forEach( prod=>{
      const tituloLower: string = prod.titulo.toLocaleLowerCase();
      if(prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0){
        this.productosFiltrado.push( prod );
        console.log(prod);
      }
      
    });
    console.log("lleno "+ this.productosFiltrado);
}
}