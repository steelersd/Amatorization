import React from 'react'
import styled from 'styled-components'
import {partial} from 'ramda'
import {withState, withHandlers, compose} from 'recompose'

const prop = (key, defaultVal) => props => props[key] ? props[key] : defaultVal
const propBoolPred = (key, whenTrue, whenFalse, defaultVal) => props => {
  if (typeof(props[key]) === 'boolean')
    return props[key] ? whenTrue : whenFalse
  else {
    return defaultVal
  }
}

const addOpen = compose(
  withState('open', 'setOpen', false),
  withHandlers({
    onOpen: ({ setOpen }) => () => setOpen(true),
    onClose: ({ setOpen }) => () => setOpen(false),
  })
)

const CloseStyle = styled.a.attrs({
    href: 'javascript:void(0)',
  })`
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
    color: #818181;
    text-decoration: none;
`

const SideNavStyle = styled.div`    
  height: 100%;
  width: ${propBoolPred('open', '100%', 0, 0)}
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: white;
  overflow-x: hidden;
  transition: ${prop('transition', '0.5s')}
  padding-top: 60px;
  text-align:center;
`

const withSlider = WrappedComponent => props => {
  const { open, onClose, transition, ...passThroughProps } = props;
  return (
    <SideNavStyle transition={transition} open={open} >
      <CloseStyle onClick={partial(onClose, [false])} >x</CloseStyle>
      <WrappedComponent  {...passThroughProps} />
    </SideNavStyle >
  )
}

export {withSlider, addOpen}


