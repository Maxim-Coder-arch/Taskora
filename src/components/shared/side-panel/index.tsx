"use client";

import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

import styles from "./index.module.scss";
import TeamChoice from "./ui/team-choice";
import Spaces from "./ui/spaces";

import HomeIcon from "@/public/icons/home";
import TasksIcon from "@/public/icons/tasks";
import ProjectIcon from "@/public/icons/project";
import StatsIcon from "@/public/icons/stats";

import type { ITeam, IProject, ISpace } from "@/src/types/connections/connections.type";

const pages = [
  { _id: "1", label: "Главная", page: "/dashboard", icon: <HomeIcon /> },
  { _id: "2", label: "Мои задачи", page: "/todos", icon: <TasksIcon /> },
  { _id: "3", label: "Компания/проект", page: "/project", icon: <ProjectIcon /> },
  { _id: "4", label: "Статистика", page: "/stats", icon: <StatsIcon /> },
];

const tasksCount = 3;

interface ISidePanelProps {
  currentUserId: string;
  teams: ITeam[];
  setTeams: Dispatch<SetStateAction<ITeam[]>>;
  projects: IProject[];
  setProjects: Dispatch<SetStateAction<IProject[]>>;
  spaces: ISpace[];
  setSpaces: Dispatch<SetStateAction<ISpace[]>>;
  activeTeamId: string;
  setActiveTeamId: (teamId: string) => void;
  activeProjectId: string | null;
  setActiveProjectId: (projectId: string | null) => void;
  activeSpaceId: string | null;
  setActiveSpaceId: (spaceId: string | null) => void;
}

const SidePanel = ({
  currentUserId,
  teams,
  setTeams,
  projects,
  setProjects,
  spaces,
  setSpaces,
  activeTeamId,
  setActiveTeamId,
  activeProjectId,
  setActiveProjectId,
  activeSpaceId,
  setActiveSpaceId,
}: ISidePanelProps) => {
  return (
    <nav className={`${styles["side-panel"]} p-3 flex flex-col`}>
      <div className="flex flex-col gap-6">
        <div className={`${styles["side-panel__logo"]} flex gap-3 items-center`}>
          <Image src="/logotypes/taskora.png" width={50} height={50} alt="[logotype]" />
          <span>Taskora</span>
        </div>

        <TeamChoice
          currentUserId={currentUserId}
          teams={teams}
          setTeams={setTeams}
          projects={projects}
          setProjects={setProjects}
          spaces={spaces}
          setSpaces={setSpaces}
          activeTeamId={activeTeamId}
          setActiveTeamId={setActiveTeamId}
          setActiveProjectId={setActiveProjectId}
          setActiveSpaceId={setActiveSpaceId}
        />

        <div className={`${styles["side-panel__pages"]} flex flex-col gap-2`}>
          {pages.map((page) => (
            <Link
              key={page._id}
              href={page.page}
              className="flex w-full items-center justify-between rounded-xl transition-colors"
            >
              <div className="flex gap-3 items-center">
                {page.icon}
                <span>{page.label}</span>
              </div>
              {page._id === "2" && (
                <div className="bg-[#dbeafe] w-[30px] h-[30px] flex items-center justify-center rounded-lg font-bold text-[#3b82f6]">
                  {tasksCount}
                </div>
              )}
            </Link>
          ))}
        </div>

        <Spaces
          spaces={spaces}
          setSpaces={setSpaces}
          activeProjectId={activeProjectId}
          activeSpaceId={activeSpaceId}
          setActiveSpaceId={setActiveSpaceId}
        />
      </div>
    </nav>
  );
};

export default SidePanel;