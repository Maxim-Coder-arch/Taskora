export type TUserRole = "admin" | "user";

export interface IUser {
    _id: string;

    name: string;
    email: string;

    role: TUserRole;

    avatarColor: string;

    createdAt: string;
}

export interface ITeam {
    _id: string;

    name: string;
    color: string;

    ownerId: string;
    memberIds: string[];

    createdAt: string;
}

export interface IProject {
    _id: string;

    name: string;
    description?: string;

    ownerId: string;
    memberIds: string[];

    teamId: string;

    createdAt: string;
}

export interface ISpace {
    _id: string;

    name: string;
    color: string;

    projectId: string;

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
];

export const teams: ITeam[] = [
    {
        _id: "team_1",
        name: "Developers",
        color: "#3b82f6",

        ownerId: "user_1",

        memberIds: [
            "user_1",
            "user_2",
        ],

        createdAt: "2026-08-17",
    },

    {
        _id: "team_2",
        name: "Analytics",
        color: "#22c55e",

        ownerId: "user_3",

        memberIds: [
            "user_3",
        ],

        createdAt: "2026-08-17",
    },
];


export const projects: IProject[] = [
    {
        _id: "project_1",
        name: "Taskora",
        description: "Task management system",

        ownerId: "user_1",

        memberIds: [
            "user_1",
            "user_2",
        ],

        teamId: "team_1",

        createdAt: "2026-08-17",
    },

    {
        _id: "project_2",
        name: "Nexsol",
        description: "Nexsol corporate platform",

        ownerId: "user_1",

        memberIds: [
            "user_1",
            "user_3",
        ],

        teamId: "team_2",

        createdAt: "2026-08-17",
    },

    {
        _id: "project_3",
        name: "Mobile App",
        description: "Mobile application",

        ownerId: "user_2",

        memberIds: [
            "user_2",
        ],

        teamId: "team_1",

        createdAt: "2026-08-17",
    },
];

export const spaces: ISpace[] = [
    {
        _id: "space_1",
        name: "Продукты",
        color: "#3b82f6",

        projectId: "project_1",

        createdAt: "2026-08-17",
    },

    {
        _id: "space_2",
        name: "Разработка",
        color: "#22c55e",

        projectId: "project_1",

        createdAt: "2026-08-17",
    },

    {
        _id: "space_3",
        name: "Тестирование",
        color: "#f97316",

        projectId: "project_1",

        createdAt: "2026-08-17",
    },

    {
        _id: "space_4",
        name: "Frontend",
        color: "#8b5cf6",

        projectId: "project_2",

        createdAt: "2026-08-17",
    },

    {
        _id: "space_5",
        name: "Backend",
        color: "#ec4899",

        projectId: "project_2",

        createdAt: "2026-08-17",
    },

    {
        _id: "space_6",
        name: "Development",
        color: "#06b6d4",

        projectId: "project_3",

        createdAt: "2026-08-17",
    },
];