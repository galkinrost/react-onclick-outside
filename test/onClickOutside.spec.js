import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import expect from 'expect'
import jsdom from 'mocha-jsdom'
import onClickOutside from '../src/onClickOutside'
import sinon from 'sinon'

describe(`react-onclick-outside`, () => {
    jsdom()

    let mountNode

    const simulateClick = (node) => {
        const event = document.createEvent(`Event`)
        event.initEvent(`click`, true, true)
        node.dispatchEvent(event)
        return event
    }

    beforeEach(() => {
        mountNode = document.createElement(`div`)
        document.body.appendChild(mountNode)
    })

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode)
    })

    it(`should not call handler on click for wrapped component`, () => {
        const handler = sinon.stub()

        let Wrapped = () => (
            <div/>
        )

        Wrapped = onClickOutside(handler)(Wrapped)

        const tree = ReactDOM.render(
            <Wrapped/>,
            mountNode
        )

        simulateClick(tree.ref)

        expect(handler.calledOnce).toBeFalsy()
    })

    it(`should call handler on click outside the component`, () => {
        const handler = sinon.stub()

        let Wrapped = () => (
            <div/>
        )

        Wrapped = onClickOutside(handler)(Wrapped)

        class Wrapper extends Component {
            render() {
                return (
                    <div ref={ref => {
                        this.ref = ref
                    }}
                    >
                        <Wrapped foo="bar"/>
                    </div>
                )
            }
        }

        const tree = ReactDOM.render(
            <Wrapper/>,
            mountNode
        )

        simulateClick(tree.ref)

        expect(handler.withArgs({foo: `bar`}).calledOnce).toBeTruthy()
    })

    it(`should not call handler after component will unmount`, () => {
        const handler = sinon.stub()

        let Wrapped = () => (
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
})