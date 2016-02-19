import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import hoist from 'hoist-non-react-statics'

const onClickOutside = (handler = ()=>null) => {
    const createOnClickHandler = (domNode) => (e) => {
        if (!domNode || !domNode.contains(e.target)) {
            handler()
        }
    }

    return Wrapped => {
        class WithHandler extends Component {

            componentDidMount() {
                this.onClickHandler = createOnClickHandler(this.refs.wrapped)
                document.addEventListener(`click`, this.onClickHandler, true)
            }


            componentWillUnmount() {
                document.removeEventListener(`click`, this.onClickHandler, true)
            }

            render() {
                return (
                    <div ref="wrapped" >
                        <Wrapped{...this.props}/>
                    </div>
                )
            }
        }

        return hoist(WithHandler, Wrapped)
    }
}

export default onClickOutside