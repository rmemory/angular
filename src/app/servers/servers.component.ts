import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  //selector: [app-servers] is an attribute selector, <div app-servers>
  //selector: .app-servers is a class selector, <div class="app-server"
  templateUrl: './servers.component.html',
  // template: `
  //           <app-server></app-server>

  //           <app-server></app-server>`,
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreationStatus = 'No server was created';
  serverName='';

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  ngOnInit() {
  }

  onCreateServer() {
    this.serverCreationStatus = 'Server was created. Sever name is ' + this.serverName;
  }

  onUpdateSeverName(event: any) {
    this.serverName = event.target.value;
  }
}
