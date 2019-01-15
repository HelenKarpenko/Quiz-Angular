import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService, User, UserAnswers } from '../../core'

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  displayedColumns: string[] = ['position', 'testName', 'passageDate', 'result'];
  user: User;
  dataSource: UserAnswers[]

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.get(id).subscribe(
      (user: User) => {
        this.user = user;
        this.getUserAnswers();
      }
    )
  }

  getUserAnswers() {
    this.userService.getUserAnswers(this.user.id).subscribe(
      (testResult: UserAnswers[]) => {
        this.user.testResults = testResult;
        console.log(this.user.testResults[0].details[0]);
      }
    )
  }

  showInfo(id: number) {
    this.router.navigateByUrl(`/results/${id}`);
  }
}
