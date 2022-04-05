import React from 'react'
import Print from './print';

function testTreeShaking () {
    let testShaking = 'testShaking'
    return testShaking
}


export default function App () {
    return (
        <div>
            <div>hello react</div>
            <button onClick={() => console.log('click')}>click</button>
            <button onClick={()=> Print('Hello webpack!')}>print</button>
        </div>
    )
}