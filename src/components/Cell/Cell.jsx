import { useEffect, useState } from "react";

const Cell = ({
  position,
  handleCellClick,
  coord,
  board,
  plusModel,
  nullModel,
  emptyModel,
}) => {
  const [model, setModel] = useState(emptyModel.scene.clone(true));
  useEffect(() => {
    switch (board[coord]) {
      case "O":
        setModel(nullModel.scene.clone(true));
        break;
      case "X":
        setModel(plusModel.scene.clone(true));
        break;
    }
  }, [board]);

  return (
    <primitive
      object={model}
      position={position}
      //rotation-y={-Math.PI / 4}
      //rotation-z={-Math.PI / 4}
      children-0-castShadow
      onClick={handleCellClick}
      coord={coord}
    />
  );
};
export default Cell;
