import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

export default function decorate(block) {
  const div = document.createElement('div');
  [...block.children].forEach((row) => {
    div.innerHTML = row.innerHTML;
    [...div.children].forEach((divChild, index) => {
      if (index === 0) {
        divChild.className = 'cardLeftImage-image';
      } else {
        divChild.className = 'cardLeftImage-content';
      }
    });
  });
  div
    .querySelectorAll('img')
    .forEach((img) => img
      .closest('picture')
      .replaceWith(
        createOptimizedPicture(img.src, img.alt, false, [{ width: 'auto' }]),
      ));
  block.textContent = '';
  block.append(div);
}
