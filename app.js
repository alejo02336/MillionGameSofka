import { UI } from './models/UI.js';

function main() {
  const page = document.getElementById('page');
  const ui = new UI(page);

  ui.init();
}

main();
