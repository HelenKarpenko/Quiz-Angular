import { Component, Input } from '@angular/core';

import { Test } from 'src/app/core/models';

@Component({
  selector: 'app-test-preview',
  templateUrl: './test-preview.component.html',
  styleUrls: ['./test-preview.component.css']
})
export class TestPreviewComponent {
  @Input() test: Test;
}
