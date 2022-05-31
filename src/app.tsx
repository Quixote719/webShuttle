import React from 'react'
import Print from './print';
import styles from '@/app.less'

// function testTreeShaking () {
//     let testShaking = 'testShaking'
//     return testShaking
// }


export default function App () {
    return (
        <div>
            <div className={styles.appTitle}>hello react</div>
            <button onClick={() => console.log('click')}>click</button>
            <button onClick={()=> Print('Hello webpack!')}>print</button>
        </div>
    )
}