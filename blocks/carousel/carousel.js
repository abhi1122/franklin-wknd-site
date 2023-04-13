import { createOptimizedPicture, decorateIcons } from '../../scripts/lib-franklin.js';

function updateIndicators(curSlide) {
  Array.from(document.querySelectorAll('.carousel-indicators li')).forEach((el) => el.classList.remove('carousel-indicators-active'));
  const indicators = document.querySelector(`.carousel-indicators li:nth-child(${curSlide + 1})`);
  indicators.classList.add = 'carousel-indicators-active';
  indicators.className = 'carousel-indicators-active';
}
function createIndicators(count) {
  const ol = document.createElement('ol');
  ol.className = 'carousel-indicators';
  for (let i = 0; i < count; i++) {
    const li = document.createElement('li');
    if (i === 0) {
      li.className = 'carousel-indicators-active';
    }
    li.innerHTML = i;
    ol.append(li);
  }
  return ol;
}

function loadSlider() {
  const slides = document.querySelectorAll('.slide');

  // loop through slides and set each slides translateX
  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${indx * 100}%)`;
  });

  // select next slide button
  const nextSlide = document.querySelector('.btn-next');

  // current slide counter
  let curSlide = 0;
  // maximum number of slides
  const maxSlide = slides.length - 1;

  // add event listener and navigation functionality
  nextSlide.addEventListener('click', () => {
    // check if current slide is the last and reset current slide
    if (curSlide === maxSlide) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    updateIndicators(curSlide);
    //   move slide by -100%
    slides.forEach((slide, indx) => {
      console.log(indx - curSlide);
      slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
    });
  });

  // select next slide button
  const prevSlide = document.querySelector('.btn-prev');

  // add event listener and navigation functionality
  prevSlide.addEventListener('click', () => {
    // check if current slide is the first and reset current slide to last
    if (curSlide === 0) {
      curSlide = maxSlide;
    } else {
      curSlide--;
    }
    updateIndicators(curSlide);
    //   move slide by 100%
    slides.forEach((slide, indx) => {
      slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
    });
  });
}
export default function decorate(block) {
  const mainDiv = document.createElement('div');
  const totalSlide = block.children.length;
  [...block.children].forEach((row) => {
    const div = document.createElement('div');
    div.className = 'slide';
    div.innerHTML = row.innerHTML;
    [...div.children].forEach((divChild, index) => {
      if (index === 0) {
        divChild.className = 'carousel-image';
      } else {
        divChild.className = 'carousel-content';
      }
    });
    mainDiv.className = 'slider';
    mainDiv.append(div);
  });
  mainDiv
    .querySelectorAll('img')
    .forEach((img) => img
      .closest('picture')
      .replaceWith(
        createOptimizedPicture(img.src, img.alt, false, [{ width: 'auto' }]),
      ));
  block.textContent = '';
  const buttonSpan = document.createElement('span');
  const buttonNxt = document.createElement('button');
  const spanNxt = document.createElement('span');
  spanNxt.className = 'icon icon-arrowr';
  buttonNxt.append(spanNxt);
  buttonNxt.className = 'btn btn-next';

  const buttonPrev = document.createElement('button');
  const spanPrev = document.createElement('span');
  spanPrev.className = 'icon icon-arrowl';
  buttonPrev.append(spanPrev);
  buttonPrev.className = 'btn btn-prev';
  buttonSpan.append(buttonPrev);
  buttonSpan.append(buttonNxt);
  mainDiv.append(buttonSpan);
  decorateIcons(mainDiv);
  mainDiv.append(createIndicators(totalSlide));
  block.append(mainDiv);
  loadSlider();
}
