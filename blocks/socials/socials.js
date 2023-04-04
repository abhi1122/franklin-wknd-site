export default function decorate(block) {
  const div = document.createElement('div');
  div.className = 'socials-social-body';
  [...block.children].forEach((row) => {
    div.innerHTML = row.innerHTML;
  });

  block.textContent = '';
  block.append(div);
}
