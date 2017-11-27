import React, { Component } from 'react'
import { graphql, gql, compose } from 'react-apollo'
import { GC_USER_ID, dayArray } from '../constants'
import FullCalendar from './Calendar'

class SchedulePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            scheduleType: this.props.scheduleType
        }
    }
    componentWillUpdate(nextProps, nextState){
        if (nextProps === this.props) return false
    }
    render() {
        const userId = localStorage.getItem(GC_USER_ID)
        if (!userId){
            return(
                <div>
                    <h1 className="tc">Oops! You are not logged in!</h1>
                    <button onClick={() => {
                        this.props.history.push('/login')
                    }}>Login
                    </button>
                </div>
            )
        }
        const BuildSidebar = () => {
            return (
                <div className='flex flex-column h-100 items-center justify-between w200p bg-blue overflow-hidden'>
                    <div>Type!</div>
                    <div>Time Length!</div>
                    <div className='background-blue pa2 br3'>Build!</div>
                </div>
            )
        }
        return (
            <div className='h-100 flex inline-flex overflow-x-hidden w-100'>
                <div className='flex-1 pa1 overflow-y-scroll'>
                    <FullCalendar />
                </div>
                <BuildSidebar />
            </div>
        )
    }
}
export default SchedulePage