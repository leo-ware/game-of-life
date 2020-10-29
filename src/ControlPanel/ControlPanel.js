import React, {useRef} from 'react'
import Draggable from "react-draggable";
import './ControlPanel.css'

const ControlPanel = (props) => {
    const ref = useRef()
    return (
        <div
            className={'ControlPanel'}
            style={{left: props.left}}
        >
            <h1>Conway's Game of Life</h1>
            <Draggable nodeRef={ref}>
                <ol ref={ref}>
                    <h2 onClick={props.step}><li>Step</li></h2>
                    {/*<h2 onClick={props.start}><li>Start</li></h2>*/}
                    {/*<h2 onClick={props.stop}><li>Stop</li></h2>*/}
                    {/*<h2 onClick={props.undo}><li>Undo</li></h2>*/}
                    <h2 onClick={props.clear}><li>Clear</li></h2>
                </ol>
            </Draggable>
        </div>
    )
}

export default ControlPanel
