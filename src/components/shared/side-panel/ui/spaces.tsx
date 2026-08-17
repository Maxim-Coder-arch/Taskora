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
  activeProjectId: string | null;
  activeSpaceId: string | null;
  setActiveSpaceId: (spaceId: string | null) => void;
}

const Spaces = ({
  spaces,
  setSpaces,
  activeProjectId,
  activeSpaceId,
  setActiveSpaceId,
}: ISpacesProps) => {
  const projectSpaces = spaces.filter((space) => space.projectId === activeProjectId);

  const [addingSpace, setAddingSpace] = useState(false);
  const [spaceName, setSpaceName] = useState("");
  const [activeColor, setActiveColor] = useState(circleColors[0]);
  const [isSelectedColor, setIsSelectedColor] = useState(false);

  const handleChoiceSpace = (id: string) => {
    setActiveSpaceId(id);
  };

  const handleAddingSpace = () => {
    setAddingSpace((prev) => !prev);
    setIsSelectedColor(false);
  };

  const handleSpaceName = (value: string) => {
    setSpaceName(value);
  };

  const handleSetSelectedColor = () => {
    setIsSelectedColor((prev) => !prev);
  };

  const handleSetActiveColor = (color: string) => {
    setActiveColor(color);
    setIsSelectedColor(false);
  };

  const handleAddSpace = () => {
    if (!spaceName.trim()) return;
    if (!activeProjectId) return;

    const newSpace: ISpace = {
      _id: crypto.randomUUID(),
      name: spaceName.trim(),
      color: activeColor,
      projectId: activeProjectId,
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
          className="cursor-pointer transition-colors rounded-lg"
          onClick={handleAddingSpace}
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
              onChange={(e) => handleSpaceName(e.target.value)}
            />
            <button
              className="cursor-pointer"
              title="Выбрать декоративный цвет"
              onClick={handleSetSelectedColor}
            >
              <div
                className="w-[22px] h-[22px] rounded-full"
                style={{ backgroundColor: activeColor }}
              />
            </button>
          </div>

          <button
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
                  className="w-[16px] h-[16px] cursor-pointer rounded-full"
                  style={{ backgroundColor: color }}
                  onClick={() => handleSetActiveColor(color)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <div className={`${styles["side-panel__spaces__list"]} flex flex-col gap-3`}>
        {projectSpaces.map((space) => (
          <button
            key={space._id}
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
            onClick={() => handleChoiceSpace(space._id)}
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