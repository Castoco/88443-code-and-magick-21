'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const GAP = 10;
const FONT_GAP = 15;
const TEXT_WIDTH = 50;
let barHeight = CLOUD_WIDTH - CLOUD_HEIGHT;
const BAR_WIDTH = 40;

let renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const getMaxElement = function (arr) {
  let maxElement = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(
    ctx,
    CLOUD_X + GAP,
    CLOUD_Y + GAP,
    'rgba(0, 0, 0, 0.7)'
  );
  renderCloud(
    ctx,
    CLOUD_X,
    CLOUD_Y,
    '#fff'
  );

  ctx.fillStyle = '#000';

  let maxTime = getMaxElement(times);

  const getRandomColor = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  for (let i = 0; i < players.length; i++) {
    ctx.fillText(
      players[i],
      CLOUD_X + TEXT_WIDTH + (TEXT_WIDTH + TEXT_WIDTH) * i,
      CLOUD_Y + (CLOUD_HEIGHT - (GAP + FONT_GAP))
    );

    ctx.fillStyle = `hsl(230, ${getRandomColor(0, 100)}%, 50%)`;

    if (players[i] === 'Вы') {
      ctx.fillStyle = 'hsl(0, 100%, 50%)';
    }

    ctx.fillRect(
      CLOUD_X + TEXT_WIDTH + (TEXT_WIDTH + TEXT_WIDTH) * i,
      CLOUD_Y + (CLOUD_HEIGHT - TEXT_WIDTH),
      BAR_WIDTH,
      ((barHeight * times[i]) / maxTime ) * -1
    );
    ctx.fillStyle = '#000';
    ctx.fillText(
      Math.round(times[i]),
      CLOUD_X + TEXT_WIDTH + (TEXT_WIDTH + TEXT_WIDTH) * i,
      CLOUD_Y + (CLOUD_HEIGHT - TEXT_WIDTH) - ((barHeight * times[i]) / maxTime ) - FONT_GAP
    );
  }

  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP + TEXT_WIDTH, CLOUD_Y + GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP + TEXT_WIDTH, CLOUD_Y + GAP + FONT_GAP);
};
