import React from 'react'

export default function HighComponent(Class) {
    return class WrapperComponent extends React.PureComponent {
        constructor(props) {
            super(props)
            this.state={}
            this.handleChange = this.handleChange.bind(this)
        }

        handleChange(key, val) {
            console.log(key, val)
            this.setState({
                [key]: val
            })
        }
        render() {
            return (
                <Class handleChange={this.handleChange} state={this.state} {...this.props} />
            )
        }
    }
}