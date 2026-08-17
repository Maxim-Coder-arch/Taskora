"use client";

import ArrowIcon from "@/public/icons/arrow";
import SettingsIcon from "@/public/icons/settings";
import AccountIcon from "@/public/icons/account";
import DataIcon from "@/public/icons/data";
import Link from "next/link";
import { useState } from "react";
import styles from "./index.module.scss";
import { users, ITeam, ISpace } from "../../../types/connections/connections.type";

interface IHeaderPanelProps {
  currentUserId: string;
  teams: ITeam[];
  spaces: ISpace[];
  activeTeamId: string;
  activeSpaceId: string | null;
}

const HeaderPanel = ({
  currentUserId,
  teams,
  spaces,
  activeTeamId,
  activeSpaceId,
}: IHeaderPanelProps) => {
  const [openedProfilePoints, setOpenedProfilePoints] = useState(false);

  const activeUser = users.find((user) => user._id === currentUserId);
  const activeTeam = teams.find((team) => team._id === activeTeamId);
  const activeSpace = spaces.find((space) => space._id === activeSpaceId);

  const handleSetOpenedProfilePoints = () => {
    setOpenedProfilePoints((prev) => !prev);
  };

  return (
    <div className={`${styles["header-panel"]} flex items-center justify-between p-3`}>
      <div className={`${styles["header-panel__active"]} flex items-center gap-2`}>
        <span className="text-[#c4b5fd]">{activeTeam?.name}</span>
        <div className="w-[6px] h-[6px] bg-[#7c5cff] rounded-full" />
        <span className="text-[#7c5cff]">{activeSpace?.name ?? "Нет доски"}</span>
      </div>

      <div className={`${styles["header-panel__user-control"]} flex gap-4 items-center`}>
        <div className={`${styles["header-panel__user-control__settings"]} transition-transform`}>
          <SettingsIcon />
        </div>

        <div
          className={`${styles["header-panel__user"]} flex items-center gap-6 p-4 rounded-lg cursor-pointer transition-colors relative`}
          onClick={handleSetOpenedProfilePoints}
        >
          <div
            className={`${styles["header-panel__user__avatar"]} w-[32px] h-[32px] rounded-full flex items-center justify-center`}
            style={{ background: activeUser?.avatarColor }}
          >
            <span>{activeUser?.name[0]}</span>
          </div>

          <div className={`${styles["header-panel__user__user-data"]} flex flex-col`}>
            <h3>{activeUser?.name}</h3>
            <h4>{activeUser?.email}</h4>
          </div>

          <button
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
              <button className="rounded-lg cursor-pointer transition-colors">Выйти</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderPanel;