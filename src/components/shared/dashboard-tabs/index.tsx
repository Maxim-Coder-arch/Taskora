import Link from "next/link";
import styles from "./index.module.scss";
import FileIcon from "@/public/icons/file";
import CalendarIcon from "@/public/icons/calendar";
import ListIcon from "@/public/icons/list";
import BoardIcon from "@/public/icons/board";
import { JSX } from "react/jsx-runtime";
import AddUserIcon from "@/public/icons/addUser";
import StatsIcon from "@/public/icons/stats";
import EllipsisIcon from "@/public/icons/ellipsis";
import ArrowIcon from "@/public/icons/arrow";
import { Dispatch, SetStateAction } from "react";


interface ITab {
    _id: string;
    tabdLabel: string;
    tabPage: string;
    tabIcon: JSX.Element;
}

const dataTabs: ITab[] = [
    {
        _id: "1",
        tabdLabel: "Доска",
        tabPage: "/",
        tabIcon: <BoardIcon />
    },
    {
        _id: "2",
        tabdLabel: "Задачи",
        tabPage: "/",
        tabIcon: <ListIcon />
    },
    {
        _id: "3",
        tabdLabel: "События",
        tabPage: "/",
        tabIcon: <CalendarIcon />
    },
    {
        _id: "4",
        tabdLabel: "Файлы",
        tabPage: "/",
        tabIcon: <FileIcon />
    },
    {
        _id: "5",
        tabdLabel: "Статистика",
        tabPage: "/",
        tabIcon: <StatsIcon />
    },
]


const DashboardTabs = ({ setShowProjectDetails, showProjectDetails }: {setShowProjectDetails: Dispatch<SetStateAction<boolean>>, showProjectDetails: boolean}) => {
    return (
        <div className={`${styles["dashboard-tabs"]} w-full pb-6 pt-6 pl-3 pr-3 flex items-center justify-between`}>
            <div className={`${styles["dashboard-tabs__tab"]} flex gap-6`}>
                {dataTabs.map(tabData => {
                    return (
                        <Link href={tabData.tabPage} key={tabData._id} className="flex gap-1 items-center">
                            {tabData.tabIcon}
                            <span>{tabData.tabdLabel}</span>
                        </Link>
                    )
                })}
            </div>

            <div className={`${styles["dashboard-tabs__control"]} flex gap-3`}>
                <button className={`${styles["dashboard-tabs__control__new-user"]} flex gap-1 items-center rounded-lg cursor-pointer transition-colors`}>
                    <div>
                        <AddUserIcon />
                    </div>
                    <span>Пользователь</span>
                </button>

                <button className={`${styles["dashboard-tabs__control__new-user"]} flex gap-1 items-center rounded-lg cursor-pointer transition-colors`} onClick={() => setShowProjectDetails(prev => !prev)}>
                    <div className={`${showProjectDetails ? "rotate-0" : "rotate-180"} transition-transform`}>
                        <ArrowIcon />
                    </div>
                    <span>Детали</span>
                </button>

                <button className={`${styles["dashboard-tabs__control__additional"]} h-[40px] w-[40px] flex items-center justify-center rounded-lg cursor-pointer transition-colors`}>
                    <EllipsisIcon />
                </button>
            </div>
        </div>
    )
}

export default DashboardTabs;