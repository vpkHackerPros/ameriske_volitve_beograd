import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  flex: 1;
  width: 130px;
  height: 25px;
  background-color: gray;
  border: none;
  border-radius: 3px;
  margin: auto;
  margin-bottom: 10px;
  font-size: 10px;
  font-weight: black;
  color: white;
  margin-left: 5px;
  outline: none;
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;

  &: hover {
    background-color: var(--mainColor1);
  }
  &: active {
    background-color: black;
  }
`
export default Button
