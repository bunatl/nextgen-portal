import { FC } from 'react';

interface ITile {

}

export const Tile: FC<ITile> = () => {
    return (
        <div className='dashboardTile'>
            <div className='tileImg'>
                <img></img>
            </div>
            <div className='tileBody'>
                <h2></h2>
                <p></p>
            </div>
        </div>
    )
}