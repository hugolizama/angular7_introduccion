import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: []
})
export class GaleriaComponent implements OnInit {

  @Input() peliculas: any[] = [];
  @Input() cargando = true;
  @Input() titulo: string;

  constructor() { }

  ngOnInit() {
  }

}
