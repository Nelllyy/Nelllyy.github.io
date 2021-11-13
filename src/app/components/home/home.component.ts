import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '@app/services/data.service';
import { CategoryModel } from 'src/app/models/category.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public dropdownToggle: boolean = false;
  public categories: CategoryModel[] = [];
  public selectedCategory: CategoryModel;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  start() {
    this.dataService.clearStorage();
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
