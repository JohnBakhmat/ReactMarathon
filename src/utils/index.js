export const returnBoard = (board) => {
  return board.map((item, index) => {
    let card = null;
    if (typeof item === 'object') {
      card = {
        ...item.poke,
        possession: item.holder === 'p1' ? 'blue' : 'red',
      };
    }

    return {
      position: index + 1,
      card,
    };
  });
};
