import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  start() {
    this.router.navigate(['/question'], { queryParams: { category: this.selectedCategory.id, page: 1 } });
  }

  dropDownToggle(event: Event) {
    event.stopPropagation();
    this.dropdownToggle = !this.dropdownToggle
  }

  selectCategory(category: CategoryModel) {
    this.selectedCategory = category;
    this.dropdownToggle = false;
  }

  getCategories() {
    this.apiService.getCategories().subscribe(({ trivia_categories }: any) => {
      this.categories = trivia_categories;
    });
  }

}
