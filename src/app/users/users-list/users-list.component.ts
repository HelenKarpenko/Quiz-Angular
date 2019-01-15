import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService, User, AuthenticationService, Test, ListConfig } from '../../core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  @Output() editClick = new EventEmitter();


  listConfig: ListConfig = {
    filters: {}
  };

  query: ListConfig;
  users: User[] = [];
  loading = false;
  currentPage = 1;
  totalPage: Array<number> = [1];
  pageSize: number = 6;
  searchString: string = "";
  onEditClick: boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
  ) { 
    this.query = this.listConfig;
    this.currentPage = 1;
    this.runQuery();
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAll().subscribe(
      (users: User[]) => {
        console.log(users);
        this.users = users;
      }
    )
  }

  onEditClickEvent() {
    this.onEditClick = !this.onEditClick;
  }

  onRemove(id: string) {
    this.userService.delete(id).subscribe(
      (user: User) => {
        var filtered = this.users.filter(function(el) {
          return el.id === user.id;
        });
        var index = this.users.indexOf(filtered[0]);
        if(index !== -1){
          this.users.splice(index, 1);
        }
      }
    );
  }

  onSearchChange(searchString: string) {  
    this.searchString = searchString;
    this.currentPage = 1;
    this.runQuery();
  }

  runQuery() {
    this.loading = true;
    this.users = [];

    if (this.pageSize) {
      this.query.filters.page = this.currentPage;
      this.query.filters.pageSize = this.pageSize;
      this.query.filters.query = this.searchString;
    }

    this.userService
    .query(this.query)
    .subscribe((data: any) => {
      console.log(data);
      this.loading = false;
      this.users = data.data;
      console.log(this.users);

      this.totalPage = data.paging.pageCount;
    })
  }

  showInfo(user: User) {
    this.router.navigateByUrl(`/users/${user.id}`);
  }
}
