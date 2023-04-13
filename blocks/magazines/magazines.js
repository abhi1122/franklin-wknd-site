import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

export default async function decorate(block) {
  let url = '/magazines/magazines.json';
  [...block.children].forEach((row) => {
    if (row
      .querySelectorAll('a')[0].text) {
      url = row
        .querySelectorAll('a')[0].text;
    }
  });
  block.textContent = '';
  const ul = document.createElement('ul');

  const resp = await fetch(url);
  const json = await resp.json();
  json.data.forEach((row) => {
    const li = document.createElement('li');
    const imageDiv = document.createElement('div');
    const img = document.createElement('img');
    img.src = row.Image;
    imageDiv.append(img);
    imageDiv.className = 'magazines-magazine-image';
    //---
    const contentDiv = document.createElement('div');
    const h2 = document.createElement('h4');
    h2.innerHTML = row.Title;
    const p = document.createElement('p');
    p.innerHTML = row.Details;
    contentDiv.append(h2);
    contentDiv.append(p);
    contentDiv.className = 'magazines-magazine-body';

    const a = document.createElement('a');
    a.href=row.Link;
    a.append(imageDiv);
    a.append(contentDiv);
    li.append(a);
    ul.append(li);
  });
  ul.querySelectorAll('img').forEach((img) => img.replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '300' }])));
  block.append(ul);
}
