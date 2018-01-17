import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
/*JSON-Queries
Standort nach gps: http://transport.opendata.ch/v1/locations?x=...&y=...
Standort nach name: http://transport.opendata.ch/v1/locations?query=
Verbindung: http://transport.opendata.ch/v1/connections?from=...&to=...
*/
export class State {
  constructor(public name: string, public population: string, public flag: string) { }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  stateCtrl: FormControl;
  filteredStates: Observable<any[]>;
  title = 'app';
  position:any;
  states: State[] = [
    {
      name: 'Arkansas',
      population: '2.978M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
    },
    {
      name: 'California',
      population: '39.14M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
    },
    {
      name: 'Florida',
      population: '20.27M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
    },
    {
      name: 'Texas',
      population: '27.47M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    }
  ];

  ngOnInit(){
    if(window.navigator.geolocation){
        window.navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
        };
    }
    setPosition(pos:any){
      this.position = pos;
      console.log(this.position.coords.latitude);
    }
    constructor() {
      this.stateCtrl = new FormControl();
      this.filteredStates = this.stateCtrl.valueChanges
        .pipe(
          startWith(''),
          map(state => state ? this.filterStates(state) : this.states.slice())
        );
    }
  
    filterStates(name: string) {
      return this.states.filter(state =>
        state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
    }
}

