const express = require('express');
const router = express.Router();
const fs = require('fs');

function getTargetAlloyFromFile(id) {
  try {
    const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    const alloyData = data.find(item => item._id.$oid === id);

    if (alloyData) {
      const { _id, 'Название элемента': _, 'Назначение': __, ...targetAlloy } = alloyData;
      return targetAlloy;
    } else {
      console.error(`Элемент с id ${id} не найден`);
      return null;
    }
  } catch (err) {
    console.error('Ошибка чтения файла data.json:', err);
    return null;
  }
}

const targetAlloyId = '6645ffa51d7b18f867e90756';
const targetAlloy = getTargetAlloyFromFile(targetAlloyId);

router.get('/check-elements', (req, res) => {
  const guess = req.query;
  const targetKeys = Object.keys(targetAlloy);

  const result = [];

  for (let i = 0; i < targetKeys.length; i++) {
    const guessKey = decodeURIComponent(guess["input_"+i]).split(':')[0];
    const guessValue = decodeURIComponent(guess["input_"+i]).split(':')[1];
  
    if (guessKey === targetKeys[i]) {

  
      const [start, end] = targetAlloy[guessKey].split(' - ').map(Number);
  
      if (start < guessValue && guessValue <= end) {
        result[i] = {
          'element': guessKey,
          'element_value': 1,
          'number': guessValue,
          'number_value': 1
        };
      }
      else if (guessValue > end) {
        result[i] = {
          'element': guessKey,
          'element_value': 1,
          'number': guessValue,
          'number_value': 2
        };
      }
      else if (guessValue <= start) {
        result[i] = {
          'element': guessKey,
          'element_value': 1,
          'number':guessValue,
          'number_value': 3
        };
      }
      else {
        result[i] = {
          'element': guessKey,
          'element_value': 1,
          'number': end.toString().replace(/[0-9]/g, '0'),
          'number_value': 0
        };
      }
    } else if (targetKeys.includes(guessKey)) {
      result[i] = {'element':guessKey,'element_value':2};

    } else{
      result[i] = {'element':guessKey,'element_value':3};
    }
  }

  res.json(result);
});

module.exports = router;