import { FC } from 'react';
import { Card } from 'antd';
import { ITile } from '../../types/tile';

const { Meta } = Card;

export const Tile: FC<ITile> = ({ tileTitle, tileHero, tileDescription, tileActionList }) => {
    return (
        <Card
            className="tileCard"
            style={{ width: 300 }}
            cover={
                <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
            }
            actions={tileActionList}
        >
            <Meta
                title={tileTitle}
                description={tileDescription}
            />
        </Card>
    )
}