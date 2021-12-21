import { getCategories } from '../data/Categories.js';
import { Category } from './Category.js';
export class UI {
  constructor(page) {
    this.page = page;
  }

  init() {
    //DOM Events
    document
      .getElementById('back')
      .addEventListener('click', () => this.showMenu());

    this.showMenu();
  }

  showMenu() {
    const menu = `<section class="main-menu">
          <div class="card">
            <div class="card-body">
              <button id="play" type="button" class="btn btn-primary btn-lg btn-block">
                Jugar
              </button>
              <button id="createq" type="button" class="btn btn-primary btn-lg btn-block">
                Crear preguntas
              </button>
              <button id="createc" class="btn btn-primary btn-lg btn-block">
                Crear categoria
              </button>
              <button type="button" class="btn btn-primary btn-lg btn-block">
                Tabla de records
              </button>
            </div>
          </div>
        </section>`;
    page.innerHTML = menu;
    this.addMenuEvents();
  }

  showCreateCategories() {
    const createCategory = `<div class="card">
        <div class="card-body">
          <form id="saveCategory">
            <div class="form-group">
              <label for="categoryname">Nombre categoria</label>
              <input
                type="text"
                class="form-control"
                id="categoryname"
                aria-describedby="emailHelp"
                placeholder="Ingresa el nombre de la categoria"
                required
              />
            </div>
            <label for="categorylvl">Nivel categoria</label>
            <select id="categorylvl" class="form-control mb-3"></select>
            <button  type="submit" class="btn btn-primary">
              Guardar categoria
            </button>
          </form>
        </div>
      </div>

      <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Nivel</th>
              <th scope="col">Opcion</th>
            </tr>
          </thead>
          <tbody id="categoryList"></tbody>
      </table>`;
    page.innerHTML = createCategory;
    this.addCategorylvl();
    this.addCategoryEvent();
    this.showCategoryList();
  }

  addMenuEvents() {
    document
      .getElementById('createc')
      .addEventListener('click', () => this.showCreateCategories());
  }

  addCategorylvl() {
    const combo = document.getElementById('categorylvl');
    getCategories().then((res) => {
      let levels = [];
      res.map((category) => levels.push(category.level));
      var niveles = ['1', '2', '3', '4', '5'];
      var result = niveles.filter((el) => !levels.includes(el));

      for (let i = 0; i < result.length; i++) {
        const option = document.createElement('option');
        combo.append(option);
        option.innerText = result[i];
      }
    });
  }

  addCategoryEvent() {
    document.getElementById('saveCategory').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('categoryname').value;
      const level = document.getElementById('categorylvl').value;
      const category = new Category(name, level);
      category.createCategory(name, level);
      this.showMenu();
    });
  }

  showCategoryList() {
    getCategories().then((res) => {
      const list = document.getElementById('categoryList');
      res.map((category) => {
        const tr = document.createElement('tr');
        const name = document.createElement('th');
        name.innerText = category.name;
        const level = document.createElement('td');
        level.innerText = category.level;
        const btn = document.createElement('td');

        const button = document.createElement('button');
        button.addEventListener('click', () => {
          category.deleteCategory(category.name, category.level);
          this.showMenu();
        });
        button.className = 'btn btn-danger btn-block';
        button.innerText = 'Eliminar';

        tr.appendChild(name);
        tr.appendChild(level);
        tr.appendChild(btn);
        btn.appendChild(button);

        list.appendChild(tr);
      });
    });
  }
}
