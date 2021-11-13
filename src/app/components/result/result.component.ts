import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/services/data.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  score: string;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.score = this.dataService.getLastQuizScore();
  }

}
