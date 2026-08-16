"use client";

import ArrowIcon from "@/public/icons/arrow"

import styles from "../index.module.scss";

import { useId, useState } from "react";

interface ITeam {
    _id: string;
    teamName: string;
    bgColor: string;
}

const colors = ["#3b82f6", "#22c55e", "#f97316", "#ec4899", "#ef4444", "#06b6d4"];


const TeamChoice = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [addingTeam, setAddingTeam] = useState(false);
    const [isSelectedColor, setIsSelectedColor] = useState(false);
    const [selectedColor, setSelectedColor] = useState(colors[0]);
    const [teamName, setTeamName] = useState("");

    const [teams, setTeams] = useState<ITeam[]>([
        {
            _id: "1",
            teamName: "marketing team",
            bgColor: colors[0],
        },
        {
            _id: "2",
            teamName: "developers",
            bgColor: colors[1],
        },
        {
            _id: "3",
            teamName: "business analytics",
            bgColor: colors[2],
        },
    ]);

    const [selectedTeamIndex, setSelectedTeamIndex] = useState(0);

    const uniqueKeyTeam = useId();

    const uniqueKeyColor = useId();

    const handleTeamChoice = () => {
        setIsOpen(prev => !prev);
    }

    const handleAddingTeam = () => {
        setAddingTeam(prev => !prev);
    }

    const handleSelectedColor = () => {
        setIsSelectedColor(prev => !prev);
    }

    const handleSetSelectedColor = (index: number) => {
        setSelectedColor(colors[index]);
        handleSelectedColor();
    }

    const handleTeamName = (value: string) => {
        setTeamName(value);
    }

    const handleAddTeam = () => {
        if (teamName.trim()) {
            setTeams(prev => {
                const id =  (+prev[prev.length - 1]._id + 1).toString();
    
                return [...prev, { _id: id, teamName, bgColor: selectedColor }]
            });
    
            console.log(teams);
            setTeamName("");
        }
    }

    const handleSelectedTeamIndex = (index: number) => {
        setSelectedTeamIndex(index);
        handleTeamChoice();
    }

    return (
        <div className="flex flex-col relative">
            <button className={`${styles["side-panel__team-choice"]} flex justify-between items-center rounded-xl cursor-pointer transition-colors`} onClick={handleTeamChoice}>
                <div className="flex gap-2 items-center">
                    <div className="w-[32px] h-[32px] rounded flex items-center justify-center text-white uppercase font-bold" style={{ backgroundColor: `${teams[selectedTeamIndex].bgColor}` }}>{teams[selectedTeamIndex].teamName[0]}</div>
                    <span>{teams[selectedTeamIndex].teamName}</span>
                </div>
                <div className={`${isOpen ? "rotate-0" : "rotate-180"} transition-transform`}>
                    <ArrowIcon />
                </div>
            </button>

            {isOpen && <div className={`${styles["side-panel__select"]} w-full pt-2 pb-2 flex flex-col rounded-xl pl-2 gap-1 absolute top-full mt-2`}>
                {teams.map((team, index) => {
                    return (
                        <button key={`${uniqueKeyTeam}-${index}-${crypto.randomUUID()}-${team._id}`} className={`${styles["side-panel__select__team-button"]} flex gap-2 items-center cursor-pointer transition-colors`} onClick={() => handleSelectedTeamIndex(index)}>
                            <div className="w-[32px] h-[32px] rounded flex items-center justify-center text-white uppercase font-bold" style={{ backgroundColor: `${team.bgColor}` }}>{team.teamName[0]}</div>
                            <span className="transition-colors">{team.teamName}</span>
                        </button>
                    )
                })}

                {addingTeam && <div className="flex w-full justify-between relative">
                    <input type="text" placeholder="Название..." className="w-full" value={teamName} onChange={(e) => handleTeamName(e.target.value)} />
                    <button className="cursor-pointer" onClick={handleSelectedColor} title="Выбрать декоративный цвет">
                        <div className={`w-[30px] h-[30px] rounded-lg`} style={{ backgroundColor: `${selectedColor}` }}></div>
                    </button>

                    {isSelectedColor && <div className="absolute top-full mt-2 w-full bg-[#dedaf5b7] backdrop-blur-2xl rounded-lg p-2 flex flex-wrap gap-1">
                        {colors.map((color, index) => {
                            return (
                                <button key={`${uniqueKeyColor}-${index}-${crypto.randomUUID()}`} className="cursor-pointer" onClick={() => handleSetSelectedColor(index)}>
                                    <div className={`w-[30px] h-[30px] rounded-lg`} style={{ backgroundColor: `${color}` }}></div>
                                </button>
                            )
                        })}
                    </div>}
                </div>}

                <div className="w-full flex gap-1">
                    {addingTeam && <button className={`${styles["side-panel__select__confirm"]} rounded-lg cursor-pointer transition-colors w-full`} onClick={handleAddTeam}>Добавить</button>}
                    <button className={`${styles["side-panel__select__add-team"]} ${addingTeam ? "bg-red-500" : ""} rounded-lg cursor-pointer transition-colors w-full`} onClick={handleAddingTeam}>{!addingTeam ? "Добавить команду" : "Отмена"}</button>
                </div>

            </div>}
        </div>
    )
}

export default TeamChoice;