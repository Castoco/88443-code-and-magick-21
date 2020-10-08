'use strict';

const WIZARD_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
const WIZARD_LASTNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
const COAT_COLOR = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
const EYES_COLOR = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];


const userWindow = document.querySelector('.setup');
userWindow.classList.remove('hidden');

document.querySelector('.setup-similar').classList.remove('hidden');

const getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomWizard = function () {
  const wizards =
    {
      name: `${WIZARD_NAMES[getRandomNumber(0, WIZARD_NAMES.length - 1)]}  ${WIZARD_LASTNAMES[getRandomNumber(0, WIZARD_LASTNAMES.length - 1)]}`,
      coatColor: COAT_COLOR[getRandomNumber(0, COAT_COLOR.length - 1)],
      eyesColor: EYES_COLOR[getRandomNumber(0, EYES_COLOR.length - 1)]
    };
  return wizards;
};

const baseWizards = [];
const wizardQuantity = 4;

for (let i = 0; i < wizardQuantity; i++) {
  baseWizards.push(randomWizard());
}

const wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
const similarList = document.querySelector('.setup-similar-list');

const renderWizard = function (render) {
  const wizardElement = wizardTemplate.cloneNode(true);
  const nameWizard = wizardElement.querySelector('.setup-similar-label');
  wizardElement.querySelector('.wizard-coat').style.fill = render.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = render.eyesColor;
  nameWizard.textContent = render.name;

  return wizardElement;
};

const fragment = document.createDocumentFragment();
for (let i = 0; i < baseWizards.length; i++) {
  fragment.appendChild(renderWizard(baseWizards[i]));
  similarList.appendChild(fragment);
}

