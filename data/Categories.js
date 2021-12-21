import { Category } from '../models/Category.js';

export const API_Category = async (url, name, level) => {
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      name: name,
      level: level,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((error) => console.error('Error:', error))
    .then((response) => console.log('Success:', response));
};

export const getCategories = async () => {
  const data = await fetch(
    'http://localhost/rest/index.php/Category/categories'
  );
  const cate = await data.json();
  const cateElement = await cate.map(
    (category) => new Category(category.name, category.level)
  );
  return cateElement;
};
