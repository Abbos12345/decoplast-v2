const hero = document.querySelector('.hero');
const slider = document.querySelector('.slider');
const logo = document.querySelector('#logo');
const languageSelector = document.getElementById('languageSelector');
const headline = document.querySelector('.headline');
const preLoader = document.querySelector('.pre-loader');
const aboutUsText = document.getElementById('about-us__text');

const tl = new TimelineMax();



tl.fromTo(hero, 1, {height: "0%"}, {height: "80%", ease: Power2.easeInOut})
.fromTo(hero, 1.2, {width: "100%"}, {width: "80%", ease: Power2.easeInOut})
.fromTo(slider, 1.2, {x: "-100%"}, {x: "0%", ease: Power2.easeInOut}, "-=")
.fromTo(logo, 0.5, {opacity: 0, x: 30}, {opacity: 1, x: 0}, "-=0.5")
.fromTo(languageSelector, 0.5, {opacity: 0, x: -30}, {opacity: 1, x: 0}, "-=1")
.fromTo(headline, 0.5, {opacity: 0}, {opacity: 1, ease: Power2.easeInOut}, "-=0.5");



function loadJSON(language) {
    fetch('./assets/json/language.json')
      .then((response) => response.json())
      .then((data) => updateContent(data[language], language))
      .catch((error) => console.error('Error loading JSON:', error));
  }

  function updateContent(data, language) {
    headline.textContent = data.headline;
    aboutUsText.textContent = data.aboutTxt;

    // const newPath = language === 'en' ? '/' : `/${language}`;
    // history.pushState(null, '', newPath);
    localStorage.setItem('selectedLanguage', language);
  }

  document.getElementById('languageSelector').addEventListener('change', (event) => {
    const selectedLanguage = event.target.value;
    loadJSON(selectedLanguage);
  });
  
  const storedLanguage = localStorage.getItem('selectedLanguage');
  const defaultLanguage = storedLanguage || 'en';
  loadJSON(defaultLanguage);