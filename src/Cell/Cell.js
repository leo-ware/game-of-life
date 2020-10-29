import React from 'react'

/**
 * Cell widget
 * @param {boolean} props.alive
 * @param {Number} props.x - x index of cell in array
 * @param {Number} props.y - y index of cell in array
 * @param {function} props.onClick
 * @returns {JSX.Element}
 * @constructor
 */
const Cell = (props) => {
    return (
        <div
            className={'cell'}
            onClick={props.onClick}
            style={{
                'position': 'absolute',
                'left': props.size(props.x),
                'top': props.size(props.y),

                'width': props.size(),
                'height': props.size(),

                'backgroundColor': props.alive? 'black': 'white',
                'border': 'solid 2px black'
            }}
        />
    )
}

export default Cell
