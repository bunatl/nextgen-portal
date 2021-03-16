import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

import { ITile } from '../types/tile';
import { Tile } from './dashboard/Tile';

const listOfApps: ITile[] = [
    { tileTitle: "QESTak", tileHero: "", tileActionList: [ <SettingOutlined key="setting" />, <EditOutlined key="edit" />, <EllipsisOutlined key="ellipsis" /> ], tileDescription: "Helps you improve" },
    { tileTitle: "test", tileHero: "", tileActionList: [ <SettingOutlined key="setting" /> ], tileDescription: "" },
    { tileTitle: "test", tileHero: "", tileActionList: [ <SettingOutlined key="setting" /> ], tileDescription: "" },
    { tileTitle: "test", tileHero: "", tileActionList: [ <SettingOutlined key="setting" />, <EllipsisOutlined key="ellipsis" /> ], tileDescription: "" },
    { tileTitle: "test", tileHero: "", tileActionList: [ <EditOutlined key="edit" />, <EllipsisOutlined key="ellipsis" /> ], tileDescription: "" }
];

export default function Dashboard() {
    return (
        <main>
            <h2>{localStorage.getItem('user')}</h2>
            {
                listOfApps.map((x, i) => (
                    <Tile
                        key={i}
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