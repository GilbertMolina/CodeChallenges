/*
Correct Path
  Have the function CorrectPath(str) read the str parameter being passed, which will represent the movements made in a 5x5 
  grid of cells starting from the top left position. The characters in the input string will be entirely composed of: r, l, u, d, ?. 
  Each of the characters stand for the direction to take within the grid, for example: r = right, l = left, u = up, d = down. 
  Your goal is to determine what characters the question marks should be in order for a path to be created to go from the top left 
  of the grid all the way to the bottom right without touching previously travelled on cells in the grid. 
  For example: if str is "r?d?drdd" then your program should output the final correct string that will allow a path to be formed 
  from the top left of a 5x5 grid to the bottom right. For this input, your program should therefore return the string rrdrdrdd. 
  There will only ever be one correct path and there will always be at least one question mark within the input string. 
Resolution:
*/

function CorrectPath(str) {
  const rows = 5;
  const columns = 5;

  return FoundMovements(str, rows, columns);
}

const FoundMovements = (movements, rows, columns) => {
  const allowedMovements = "drul".split("");
  let possibleMovements = GenerateCombinations(movements, allowedMovements);
  let currentGrid = [];
  let currentNode = {};

  for (let i = 0; possibleMovements.length; i++) {
    currentGrid = CreateGrid(rows, columns);

    for (let j = 0; possibleMovements[i].length; j++) {
      currentNode = MovementValidation(currentGrid, possibleMovements[i][j]);

      currentGrid = [...currentNode.Grid];

      if (!currentNode.IsValidMovement) {
        break;
      }

      if (currentNode.IsGoalNode && j === possibleMovements[i].length - 1) {
        return possibleMovements[i];
      }
    }
  }
};

const GenerateCombinations = (movements, allowedMovements) => {
  if (movements.indexOf("?") === -1) {
    return movements;
  } else {
    let combinations = [movements];

    for (let i = 0; i != -1; i = GetNextElementWithQuotationMark(combinations)) {
      // Gets the current word of the array
      let currentWord = combinations[i];

      // Deletes the current word of the array
      combinations.splice(0, 1);

      // Gets the position of the quotation mark in the current word
      let firstOccurrenceQuestionMark = currentWord.indexOf("?");

      // Iterates over the allowed movements to push each word in the combinations array
      allowedMovements.forEach((am) => {
        combinations.push(`${currentWord.substring(0, firstOccurrenceQuestionMark)}${am}${currentWord.substring(firstOccurrenceQuestionMark + 1, currentWord.length)}`);
      });
    }

    return combinations;
  }
};

const GetNextElementWithQuotationMark = (array) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].indexOf("?") > -1) {
      return i;
    }
  }

  return -1;
};

const CreateGrid = (rowsCount, columnsCount) => {
  let grid = [];

  for (let i = 0; i < rowsCount; i++) {
    grid[i] = [columnsCount];

    for (let j = 0; j < columnsCount; j++) {
      grid[i][j] = {
        HasBeenVisited: i === 0 && j === 0,
        IsCurrentNode: i === 0 && j === 0,
        IsGoalNode: i === rowsCount - 1 && j === columnsCount - 1
      };
    }
  }

  return grid;
};

const MovementValidation = (currentGrid, movement) => {
  let rowsCount = currentGrid.length;
  let columnsCount = currentGrid[0].length;
  let [currentRow, currentColumn] = WhichIsMyCurrentNode(currentGrid);

  switch (movement) {
    case "d":
      if (currentRow + 1 === rowsCount || currentGrid[currentRow + 1][currentColumn].HasBeenVisited) {
        return {
          Grid: currentGrid,
          IsGoalNode: false,
          IsValidMovement: false
        };
      } else {
        return {
          Grid: SetNextNode(currentGrid, currentRow, currentColumn, currentRow + 1, currentColumn),
          IsGoalNode: IsGoalNode(currentGrid, currentRow + 1, currentColumn),
          IsValidMovement: true
        };
      }
    case "r":
      if (currentColumn + 1 === columnsCount || currentGrid[currentRow][currentColumn + 1].HasBeenVisited) {
        return {
          Grid: currentGrid,
          IsGoalNode: false,
          IsValidMovement: false
        };
      } else {
        return {
          Grid: SetNextNode(currentGrid, currentRow, currentColumn, currentRow, currentColumn + 1),
          IsGoalNode: IsGoalNode(currentGrid, currentRow, currentColumn + 1),
          IsValidMovement: true
        };
      }
    case "u":
      if (currentRow - 1 === -1 || currentGrid[currentRow - 1][currentColumn].HasBeenVisited) {
        return {
          Grid: currentGrid,
          IsGoalNode: false,
          IsValidMovement: false
        };
      } else {
        return {
          Grid: SetNextNode(currentGrid, currentRow, currentColumn, currentRow - 1, currentColumn),
          IsGoalNode: IsGoalNode(currentGrid, currentRow - 1, currentColumn),
          IsValidMovement: true
        };
      }
    case "l":
      if (currentColumn - 1 === -1 || currentGrid[currentRow][currentColumn - 1].HasBeenVisited) {
        return {
          Grid: currentGrid,
          IsGoalNode: false,
          IsValidMovement: false
        };
      } else {
        return {
          Grid: SetNextNode(currentGrid, currentRow, currentColumn, currentRow, currentColumn - 1),
          IsGoalNode: IsGoalNode(currentGrid, currentRow, currentColumn - 1),
          IsValidMovement: true
        };
      }
  }
};

const WhichIsMyCurrentNode = (grid) => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j].IsCurrentNode) {
        return [i, j];
      }
    }
  }
};

const IsGoalNode = (grid, row, column) => {
  return grid[row][column].IsGoalNode;
};

const SetNextNode = (grid, currentRow, currentColumn, nextRow, nextColumn) => {
  grid[currentRow][currentColumn].IsCurrentNode = false;
  grid[currentRow][currentColumn].HasBeenVisited = true;
  grid[nextRow][nextColumn].IsCurrentNode = true;

  return grid;
};

console.log(CorrectPath("rd?u??dld?ddrr"));
