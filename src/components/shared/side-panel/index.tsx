import Image from "next/image";
import styles from "./index.module.scss";
import TeamChoice from "./ui/team-choice";

const SidePanel = () => {
    return (
        <nav className={`${styles["side-panel"]} p-3 flex flex-col`}>
            <div className="flex flex-col gap-6">
                <div className={`${styles["side-panel__logo"]} flex gap-3 items-center`}>
                    <Image src={"/logotypes/taskora.png"} width={50} height={50} alt="[logotype]"  />
                    <span>Taskora</span>
                </div>

                <TeamChoice />
            </div>
        </nav>
    )
}

export default SidePanel;