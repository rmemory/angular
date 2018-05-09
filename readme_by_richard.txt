1) src/index.html is the file served by the server, by default using
the <app-root> tag.

2) Angular uses a virtual or shadow dom that it controls dynamically.

3) Angular maps Components via Modules.

See src/app/app.component.ts, which has a couple important parts:

* An import statement:
import { Component } from  '@angular/core';

* A class decorator:
@Component({
  selector: ''app-root'
  templateUrl: <path>
  styleUrls: <path>
})

* a Class export:

export class AppComponent {
// business logic for component goes here
}

Note, its a TypeScript class.

4) Angular imports several JS files in index.html file, which bundles
modules and components into the index.html. They include:

inline.bundle.js, polyfills.bundle.js, styles.bundle.js,
vendor.bundle.js, and main.bundle.js.

5) Those js files come fromm src/main.ts (a typescript file. It
defines the primary entry point:

platform.Browser.Dynamic().boostrapModule(AppModule);

Where AppModule is defined in src/app/app.module.ts.

6) app.module.ts declares AppComponent, and declares it it as
as boostrap as AppComponent.

7) By default, the HTML is found in src/app/app.component.html with
styles located in src/app/app.component.css.

8) To create a new Component, use the command line:

$ ng generate component <myComponent>

or

$ ng g c <myComponent>

Also, note the --spec=false is a good way to prevent the test case
file from being created.

Note that modules are just regular classes too, just like a Component
is a class.

export class AppModule { }

It too has its own decorator:

@ngModule({
  declarations: [All Components],
  imports:[OtherModules],
  providers: [],
  boostrap: [AppComponent]
})

The module likewise has its own imports at the top of the file.

9) All components that are included into the app must be declared in
the declarations array in app.module.ts. For example,

  declarations: [
    AppComponent,
    ServerComponent,
    ServersComponent,
    WarningAlertComponent,
    SuccessAlertComponent
  ],

  10) Component styles go into the stylesUrl file. Just regular css
  styles.

  11) Selectors must be unique between all components. Each component requires
  a template. Styles are optional.

  12) Databinding: communication between TypeScript class and template

  * Output data from TypeScript class to Template.
  String Interpolation: {{ data }}
  HTML Property Binding: [property] = "data"

  * Input data from template into TypeScript. For example from
    a form.
  Event Binding: (event) = "expression"
  Two way binding: [(ngModel)] = "data"


12) String Interpolation Example:

Lets say the TypeScript class has these variables

serverId: number = 10;
serverStatus: string = "offline";

In the template file:

<p>Server with ID {{ serverId }} is {{ serverStatus }}</p>

Whatever is between the curly braces must resolve to a string.
The string is inline-block, like a span. It could event be a
method in the TypeScript file.

13) Property binding example:

In the template file, add this button:

<button class="btn btn-primary">Add Server</button>

Add this to the TypeScript file:

allowNewServer = false;

Change the button like this:

<button class="btn btn-primary" [disabled]="!allowNewServer">Add Server</button>

Square brackets around disabled tell angular property binding is
occurring. You can bind to any HTML property. Note the stuff between
the quotes must resolve to the proper type, in this case a boolean.

You can also bind to components and directives (in addition to binding
to HTML properties).

Note that in this case we could also just use string interpolation
because in this case the value (allowNewServer) is a boolean, and
thus it could look like this. Recall that disabled is true when its
inserted into the HTML:

<button class="btn btn-primary" "!allowNewServer">Add Server</button>

Here is another example, this time using the innerText attribute:

<p [innerText]="allowNewServer"></p>

But it is recommended to explicitly use property binding when
that is what you are doing.

Also note that you should not mix property binding and string
interplotion. Stated differently, when using property binding,
don't use the {{}} curly braces, which is what defines string
interpolation.

14) Reacting to events

An event occurs in the template, for example from a form or a
button.

Lets say in our TypeScripe file we have this property:

serverCreationStatus = "No server was created";

Lets now add a new method,

onCreateServer() {
  this.serverCreationStatus = "Server was created";
}

In button in the template, we can inform Angular to call our
onCreateServer. The way this is done is by using regular
parenthesis, (). For example,

<button class="btn btn-primary" (click)="onCreateServer()")>Add Server</button>

Where 'click' is the normal event type.

The event object is passed to the method like this:

onCreateServer(event: any) {
  this.serverCreationStatus = "Server was created";
}

But it requires it to be passed from the template first:

<button class="btn btn-primary" (click)="onCreateServer($event)")>Add Server</button>

15) All HTML properties and events are bindable. Here is an another
example:

<label>Some name</label>
<input
  type="text"
  class="form-control"
  (input)="onUpdateServerName($event)">

That will call onUpdateServerName method in the TypeScript class
as the user types (ie. in this case an "input" event).

onUpdateServerName(event: any) {
  // Note the event.target here is an actual HTML input element
  this.someServerName = <HTMLInputElement>event.target.value;
}

16) Two way data binding using ngModel. This requires the FormsModule
module to be imported into our imports array in the AppModule, plus
this import statement in AppModule:

import { FormsModule } from '@angular/forms';

The syntax used here is a hybrid between property binding (square brackets)
and event binding (regular parenthesis).

<label>Some name</label>
<input
  type="text"
  class="form-control"
  [(ngModel)]="someServerName">

The above automatically updates the someServerName property in the
TypeScript file. Furthermore, and other location in the template
which is using the someServerName (such as string interpolation or
property binding) will also be automatically updated.

Hence two way binding.

17) directives

Directives are instructions in the Dom. Components themselves are
a kind of directive as they are inserted in to the DOM. Components
are directives with a template (HTML file)

There are also directives without a template. Here is an example:

<p appTurnGreen>Recieves a green background</p>

@Directive({
  selector: '[appTurnGreen]'
})
export class TurnGreenDirective {

}

18) Or we can use built in directives.

@ngIf is a structural directive, meaning it changes the structure
of the DOM (either the element is added or it is not). Not hidden.

<p *ngIf="any expression returning true or false">Server was create, server name is {{serverName}}</p>

for example,
<p *ngIf="serverCreated">Server was create, server name is {{serverName}}</p>

19) Here is the else case for ngIf

<p *ngIf="serverCreated; else noServer">Server was create, server name is {{serverName}}</p>
<ng-template #noServer>
<p>No server was created</p>
</ng-template>

20) ngStyle

Here is the ngStyle directive. This one is not a structural directive
because it doesn't impact the structure of the DOM (ie. no elements are
added or removed). This one just updates styles.

Lets say in our TypeScript constructor we add this code:

constructor() {
  this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
}

Meaning sometimes serverStatus is online sometimes its offline, randomly.

Now lets say we want to change the color of the text depending on the
server status. Note the usage of property binding, square brackets around
ngStyle. In other words, we are binding to the ngStyle property of the
ngStyle directive.

It expects to get a java script object, and that is where we define the
CSS styles which are to be applied as key value pairs. For example,

{backgroundColor: getColor()}

Where the camel case backgroundColor turns into background-color, and
the getColor method returns a string containing the appropriate color.
For example, in this case either 'red' or 'green' depending on the server
status. Doesn't have to be a method. Could be hardcoded color strings.

<p [ngStyle="{backgroundColor: getColor()}"]=>The server status is {{ serverStatus }} </p>

21) ngClass

The ngClass dynamically assigns CSS classes to elements.

Lets say we have CSS class:

.online {
  color: white;
}

<p [ngClass="{online: isServerStatus === 'online'}"]=>The server status is {{ serverStatus }} </p>

Note that in this example, online class is only applied if the isServerStatus
property is set to a value of 'online'.

ngClass only adds the class if the condition is true.

22) ngFor

Lets say we have an array in our TypeScript.

servers = ['Testserver', 'Testserver 2'];

Now in our template,

<app-server *ngFor="let server of servers">The server is {{$server}}<app-server>

In order to get the counter index in the for loop, we could do this:

<app-server *ngFor="let server of servers; let i = index">The server is {{$server}}<app-server>

index is a reserved word in that case.

23)
