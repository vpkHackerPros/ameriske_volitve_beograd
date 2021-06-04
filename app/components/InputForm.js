import React from 'react'
import styled from 'styled-components'
import FastTextInput from './FastTextInput.js'
import Container from './Container.js'


export default function Settings (props) {
    return(
        <Container>
            <FastTextInput text={props.biden} setText={props.setBiden} label={'BIDEN:'}/>
            <FastTextInput text={props.trump} setText={props.setTrump} label={'TRUMP:'}/>
        </Container>
    )
}