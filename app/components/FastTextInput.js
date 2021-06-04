import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Input = styled.input`
  box-sizing: border-box;
  padding: 3px;
  background-color: white;
  border: 1px solid gray;
  border-radius: 3px;
  height: 30px;
  width: 150px;
  color: gray;
  outline: none;
  font-size: 12px;
  text-align: left;
  margin: auto;
  margin-top: 10px;
  &:focus {
    border: 3px solid var(--mainColor1);
    color: var(--mainColor1);
  }
`
const InputLabel = styled.span`
  font-size: 12px;
  color: grey;
  width: 50px;
  display: inline-block;
  text-align: right;
  padding-right: 9px;
`

function FastTextInput (props) {
  const handleChange = (event) => props.setText(event.target.value)
  return (
    <div>
      <InputLabel>{props.label}</InputLabel>
      <Input type="text" value={props.text} onChange={handleChange} maxLength={`${props.maxLength || 1000}`}/>
    </div>
  )
}

export default FastTextInput
