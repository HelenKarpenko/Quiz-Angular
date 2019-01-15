import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthenticationService, User } from 'src/app/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  @Input() title: string;
  @Output() sendSearchString = new EventEmitter<string>();
  @Output() onEditClick = new EventEmitter();

  editClick: boolean = false;
  searchString: string  = '';

  isAdmin: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.authService.currentUser.subscribe(user => {
      if(user){
        console.log("----"+user);
        console.log("==="+user.id);
        if(user.roles){
          // var index = user.roles;
          console.log("+=+="+index);
        var index = user.roles.indexOf["admin"];
        console.log("+=+="+index);
        this.isAdmin = index !== -1;
        }
      }
    });
  }

  _sendSearchString() {
    this.sendSearchString.emit(this.searchString)
  }

  _onEditClick() {
    this.editClick = !this.editClick;
    this.onEditClick.emit();
  }

  clear() {
    this.searchString = "";
    this.sendSearchString.emit(this.searchString)
  }

  onAddClick() {
    this.router.navigateByUrl(`/create`);
  }
}
