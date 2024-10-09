import React from 'react'

import Typewriter from 'typewriter-effect'

function typewriter() {
  return (
    <div id='typewriter'>
        <Typewriter
        onInit={(typewriter) => {
            typewriter
                .typeString('Berättelsen börjar...')
                .pauseFor(300)
                .deleteAll()
                .typeString('Vad kommer du att göra?')
                .pauseFor(1500)
                .start();    
        }}/>

    </div>
  )
}

export default typewriter