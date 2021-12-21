import { API_Category } from '../data/Categories.js';

export class Category {
  constructor(name, level) {
    this.name = name;
    this.level = level;
  }

  createCategory(name, level) {
    API_Category('http://localhost/rest/index.php/Category/save', name, level);
  }

  deleteCategory(name, level) {
    API_Category(
      'http://localhost/rest/index.php/Category/delete',
      name,
      level
    );
  }
}
