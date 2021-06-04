import React from 'react'
import styled from 'styled-components'
import FastTextInput from './FastTextInput.js'
import Container from './Container.js'


export default function Settings (props) {
    return(
        <Container>
            <FastTextInput text={props.ip} setText={props.setIp} label={'IP'}/>
            <FastTextInput text={props.port} setText={props.setPort} label={'PORT'}/>
        </Container>
    )
}