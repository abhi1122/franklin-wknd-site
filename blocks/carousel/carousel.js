import { createOptimizedPicture, decorateIcons } from '../../scripts/lib-franklin.js';

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

    //   move slide by -100%
    slides.forEach((slide, indx) => {
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

    //   move slide by 100%
    slides.forEach((slide, indx) => {
      slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
    });
  });
}
export default function decorate(block) {
  const mainDiv = document.createElement('div');

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
  const buttonNxt = document.createElement('button');
  const spanNxt = document.createElement('span');
  spanNxt.className = 'icon icon-arrowl';
  buttonNxt.append(spanNxt);
  buttonNxt.className = 'btn btn-next';

  const buttonPrev = document.createElement('button');
  const spanPrev = document.createElement('span');
  spanPrev.className = 'icon icon-arrowr';
  buttonPrev.append(spanPrev);
  buttonPrev.className = 'btn btn-prev';
  mainDiv.append(buttonNxt);
  mainDiv.append(buttonPrev);
  decorateIcons(mainDiv);
  block.append(mainDiv);
  loadSlider();
}
