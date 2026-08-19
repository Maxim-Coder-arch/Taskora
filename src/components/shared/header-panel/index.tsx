"use client";

import ArrowIcon from "@/public/icons/arrow";
import SettingsIcon from "@/public/icons/settings";
import AccountIcon from "@/public/icons/account";
import DataIcon from "@/public/icons/data";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import styles from "./index.module.scss";
import { users, ITeam, ISpace, IProject } from "../../../types/connections/connections.type";
import DashboardTabs from "../dashboard-tabs";

interface IHeaderPanelProps {
  currentUserId: string;
  projects: IProject[];
  teams: ITeam[];
  spaces: ISpace[];
  activeProjectId: string | null;
  activeTeamId: string | null;
  activeSpaceId: string | null;
  setActiveProjectId: Dispatch<SetStateAction<string | null>>;
  setActiveTeamId: Dispatch<SetStateAction<string | null>>;
  setActiveSpaceId: Dispatch<SetStateAction<string | null>>;
}

const HeaderPanel = ({
  currentUserId,
  projects,
  teams,
  spaces,
  activeProjectId,
  activeTeamId,
  activeSpaceId,
  setActiveProjectId,
  setActiveTeamId,
  setActiveSpaceId,
}: IHeaderPanelProps) => {
  const [openedProfilePoints, setOpenedProfilePoints] = useState(false);
  const [chooseProject, setChooseProject] = useState(false);
  const [showProjectDetails, setShowProjectDetails] = useState(false);

  const activeUser = users.find((user) => user._id === currentUserId);
  const activeProject = projects.find((project) => project._id === activeProjectId);
  const activeTeam = teams.find((team) => team._id === activeTeamId);
  const activeSpace = spaces.find((space) => space._id === activeSpaceId);
  const projectUsers = users.filter((user) => activeProject?.memberIds.includes(user._id));


  const handleChooseProject = (projectId: string) => {
    const selectedProject = projects.find((project) => project._id === projectId);
    if (!selectedProject) return;

    setActiveProjectId(selectedProject._id);

    const projectTeams = teams.filter((team) => team.projectId === selectedProject._id);
    const firstTeam = projectTeams[0];

    if (!firstTeam) {
      setActiveTeamId(null);
      setActiveSpaceId(null);
      setChooseProject(false);
      return;
    }

    setActiveTeamId(firstTeam._id);

    const firstTeamSpace = spaces.find((space) => space.teamId === firstTeam._id);
    setActiveSpaceId(firstTeamSpace?._id ?? null);
    setChooseProject(false);
  };

  const handleToggleProfile = () => {
    setOpenedProfilePoints((prev) => !prev);
  };

  const handleToggleProjectChoice = () => {
    setChooseProject((prev) => !prev);
  };

  return (
    <div className="flex flex-col w-full">
      <div className={`${styles["header-panel"]} flex items-center justify-between p-3`}>
        <div className={`${styles["header-panel__active-project"]} flex gap-6 relative`}>
          <button
            type="button"
            className="flex gap-3 items-center cursor-pointer rounded-lg transition-colors justify-between"
            onClick={handleToggleProjectChoice}
          >
            <span>{activeProject?.name ?? "Нет проекта"}</span>
            <div
              className={`${chooseProject ? "rotate-0" : "rotate-180"} transition-transform`}
            >
              <ArrowIcon />
            </div>
          </button>

          <button className={`${styles["header-panel__add-new-project"]} flex gap-2 justify-between rounded-lg cursor-pointer transition-colors`}>
            <span>Новый проект</span>
            <div className={"rotate-180"}>
              <ArrowIcon />
            </div>
          </button>

          <div className={`${styles["header-panel__active"]} flex items-center gap-2`}>
            <span className="text-[#c4b5fd]">{activeTeam?.name ?? "Нет команды"}</span>
            <div className="w-[6px] h-[6px] bg-[#7c5cff] rounded-full" />
            <span className="text-[#7c5cff]">{activeSpace?.name ?? "Нет доски"}</span>
          </div>

          {chooseProject && (
            <div
              className={`${styles["header-panel__active-project__choose-project"]} absolute top-full mt-1 flex flex-col bg-[#f7f7fa] rounded-lg p-3 gap-2`}
            >
              {projects.map((project) => (
                <button
                  key={project._id}
                  type="button"
                  className="cursor-pointer transition-colors rounded-lg"
                  onClick={() => handleChooseProject(project._id)}
                >
                  {project.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={`${styles["header-panel__user-control"]} flex gap-4 items-center`}>
          <div className={`${styles["header-panel__user-control__settings"]} transition-transform`}>
            <SettingsIcon />
          </div>

          <div
            className={`${styles["header-panel__user"]} flex items-center gap-6 p-4 rounded-lg cursor-pointer transition-colors relative`}
            onClick={handleToggleProfile}
          >
            <div
              className={`${styles["header-panel__user__avatar"]} w-[32px] h-[32px] rounded-full flex items-center justify-center`}
              style={{ background: activeUser?.avatarColor }}
            >
              <span>{activeUser?.name?.[0]}</span>
            </div>

            <div className={`${styles["header-panel__user__user-data"]} flex flex-col`}>
              <h3>{activeUser?.name}</h3>
              <h4>{activeUser?.email}</h4>
            </div>

            <button
              type="button"
              className={`${openedProfilePoints ? "rotate-0" : "rotate-180"} transition-transform`}
            >
              <ArrowIcon />
            </button>

            {openedProfilePoints && (
              <div
                className={`${styles["header-panel__user-control__profile-points"]} absolute top-full mt-1 w-full left-0 bg-[#f7f7fa] rounded-lg flex flex-col p-3 gap-2`}
              >
                <Link
                  href="/"
                  className="flex justify-between w-full p-2 rounded-lg transition-colors"
                >
                  <span>Аккаунт</span>
                  <AccountIcon />
                </Link>
                <Link
                  href="/"
                  className="flex justify-between w-full p-2 rounded-lg transition-colors"
                >
                  <span>Данные</span>
                  <DataIcon />
                </Link>
                <button type="button" className="rounded-lg cursor-pointer transition-colors">
                  Выйти
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <DashboardTabs setShowProjectDetails={setShowProjectDetails} showProjectDetails={showProjectDetails} />

      {showProjectDetails && <div className={`${styles["project-info"]} w-full p-3 flex justify-between items-center bg-[#eff6ff]`}>
        <div className={`${styles["project-info__title"]}`}>
          <h2>{activeProject?.name ?? "Нет проекта"}</h2>
          <p>{activeProject?.description ?? ""}</p>
        </div>

        <div className={`${styles["project-info__users"]} flex gap-1`}>
            {projectUsers.slice(0, 4).map((user) => (
                <div
                    key={user._id}
                    className="w-[36px] h-[36px] rounded-full flex items-center justify-center"
                    style={{ backgroundColor: user.avatarColor }}
                >
                    <span className="text-white font-bold">
                        {user.name[0]}
                    </span>
                </div>
            ))}

            {projectUsers.length > 4 && (
                <div className="w-[36px] h-[36px] rounded-full flex items-center justify-center bg-[#93c5fd]">
                    <span className="text-[#1d4ed8] font-bold">
                        +{projectUsers.length - 4}
                    </span>
                </div>
            )}
        </div>
      </div>}
    </div>
  );
};

export default HeaderPanel;