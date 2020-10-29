import React, { useState } from 'react'
import RuleSet from '../Rules/RuleSet'
import ControlPanel from "../ControlPanel/ControlPanel";
import Cell from "../Cell/Cell";
import './Grid.css'

let lastKey = 0
const getKey = () => {lastKey++; return lastKey}

const size = (pos=1) => `${pos*5}vh`

const World = (props) => {

    const r = new RuleSet('wrap') // static rules in separate class
    const [state, setState] = useState(r.makeGrid(props.x, props.y))
    const history = []

    // react is rendering right, so engage hackiness
    const [garbage, setGarbage] = useState(0)
    const rerender = () => {setGarbage(garbage + 1)}

    // state transforms
    const updateState = (value, replace=false) => {
        r.validateGrid(value)
        history.push(state)
        setState(value)
        rerender()
    }

    const togglePosition = (x, y) => {
        let temp = state
        temp[x][y] = temp[x][y]===null? null : temp[x][y] === 1? 0: 1
        updateState(temp)
    }

    const undo = () => {
        if (history.length >= 1){
            setState(history[-1])
            history.pop()
        }
    }

    const clear = () => {
        updateState(r.makeGrid(props.x, props.y))
    }

    const step = () => {
        console.log("stepping")
        updateState(r.step(state))
    }

    // start/stop runner
    let updateIntervalObject
    const [interval, _setStepInterval] = useState(0.7)

    const start = () => {
        updateIntervalObject = setInterval(step, interval*1000)
    }

    const stop = () => {
        clearInterval(updateIntervalObject)
    }

    const setStepInterval = (value) => {
        stop()
        _setStepInterval(value)
        start()
    }

    // stuff to render
    let cells = []
    for (let x=0; x < state.length; x++){
        for (let y=0; y < state[0].length; y++){
            cells.push(
                <Cell
                    x={x} y={y}
                    alive={!!state[x][y]}
                    onClick={() => {togglePosition(x, y)}}
                    key={getKey()}
                    size={size}
                />
            )
        }
    }

    return (
        <div className={'Grid'}>
            <ControlPanel
                left={size(props.x)}
                undo={undo}
                step={step}
                clear={clear}
                size={size}
                start={start}
                stop={stop}
                setStepInterval={setStepInterval}
            />
            <Grid size={size} cells={cells} />
        </div>
    )

}

const Grid = (props) => <div className={'grid-container'}>{props.cells}</div>

export default World
