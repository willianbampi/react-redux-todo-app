import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Grid from '../template/grid'
import IconButton from '../template/iconButton'

import { add, changedDescription, search, clear } from './todoActions'

class TodoForm extends Component {
    constructor(props) {
        super(props)
        this.keyHandler = this.keyHandler.bind(this)
    }

    componentWillMount() {
        this.props.search()
    }

    keyHandler(event) {
        const { add, clear, search, description } = this.props
        if(event.key = 'Enter') {
            event.shiftKey ? search() : add(description)
        } else if(event.key === 'Escape') {
            clear()
        }
    }

    render() {
        const { add, search, description } = this.props
        return(
            <div role="form" className="todoForm">
            <Grid cols="12 9 10">
                <input id="description"
                       className="form-control"
                       placeholder="Adicione uma tarefa"
                       onChange={this.props.changedDescription}
                       onKeyUp={this.keyHandler}
                       value={this.props.description}></input>
            </Grid>
            <Grid cols="12 3 2">
                <IconButton style="primary" 
                            icon="plus" 
                            onClick={() => add(description)}
                ></IconButton>
                <IconButton style="info" 
                            icon="search" 
                            onClick={search}
                ></IconButton>
                <IconButton style="default" 
                            icon="close" 
                            onClick={this.props.clear}
                ></IconButton>
            </Grid>
        </div>
        )
    }
}

const mapStateToProps = state => ({description: state.todo.description})
const mapDispatchToProps = dispatch => bindActionCreators({add, changedDescription, search, clear}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)