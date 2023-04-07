import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

function createPageing(totalPage) {
  const mainDiv = document.createElement('div');
  let anchor = document.createElement('a');
  anchor.innerHTML = '&laquo;';
  mainDiv.append(anchor);
  mainDiv.classList.add('pagination');
  for (let i = 1; i <= totalPage; i++) {
    const anchor2 = document.createElement('a');
    anchor2.innerHTML = i;
    mainDiv.append(anchor2);
  }
  anchor = document.createElement('a');
  anchor.innerHTML = '&raquo;';
  mainDiv.append(anchor);
  return mainDiv;
}

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

    li.append(imageDiv);
    li.append(contentDiv);
    ul.append(li);
  });
  ul.querySelectorAll('img').forEach((img) => img.replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '300' }])));
  block.append(ul);
  // block.append(createPageing(json.total));
}
