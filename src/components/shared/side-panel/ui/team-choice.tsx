"use client";

import ArrowIcon from "@/public/icons/arrow";
import styles from "../index.module.scss";
import { useState } from "react";
import { ITeam, IProject, ISpace } from "../../../../types/connections/connections.type";
import type { Dispatch, SetStateAction } from "react";

const colors = ["#3b82f6", "#22c55e", "#f97316", "#ec4899", "#ef4444", "#06b6d4"];

interface ITeamChoiceProps {
  currentUserId: string;
  teams: ITeam[];
  setTeams: Dispatch<SetStateAction<ITeam[]>>;
  projects: IProject[];
  setProjects: Dispatch<SetStateAction<IProject[]>>;
  spaces: ISpace[];
  setSpaces: Dispatch<SetStateAction<ISpace[]>>;
  activeTeamId: string;
  setActiveTeamId: (teamId: string) => void;
  setActiveProjectId: (projectId: string | null) => void;
  setActiveSpaceId: (spaceId: string | null) => void;
}

const TeamChoice = ({
  currentUserId,
  teams,
  setTeams,
  projects,
  setProjects,
  spaces,
  setSpaces,
  activeTeamId,
  setActiveTeamId,
  setActiveProjectId,
  setActiveSpaceId,
}: ITeamChoiceProps) => {
  const userTeams = teams.filter((team) => team.memberIds.includes(currentUserId));

  const [isOpen, setIsOpen] = useState(false);
  const [addingTeam, setAddingTeam] = useState(false);
  const [isSelectedColor, setIsSelectedColor] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [teamName, setTeamName] = useState("");

  const selectedTeam = userTeams.find((team) => team._id === activeTeamId);

  const handleTeamChoice = () => {
    setIsOpen((prev) => !prev);
  };

  const handleAddingTeam = () => {
    setAddingTeam((prev) => !prev);
    setIsSelectedColor(false);
  };

  const handleSelectedColor = () => {
    setIsSelectedColor((prev) => !prev);
  };

  const handleSetSelectedColor = (color: string) => {
    setSelectedColor(color);
    setIsSelectedColor(false);
  };

  const handleTeamName = (value: string) => {
    setTeamName(value);
  };

  const handleSelectedTeam = (teamId: string) => {
    const selectedTeam = teams.find((team) => team._id === teamId);
    if (!selectedTeam) return;

    const firstProject = projects.find((project) => project.teamId === teamId);

    setActiveTeamId(teamId);
    setActiveProjectId(firstProject?._id ?? null);
    setActiveSpaceId(null);
    setIsOpen(false);
  };

  const handleAddTeam = () => {
    if (!teamName.trim()) return;

    const newTeam: ITeam = {
      _id: crypto.randomUUID(),
      name: teamName.trim(),
      color: selectedColor,
      ownerId: currentUserId,
      memberIds: [currentUserId],
      createdAt: new Date().toISOString(),
    };

    const newProject: IProject = {
      _id: crypto.randomUUID(),
      name: `${newTeam.name} Project`,
      description: "",
      ownerId: currentUserId,
      memberIds: [currentUserId],
      teamId: newTeam._id,
      createdAt: new Date().toISOString(),
    };

    const newSpace: ISpace = {
      _id: crypto.randomUUID(),
      name: "Основная",
      color: colors[0],
      projectId: newProject._id,
      createdAt: new Date().toISOString(),
    };

    setTeams((prev) => [...prev, newTeam]);
    setProjects((prev) => [...prev, newProject]);
    setSpaces((prev) => [...prev, newSpace]);
    setActiveTeamId(newTeam._id);
    setActiveProjectId(newProject._id);
    setActiveSpaceId(newSpace._id);
    setTeamName("");
    setSelectedColor(colors[0]);
    setAddingTeam(false);
    setIsSelectedColor(false);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col relative">
      <button
        className={`${styles["side-panel__team-choice"]} flex justify-between items-center rounded-xl cursor-pointer transition-colors`}
        onClick={handleTeamChoice}
      >
        <div className="flex gap-2 items-center">
          <div
            className="w-[32px] h-[32px] rounded flex items-center justify-center text-white uppercase font-bold"
            style={{ backgroundColor: selectedTeam?.color }}
          >
            {selectedTeam?.name[0]}
          </div>
          <span>{selectedTeam?.name}</span>
        </div>
        <div className={`${isOpen ? "rotate-0" : "rotate-180"} transition-transform`}>
          <ArrowIcon />
        </div>
      </button>

      {isOpen && (
        <div
          className={`${styles["side-panel__select"]} w-full pt-2 pb-2 flex flex-col rounded-xl pl-2 gap-1 absolute top-full mt-2 backdrop-blur-2xl`}
        >
          {userTeams.map((team) => (
            <button
              key={team._id}
              className={`${styles["side-panel__select__team-button"]} flex gap-2 items-center cursor-pointer transition-colors`}
              onClick={() => handleSelectedTeam(team._id)}
            >
              <div
                className="w-[32px] h-[32px] rounded flex items-center justify-center text-white uppercase font-bold"
                style={{ backgroundColor: team.color }}
              >
                {team.name[0]}
              </div>
              <span className="transition-colors">{team.name}</span>
            </button>
          ))}

          {addingTeam && (
            <div className="flex w-full justify-between relative">
              <input
                type="text"
                placeholder="Название..."
                className="w-full"
                value={teamName}
                onChange={(e) => handleTeamName(e.target.value)}
              />
              <button
                className="cursor-pointer"
                onClick={handleSelectedColor}
                title="Выбрать декоративный цвет"
              >
                <div
                  className="w-[30px] h-[30px] rounded-lg"
                  style={{ backgroundColor: selectedColor }}
                />
              </button>
              {isSelectedColor && (
                <div className="absolute top-full mt-1 w-full bg-[#dedaf5b7] backdrop-blur-2xl rounded-lg p-2 flex flex-wrap gap-1">
                  {colors.map((color) => (
                    <button
                      key={color}
                      className="cursor-pointer"
                      onClick={() => handleSetSelectedColor(color)}
                    >
                      <div
                        className="w-[30px] h-[30px] rounded-lg"
                        style={{ backgroundColor: color }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="w-full flex gap-1">
            {addingTeam && (
              <button
                className={`${styles["side-panel__select__confirm"]} rounded-lg cursor-pointer transition-colors w-full`}
                onClick={handleAddTeam}
              >
                Добавить
              </button>
            )}
            <button
              className={`${styles["side-panel__select__add-team"]} ${addingTeam ? "bg-red-500" : ""} rounded-lg cursor-pointer transition-colors w-full`}
              onClick={handleAddingTeam}
            >
              {!addingTeam ? "Добавить команду" : "Отмена"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamChoice;