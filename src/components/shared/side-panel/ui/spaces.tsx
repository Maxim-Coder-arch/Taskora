"use client";

import PlusIcon from "@/public/icons/plus";
import MinusIcon from "@/public/icons/minus";
import styles from "../index.module.scss";
import { useState } from "react";
import { ISpace } from "../../../../types/connections/connections.type";
import type { Dispatch, SetStateAction } from "react";

const circleColors = [
  "#3b82f6",
  "#22c55e",
  "#f97316",
  "#ec4899",
  "#ef4444",
  "#06b6d4",
  "#f87171",
  "#dc2626",
  "#b91c1c",
];

interface ISpacesProps {
  spaces: ISpace[];
  setSpaces: Dispatch<SetStateAction<ISpace[]>>;
  activeTeamId: string | null;
  activeSpaceId: string | null;
  setActiveSpaceId: Dispatch<SetStateAction<string | null>>;
}

const Spaces = ({
  spaces,
  setSpaces,
  activeTeamId,
  activeSpaceId,
  setActiveSpaceId,
}: ISpacesProps) => {
  const teamSpaces = spaces.filter((space) => space.teamId === activeTeamId);

  const [addingSpace, setAddingSpace] = useState(false);
  const [spaceName, setSpaceName] = useState("");
  const [activeColor, setActiveColor] = useState(circleColors[0]);
  const [isSelectedColor, setIsSelectedColor] = useState(false);

  const handleAddSpace = () => {
    const trimmedName = spaceName.trim();
    if (!trimmedName) return;
    if (!activeTeamId) return;

    const newSpace: ISpace = {
      _id: crypto.randomUUID(),
      name: trimmedName,
      color: activeColor,
      teamId: activeTeamId,
      createdAt: new Date().toISOString(),
    };

    setSpaces((prev) => [...prev, newSpace]);
    setActiveSpaceId(newSpace._id);
    setSpaceName("");
    setActiveColor(circleColors[0]);
    setAddingSpace(false);
    setIsSelectedColor(false);
  };

  return (
    <div className={`${styles["side-panel__spaces"]} flex flex-col gap-4`}>
      <div
        className={`${styles["side-panel__spaces__header"]} w-full flex justify-between items-center`}
      >
        <span>Доски</span>
        <button
          type="button"
          className="cursor-pointer transition-colors rounded-lg"
          onClick={() => {
            setAddingSpace((prev) => !prev);
            setIsSelectedColor(false);
          }}
        >
          {addingSpace ? <MinusIcon /> : <PlusIcon />}
        </button>
      </div>

      {addingSpace && (
        <div
          className={`${styles["side-panel__spaces__add-space"]} flex flex-col w-full justify-between gap-3 relative`}
        >
          <div className="flex w-full justify-between">
            <input
              type="text"
              placeholder="Новая доска..."
              className="w-full"
              value={spaceName}
              onChange={(event) => setSpaceName(event.target.value)}
            />
            <button
              type="button"
              className="cursor-pointer"
              onClick={() => setIsSelectedColor((prev) => !prev)}
            >
              <div
                className="w-[22px] h-[22px] rounded-full"
                style={{ backgroundColor: activeColor }}
              />
            </button>
          </div>

          <button
            type="button"
            className={`${styles["side-panel__spaces__add-space__button"]} rounded-lg cursor-pointer transition-colors w-full`}
            onClick={handleAddSpace}
          >
            Добавить
          </button>

          {isSelectedColor && (
            <div
              className={`${styles["side-panel__spaces__add-space__form"]} absolute top-full mt-1 w-full flex flex-wrap gap-2 rounded-lg p-2`}
            >
              {circleColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className="w-[16px] h-[16px] cursor-pointer rounded-full"
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    setActiveColor(color);
                    setIsSelectedColor(false);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <div className={`${styles["side-panel__spaces__list"]} flex flex-col gap-3`}>
        {teamSpaces.map((space) => (
          <button
            key={space._id}
            type="button"
            className={`
              w-full
              flex
              justify-start
              gap-4
              items-center
              cursor-pointer
              transition-colors
              rounded-lg
              ${activeSpaceId === space._id ? styles["side-panel__spaces__list__active"] : ""}
            `}
            onClick={() => setActiveSpaceId(space._id)}
          >
            <div
              className="w-[12px] h-[12px] rounded-full"
              style={{ backgroundColor: space.color }}
            />
            <span>{space.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Spaces;