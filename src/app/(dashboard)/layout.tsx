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

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const currentUserId = "user_1";

  const [teams, setTeams] = useState(mockTeams);
  const [projects, setProjects] = useState(mockProjects);
  const [spaces, setSpaces] = useState(mockSpaces);

  const [activeTeamId, setActiveTeamId] = useState("team_1");
  const [activeProjectId, setActiveProjectId] = useState<string | null>("project_1");
  const [activeSpaceId, setActiveSpaceId] = useState<string | null>("space_2");

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
        activeTeamId={activeTeamId}
        setActiveTeamId={setActiveTeamId}
        activeProjectId={activeProjectId}
        setActiveProjectId={setActiveProjectId}
        activeSpaceId={activeSpaceId}
        setActiveSpaceId={setActiveSpaceId}
      />
      <main className="flex flex-col w-full pt-3">
        <HeaderPanel
          currentUserId={currentUserId}
          teams={teams}
          spaces={spaces}
          activeTeamId={activeTeamId}
          activeSpaceId={activeSpaceId}
        />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;