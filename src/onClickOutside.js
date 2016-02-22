import React, {Component} from 'react'
import hoist from 'hoist-non-react-statics'

const onClickOutside = (handler = () => null) => {
    const createOnClickHandler = (instance) => (e) => {
        if (!instance.ref || !instance.ref.contains(e.target)) {
            handler(instance.props)
        }
    }

    return Wrapped => {
        class WithHandler extends Component {

            componentDidMount() {
                this.onClickHandler = createOnClickHandler(this)
                document.addEventListener(`click`, this.onClickHandler, true)
            }


            componentWillUnmount() {
                document.removeEventListener(`click`, this.onClickHandler, true)
            }

            render() {
                return (
                    <div ref={ref => {
                        this.ref = ref
                    }}
                    >
                        <Wrapped{...this.props}/>
                    </div>
                )
            }
        }

        return hoist(WithHandler, Wrapped)
    }
}

export default onClickOutside