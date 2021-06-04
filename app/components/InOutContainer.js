import React from 'react'
import styled from 'styled-components'
import Container from './Container.js'
import Button from './Button.js'

export default function InOutContainer (props) {
    return (
        <Container>
            <div>
                <Button onClick={props.screen_in} >SCREEN IN</Button>
                <Button onClick={props.screen_out} >SCREEN OUT</Button>
            </div>
            <div>
                <Button onClick={props.mapa_in} >MAPA IN</Button>
                <Button onClick={props.mapa_out} >MAPA OUT</Button>
            </div>
            <div>
                <Button onClick={props.totem_in} >TOTEMI IN</Button>
                <Button onClick={props.totem_out} >TOTEMI OUT</Button>
            </div>

        </Container>
    )
}