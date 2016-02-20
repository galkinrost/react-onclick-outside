# React onclick outside

On click outside the component decorator

## Installation

```bash
npm install --save react-onclick-outside
```

## onClickOutside

```javascript
...
import onClickOutside from 'react-onclick-outside'

const Component = () => (...)

onClickOutside( props => props.action() )(Component)
```


## Example

```javascript
import React from 'react'
import {connect} from 'react-redux'
import multidecorator from 'react-multidecorator'
import onClickOutside from 'react-onclick-outside'
import {bindActionCreators} from 'redux'
import {close} from './actions'

const Popup = (...)

export default multidectorator(
    connect(undefined, ( dispatch )=>({
        close: bindActionCreators( close, dispatch )
    }),
    onClickOutside( props => props.close() )
)(Popup)

```
