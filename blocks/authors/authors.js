import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.innerHTML = row.innerHTML;
    [...li.children].forEach((divChild, index) => {
      if (index === 0) {
        divChild.className = 'authors-image';
      } else {
        divChild.className = 'authors-content';
      }
    });
    li
      .querySelectorAll('.authors-content p').forEach((tag, index) => {
        if (index === 2) {
          const e = tag;
          const d = document.createElement('div');
          d.className = 'socials-social-body';
          d.innerHTML = e.innerHTML;
          e.parentNode.replaceChild(d, e);
        }
      });
    ul.append(li);
  });
  ul
    .querySelectorAll('img')
    .forEach((img) => img
      .closest('picture')
      .replaceWith(
        createOptimizedPicture(img.src, img.alt, false, [{ width: 'auto' }]),
      ));
  block.textContent = '';
  block.append(ul);
}
