import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dropdownToggle: boolean = false;
  categories: CategoryModel[] = [];
  selectedCategory: CategoryModel;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getCategories();
    this.getQuestions();
  }

  start() {
  }

  dropDownToggle( event: Event) {
    event.stopPropagation();
    this.dropdownToggle = !this.dropdownToggle
  }

  selectCategory(category: CategoryModel) {
    this.selectedCategory = category;
    this.dropdownToggle = false;
  }

  getCategories() {
    this.apiService.getCategories().subscribe(({trivia_categories}: any) => {
        this.categories = trivia_categories;
    });
  }

  getQuestions() {
      this.apiService.getQuestion(10).subscribe(({ results }: any) => {
          console.log(results);
      });
  }

}
