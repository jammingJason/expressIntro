const express = require('express');
const app = express();
const ExpressError = require('./expressError');

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// *********************************************************************

app.get('/all', (req, res) => {
  return res.send('Home Page');
});
// *********************************************************************

function getMean() {
  return answer;
}

// *********************************************************************
app.get('/mean', (req, res, next) => {
  let nums = [];
  // debugger;
  if (req.query.nums) {
    nums = req.query.nums.split(',');
  }

  if (nums.length === 0) {
    throw new ExpressError('You must use valid numbers', 404);
  }
  try {
    // let nums = req.query.nums.split(',');
    let answer = 0;
    for (let i = 0; i < nums.length; i++) {
      if (parseInt(nums[i])) {
        answer = answer + parseInt(nums[i]);
        //   console.log(answer);
      } else {
        throw new ExpressError('You must use valid numbers', 500);
      }
    }
    answer = answer / nums.length;
    return res.status(403).json({ operation: 'mean', value: answer });
  } catch (e) {
    next(e);
  }
});
// *********************************************************************

app.get('/median', (req, res, next) => {
  // let nums = req.query.nums.split(',');
  let nums = [];
  // debugger;
  if (req.query.nums) {
    nums = req.query.nums.split(',');
  }

  if (nums.length === 0) {
    throw new ExpressError('You must use valid numbers', 404);
  }
  try {
    // console.log(nums.length % 2);
    if (nums.length % 2 != 0) {
      let itemNum = nums.length / 2;
      itemNum = Math.round(itemNum) - 1;
      return res
        .status(403)
        .json({ operation: 'median', value: nums[itemNum] });
    } else {
      let newNum = nums.length / 2;
      itemNum =
        (parseInt(nums[Math.round(newNum)]) +
          parseInt(nums[Math.round(newNum) - 1])) /
        2;
      return res.status(403).json({ operation: 'median', value: itemNum });
    }
  } catch (e) {
    next(e);
  }
});
// *********************************************************************

app.get('/mode', (req, res, next) => {
  let nums = [];

  if (req.query.nums) {
    nums = req.query.nums.split(',');
  }

  if (nums.length === 0) {
    throw new ExpressError('You must use valid numbers', 404);
  }

  try {
    let newDict = {};
    for (let x = 0; x < nums.length; x++) {
      newDict[nums[x]] = countNums(nums[x], nums);
    }

    return res
      .status(403)
      .json({ operation: 'mode', value: getHighestNumber(newDict) });
  } catch (e) {
    next(e);
    // next(new ExpressError('Big Mistake!!', 501));
  }
});
// *********************************************************************

function countNums(num, nums) {
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    if (num === nums[i]) {
      count++;
    }
  }
  return count;
}
// *********************************************************************

function getHighestNumber(newDict) {
  let newArray = [];
  let highestNum = 0;
  for (const key in newDict) {
    if (Object.hasOwnProperty.call(newDict, key)) {
      const element = newDict[key];
      if (element >= highestNum) {
        console.log(element + ' is the highest number');

        highestNum = element;
      }
      // console.log(element);
    }
  }
  for (const item in newDict) {
    if (Object.hasOwnProperty.call(newDict, item)) {
      const element = newDict[item];
      if (element === highestNum) {
        newArray.push(item);
      }
    }
  }
  return newArray;
}
// ********************************************************************

app.use((req, res) => {
  res.status(404).send('That page cannot be found.  Please try another page.');
});

app.use(function (err, req, res, next) {
  //Note the 4 parameters!
  // the default status is 500 Internal Server Error
  let status = err.status || 500;
  let message = err.msg || 'That is a big error!';
  // message = 'ERRROROOOORRRRR';
  // set the status and alert the user
  return res.status(status).json({
    error: { message, status },
  });
});
// *********************************************************************

app.listen(3000, () => {
  console.log('This is the server running on port 3000.  Enjoy!!');
});
