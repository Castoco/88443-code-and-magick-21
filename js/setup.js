'use strict';

var MIN_NAME_LENGTH = 2;
var MAX_NAME_LENGTH = 25;

const WIZARD_NAMES = [
  `Иван`,
  `Хуан Себастьян`,
  `Мария`,
  `Кристоф`,
  `Виктор`,
  `Юлия`,
  `Люпита`,
  `Вашингтон`
];
const WIZARD_LASTNAMES = [
  `да Марья`,
  `Верон`,
  `Мирабелла`,
  `Вальц`,
  `Онопко`,
  `Топольницкая`,
  `Нионго`,
  `Ирвинг`
];
const COAT_COLOR = [
  `rgb(101, 137, 164)`,
  `rgb(241, 43, 107)`,
  `rgb(146, 100, 161)`,
  `rgb(56, 159, 117)`,
  `rgb(215, 210, 55)`,
  `rgb(0, 0, 0)`
];
const EYES_COLOR = [
  `black`,
  `red`,
  `blue`,
  `yellow`,
  `green`
];

const FIRE_BALL_COLOR = [
  `#ee4830`,
  `#30a8ee`,
  `#5ce6c0`,
  `#e848d5`,
  `#e6e848`
];

const WIZARDS_TOTAL = 4;

document.querySelector(`.setup-similar`).classList.remove(`hidden`);

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

const getWizardQuantity = function (number) {
  const baseWizards = [];
  const wizardQuantity = number;
  for (let i = 0; i < wizardQuantity; i++) {
    baseWizards.push(randomWizard());
  }
  return baseWizards;
};

const wizardsTotal = getWizardQuantity(WIZARDS_TOTAL);

const wizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);
const similarList = document.querySelector(`.setup-similar-list`);

const renderWizard = function (render) {
  const wizardElement = wizardTemplate.cloneNode(true);
  const nameWizard = wizardElement.querySelector(`.setup-similar-label`);
  wizardElement.querySelector(`.wizard-coat`).style.fill = render.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = render.eyesColor;
  nameWizard.textContent = render.name;

  return wizardElement;
};

const fragment = document.createDocumentFragment();
for (let i = 0; i < wizardsTotal.length; i++) {
  fragment.appendChild(renderWizard(wizardsTotal[i]));
  similarList.appendChild(fragment);
}

const setupOpen = document.querySelector(`.setup-open`);
const setup = document.querySelector(`.setup`);
const setupClose = setup.querySelector(`.setup-close`);
const setupUserName = setup.querySelector(`.setup-user-name`);

const onPopupEscPress = function (evt) {
  const curElement = document.activeElement;
  if (evt.key === `Escape` && curElement !== setupUserName) {
    evt.preventDefault();
    closePopup();
  }
};

const openPopup = function () {
  setup.classList.remove(`hidden`);
  document.addEventListener(`keydown`, onPopupEscPress);

  wizardEyes.addEventListener(`click`, function () {
    setupWizardColor(eyesColor, EYES_COLOR, wizardEyes);
  });

  wizardCoat.addEventListener(`click`, function () {
    setupWizardColor(coatColor, COAT_COLOR, wizardCoat);
  });

  setupFireball.addEventListener(`click`, function () {
    setupWizardColor(fireBallColor, FIRE_BALL_COLOR, setupFireball);
  });

};

const closePopup = function () {
  setup.classList.add(`hidden`);

  document.removeEventListener(`keydown`, onPopupEscPress);
};

setupOpen.addEventListener(`click`, function () {
  openPopup();
});

setupOpen.addEventListener(`keydown`, function (evt) {
  if (evt.ket === `Enter`) {
    openPopup();
  }
});

setupClose.addEventListener(`click`, function () {
  closePopup();
});

setupClose.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    closePopup();
  }
});

setupUserName.addEventListener(`input`, function () {
  const valueLength = setupUserName.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    setupUserName.setCustomValidity(`Еще ` + (MIN_NAME_LENGTH - valueLength) + ` cимв`
    );
  } else if (valueLength > MAX_NAME_LENGTH) {
    setupUserName.setCustomValidity(`Удалите лишние ` + (valueLength - MAX_NAME_LENGTH) + `симв`);
  } else {
    setupUserName.setCustomValidity(``);
  }

  setupUserName.reportValidity();
});

const wizardForm = document.querySelector(`.setup-wizard-form`);
const SetUpWizard = wizardForm.querySelector(`.setup-wizard`);
const coatColor = wizardForm.querySelector(`input[name="coat-color"]`);
const eyesColor = wizardForm.querySelector(`input[name="eyes-color"]`);
const fireBallColor = wizardForm.querySelector(`input[name="fireball-color"]`);
const wizardCoat = SetUpWizard.querySelector(`.wizard-coat`);
const wizardEyes = SetUpWizard.querySelector(`.wizard-eyes`);
const setupFireball = wizardForm.querySelector(`.setup-fireball-wrap`);
wizardCoat.style.cursor = 'pointer';
wizardEyes.style.cursor = 'pointer';
setupFireball.style.cursor = 'pointer';


let coatCounter = 0;

const setupWizardColor = function (input, array, element) {
  if (coatCounter === array.length) {
    coatCounter = 0;
  } else {
    coatCounter++;
  }
  input.value = array[coatCounter];
  if (element === setupFireball) {
    element.style.background = input.value;
  } else {
    element.style.fill = input.value;
  }
};
