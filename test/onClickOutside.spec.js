import expect from 'expect'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import jsdom from 'mocha-jsdom'
import sinon from 'sinon'

import onClickOutside from '../src/onClickOutside'

describe(`react-onclick-outside`, () => {
    jsdom()

    let mountNode

    const simulateClick = (node) => {
        const event = document.createEvent(`Event`)
        event.initEvent(`click`, true, true)
        node.dispatchEvent(event)
        return event
    }

    class Wrapper extends Component {
        render() {
            return (
                <div ref="wrapper">
                    {this.props.children}
                </div>
            )
        }
    }

    beforeEach(() => {
        mountNode = document.createElement('div')
        document.body.appendChild(mountNode)
    })

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode)
    });

    it(`should not call handler on click for wrapped component`, () => {
        const handler = sinon.stub()

        let Wrapped = () =>(
            <div/>
        )

        Wrapped = onClickOutside(handler)(Wrapped)

        const tree = ReactDOM.render(
            <Wrapped/>,
            mountNode
        )

        simulateClick(tree.refs.wrapped)

        expect(handler.calledOnce).toBeFalsy()
    })

    it(`should call handler on click outside the component`, () => {
        const handler = sinon.stub()

        let Wrapped = () =>(
            <div/>
        )

        Wrapped = onClickOutside(handler)(Wrapped)

        const tree = ReactDOM.render(
            <Wrapper>
                <Wrapped/>
            </Wrapper>,
            mountNode
        )

        simulateClick(tree.refs.wrapper)

        expect(handler.calledOnce).toBeTruthy()
    })

    it(`should not call handler after component will unmount`, () => {
        const handler = sinon.stub()

        let Wrapped = () =>(
            <div/>
        )

        Wrapped = onClickOutside(handler)(Wrapped)

        ReactDOM.render(
            <Wrapped/>,
            mountNode
        )


        ReactDOM.unmountComponentAtNode(mountNode)

        simulateClick(document)

        expect(handler.calledOnce).toBeFalsy()
    })
});