import { Component, OnInit } from '@angular/core';
/*JSON-Queries
Standort nach gps: http://transport.opendata.ch/v1/locations?x=...&y=...
Standort nach name: http://transport.opendata.ch/v1/locations?query=
Verbindung: http://transport.opendata.ch/v1/connections?from=...&to=...
*/
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  position:any;
  ngOnInit(){
    if(window.navigator.geolocation){
        window.navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
        };
    }
    setPosition(pos:any){
      this.position = pos;
      console.log(this.position.coords.latitude);
    }
}

