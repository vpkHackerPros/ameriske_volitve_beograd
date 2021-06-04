import styles from './App.css'
import React, { useState, useEffect } from 'react'
import {SocketProvider} from '../hooks/useSocket.js'
import styled, { createGlobalStyle } from 'styled-components'

import InputForm from './InputForm.js'
import InOutContainer from './InOutContainer.js'
import Settings from './Settings.js'



const GlobalStyle = createGlobalStyle`
  :root {
    --mainColor1: #2F4858; //temno modra
    --mainColor2: #336699; //svetlej modra
    --textColor: #FF3E41;  //rdeča
    --background: white;
  }
  #root {
    height: 100%
  }
  body {
    height: 100%;
    width: 100%;
    margin: auto;
    position: relative;
    overflow: scroll;
    font-size: 1.5em;
    background: var(--background);

    //ozadje
    background-color: var(--mainColor1);
  }
  html {
    height: 100%;
    width: 100%;
    margin: 0;
  }
`
const Container = styled.div `
  height: 400px;
  width: 300px;
  margin: auto;
`

export default function App (props) {
  const [connection, setConnection] = useState({ip: "localhost", port: 6100})
  const [percent, setPercent] = useState({biden: 50, trump: 50})

  const sendPercent= () => {
    fetch('http://localhost:4545/percent', {
      method: 'POST',
      body: JSON.stringify({ percent }),
      headers: {'Content-Type': 'application/json'},
    })
  } 
  const sendConnection = () => {
    fetch('http://localhost:4545/connection', {
      method: 'POST',
      body: JSON.stringify({ connection }),
      headers: {'Content-Type': 'application/json'},
    })
  } 
  const screen_in = () => fetch('http://localhost:4545/screenIN')
  const screen_out = () => fetch('http://localhost:4545/screenOUT')
  const mapa_in = () => fetch('http://localhost:4545/mapaIN')
  const mapa_out = () => fetch('http://localhost:4545/mapaOUT')
  const totem_in = () => fetch('http://localhost:4545/totemIN')
  const totem_out = () => fetch('http://localhost:4545/totemOUT')

  useEffect(() => {
    console.log(percent)
    sendPercent()
  }, [percent])

  useEffect(() => {
    console.log(connection)
    sendConnection()
  }, [connection])

  return (
    <SocketProvider connection={{ip:'localhost', port:6100}}>
      <GlobalStyle/>
      <Container>
        <Settings 
          ip={connection.ip}
          port={connection.port}
          setIp={(value) => {
            setConnection({ip: value, port: connection.port})
          }}
          setPort={(value) => {
            setConnection({ip: connection.ip, port: value})
          }}
        />
        <InputForm
          biden={percent.biden}
          trump={percent.trump}
          setBiden={(value) => {
            setPercent({biden: value, trump: percent.trump})
          }}
          setTrump={(value) => {
            setPercent({trump: value, biden: percent.biden})
          }}
        />
        <InOutContainer 
          screen_in={screen_in}
          screen_out={screen_out}
          mapa_in={mapa_in}
          mapa_out={mapa_out}
          totem_in={totem_in}
          totem_out={totem_out}
        />
      </Container>
    </SocketProvider>
  )
}
