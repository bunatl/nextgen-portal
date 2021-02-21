import { Tile } from './dashboard/Tile';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

import { ITile } from '../types/tile';

const listOfApps: ITile[] = [
    { tileTitle: "QESTak", tileHero: "", tileActionList: [ <SettingOutlined key="setting" />, <EditOutlined key="edit" />, <EllipsisOutlined key="ellipsis" /> ], tileDescription: "Helps you improve" },
    { tileTitle: "test", tileHero: "", tileActionList: [ <SettingOutlined key="setting" /> ], tileDescription: "" },
    { tileTitle: "test", tileHero: "", tileActionList: [ <SettingOutlined key="setting" /> ], tileDescription: "" },
    { tileTitle: "test", tileHero: "", tileActionList: [ <SettingOutlined key="setting" />, <EllipsisOutlined key="ellipsis" /> ], tileDescription: "" },
    { tileTitle: "test", tileHero: "", tileActionList: [ <EditOutlined key="edit" />, <EllipsisOutlined key="ellipsis" /> ], tileDescription: "" }
];

export const Dashboard = () => {
    return (
        <main>
            {
                listOfApps.map((x, i) => (
                    <Tile
                        tileTitle={x.tileTitle}
                        tileDescription={x.tileDescription}
                        tileActionList={x.tileActionList}
                        tileHero={x.tileHero}
                    />
                ))
            }
        </main>
    )
}