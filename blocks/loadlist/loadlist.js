export default async function decorate(block) {
  const mainDiv = document.createElement('div');
  const resp = await fetch('/magazines/magazines.json');
  const json = await resp.json();
  console.log(json)
  json.data.forEach((row) => {
    const h2 = document.createElement('h4');
    h2.innerHTML = row.Name;
    const p = document.createElement('p');
    p.innerHTML = row.Details;
    mainDiv.append(h2);
    mainDiv.append(p);
  });
  block.append(mainDiv);
  block.append(createPageing(json.total));
}

function createPageing(totalPage) {
  const mainDiv = document.createElement('div');
  let anchor = document.createElement('a');
  anchor.innerHTML = '&laquo;';
  mainDiv.append(anchor);
  mainDiv.classList.add("pagination");
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
