import { useEffect, useState } from "react";

const Cell = ({
  position,
  handleCellClick,
  coord,
  board,
  plusModel,
  nullModel,
  toggleTheme,
  modelEmpty,
}) => {
  const [model, setModel] = useState(modelEmpty);

  useEffect(() => {
    switch (board[coord]) {
      case "O":
        setModel(nullModel.scene.clone(true));
        break;
      case "X":
        setModel(plusModel.scene.clone(true));
        break;
      case "":
        setModel(modelEmpty);
        break;
    }
  }, [board, toggleTheme]);

  return (
    <primitive
      object={model}
      position={position}
      children-0-castShadow
      onClick={handleCellClick}
      coord={coord}
    />
  );
};
export default Cell;
