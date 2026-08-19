"use client";

import HeaderPanel from "@/src/components/shared/header-panel";
import SidePanel from "@/src/components/shared/side-panel";
import type { ReactNode } from "react";
import { useState } from "react";
import {
  teams as mockTeams,
  projects as mockProjects,
  spaces as mockSpaces,
} from "@/src/types/connections/connections.type";
import type { ITeam, IProject, ISpace } from "@/src/types/connections/connections.type";
import DashboardTabs from "@/src/components/shared/dashboard-tabs";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const currentUserId = "user_2";

  const [teams, setTeams] = useState<ITeam[]>(mockTeams);
  const [projects, setProjects] = useState<IProject[]>(mockProjects);
  const [spaces, setSpaces] = useState<ISpace[]>(mockSpaces);
  const [activeProjectId, setActiveProjectId] = useState<string | null>("project_1");
  const [activeTeamId, setActiveTeamId] = useState<string | null>("team_1");
  const [activeSpaceId, setActiveSpaceId] = useState<string | null>("space_1");

  return (
    <div className="flex h-screen">
      <SidePanel
        currentUserId={currentUserId}
        teams={teams}
        setTeams={setTeams}
        projects={projects}
        setProjects={setProjects}
        spaces={spaces}
        setSpaces={setSpaces}
        activeProjectId={activeProjectId}
        setActiveProjectId={setActiveProjectId}
        activeTeamId={activeTeamId}
        setActiveTeamId={setActiveTeamId}
        activeSpaceId={activeSpaceId}
        setActiveSpaceId={setActiveSpaceId}
      />
      <main className="flex flex-col w-full pt-3 relative">
        <HeaderPanel
          currentUserId={currentUserId}
          projects={projects}
          teams={teams}
          spaces={spaces}
          activeProjectId={activeProjectId}
          activeTeamId={activeTeamId}
          activeSpaceId={activeSpaceId}
          setActiveProjectId={setActiveProjectId}
          setActiveTeamId={setActiveTeamId}
          setActiveSpaceId={setActiveSpaceId}
        />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;