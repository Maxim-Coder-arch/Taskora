export type TUserRole = "admin" | "user";

export interface IUser {
    _id: string;
    name: string;
    email: string;
    role: TUserRole;
    avatarColor: string;
    createdAt: string;
}

export interface IProject {
    _id: string;
    name: string;
    description?: string;
    ownerId: string;
    memberIds: string[];
    createdAt: string;
}

export interface ITeam {
    _id: string;
    name: string;
    color: string;
    projectId: string;
    ownerId: string;
    memberIds: string[];
    createdAt: string;
}

export interface ISpace {
    _id: string;
    name: string;
    color: string;
    teamId: string;
    createdAt: string;
}


export const users: IUser[] = [
    {
        _id: "user_1",
        name: "Max",
        email: "max@gmail.com",
        role: "admin",
        avatarColor: "#8b5cf6",
        createdAt: "2026-08-17",
    },
    {
        _id: "user_2",
        name: "Alex",
        email: "alex@gmail.com",
        role: "user",
        avatarColor: "#3b82f6",
        createdAt: "2026-08-17",
    },
    {
        _id: "user_3",
        name: "Anna",
        email: "anna@gmail.com",
        role: "user",
        avatarColor: "#22c55e",
        createdAt: "2026-08-17",
    },
    {
        _id: "user_4",
        name: "Anna",
        email: "anna@gmail.com",
        role: "user",
        avatarColor: "#22c55e",
        createdAt: "2026-08-17",
    },
    {
        _id: "user_5",
        name: "Anna",
        email: "anna@gmail.com",
        role: "user",
        avatarColor: "#22c55e",
        createdAt: "2026-08-17",
    },
    {
        _id: "user_6",
        name: "Anna",
        email: "anna@gmail.com",
        role: "user",
        avatarColor: "#22c55e",
        createdAt: "2026-08-17",
    },
];

export const projects: IProject[] = [
    {
        _id: "project_1",
        name: "Taskora",
        description: "Task management system",
        ownerId: "user_1",
        memberIds: ["user_1", "user_2", "user_3", "user_4", "user_5", "user_6"],
        createdAt: "2026-08-17",
    },
    {
        _id: "project_2",
        name: "Nexsol",
        description: "Nexsol corporate platform",
        ownerId: "user_1",
        memberIds: ["user_1", "user_3"],
        createdAt: "2026-08-17",
    },
    {
        _id: "project_3",
        name: "Mobile App",
        description: "Mobile application",
        ownerId: "user_2",
        memberIds: ["user_2"],
        createdAt: "2026-08-17",
    },
];

export const teams: ITeam[] = [
    {
        _id: "team_1",
        name: "Developers",
        color: "#3b82f6",
        projectId: "project_1",
        ownerId: "user_1",
        memberIds: ["user_1", "user_2"],
        createdAt: "2026-08-17",
    },
    {
        _id: "team_2",
        name: "Design",
        color: "#ec4899",
        projectId: "project_1",
        ownerId: "user_1",
        memberIds: ["user_1"],
        createdAt: "2026-08-17",
    },
    {
        _id: "team_3",
        name: "Frontend",
        color: "#8b5cf6",
        projectId: "project_2",
        ownerId: "user_1",
        memberIds: ["user_1", "user_3"],
        createdAt: "2026-08-17",
    },
    {
        _id: "team_4",
        name: "Backend",
        color: "#22c55e",
        projectId: "project_2",
        ownerId: "user_1",
        memberIds: ["user_1"],
        createdAt: "2026-08-17",
    },
    {
        _id: "team_5",
        name: "Mobile",
        color: "#f97316",
        projectId: "project_3",
        ownerId: "user_2",
        memberIds: ["user_2"],
        createdAt: "2026-08-17",
    },
];

export const spaces: ISpace[] = [
    {
        _id: "space_1",
        name: "Frontend",
        color: "#3b82f6",
        teamId: "team_1",
        createdAt: "2026-08-17",
    },
    {
        _id: "space_2",
        name: "Backend",
        color: "#22c55e",
        teamId: "team_1",
        createdAt: "2026-08-17",
    },
    {
        _id: "space_3",
        name: "UI/UX",
        color: "#ec4899",
        teamId: "team_2",
        createdAt: "2026-08-17",
    },
    {
        _id: "space_4",
        name: "Components",
        color: "#8b5cf6",
        teamId: "team_3",
        createdAt: "2026-08-17",
    },
    {
        _id: "space_5",
        name: "API",
        color: "#22c55e",
        teamId: "team_4",
        createdAt: "2026-08-17",
    },
    {
        _id: "space_6",
        name: "Development",
        color: "#f97316",
        teamId: "team_5",
        createdAt: "2026-08-17",
    },
];

