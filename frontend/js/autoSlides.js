function nextSlide() {
  var slider = document.getElementById('slider');
  var currentSlideNumber;
  for (var i = 0 ; i < 4 ; i++) {
    if (slider.children[i].checked) {
      currentSlideNumber = i;
      break;
    }
  }
  
  var currentSlide = slider.children[currentSlideNumber];
  currentSlide.checked = false;
  
  var nextSlide = slider.children[currentSlideNumber === 3 ? 0 : ++currentSlideNumber];
  nextSlide.checked = true;
}

setInterval(nextSlide, 15000);