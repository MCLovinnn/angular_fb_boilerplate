import { Component, OnInit } from '@angular/core';
import { FormularService } from '../services/formular.service';
import { IRecepy } from '../formular';

@Component({
  selector: 'app-recepy-list',
  templateUrl: './recepy-list.component.html',
  styleUrls: ['./recepy-list.component.scss']
})
export class RecepyListComponent implements OnInit {
  ingredients: IRecepy[];
  constructor(private formS: FormularService) { }

  ngOnInit(): void {
  }

  open(recepy: IRecepy, index: number) {
    console.log('hi');

  }
}
