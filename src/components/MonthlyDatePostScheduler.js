import React, { Component } from 'react'
import Dropdown from 'react-dropdown'
import { monthlyDates, hours, minutes } from '../constants'
import _ from 'underscore'

class MonthlyDatePostScheduler extends Component {
    constructor(props) {
        super(props)
        this.state = {
            monthDate: '',
            hour: '',
            minute: ''
        }
    }
    componentWillUpdate(nextProps, nextState){
        if (nextProps === this.props) return false
    }
    render() {
        const UserPostTimes = () => {
            const monthlyDateSchedules = this.props.monthlyDateSchedules
            const sortedMonthlyDateSchedules = _.sortBy((_.sortBy((_.sortBy(monthlyDateSchedules, 'minute')), 'hour')), 'monthDate')
            const MonthlyDateSchedules = () => {
                return sortedMonthlyDateSchedules.map((date,index) => {
                    let dateMonthDate = date.monthDate
                    if (date.monthDate.substr(0,1) === '0') {
                        dateMonthDate = date.monthDate.slice(1,2)
                    }
                    return (
                        <div key={index} className='h20p flex items-center justify-center mt1'>
                            <span className='font-couriernew fw4 tc'>{dateMonthDate} at {date.hour}:{date.minute}</span>
                            <span className='ml3 fw6 red hover-white pointer'
                                  onClick={() => {this._deleteMonthlyDateSchedule(date.id)}}>X</span>
                        </div>
                    )
                })
            }
            return (
                <div className='flex flex-column flex-1 justify-center  overflow-y-auto'>
                    <MonthlyDateSchedules />
                </div>
            )
        }
        const FullDropdown = () => {
            const monthlyDatesSimple = monthlyDates.map(date =>{
                if (date.substr(0,1) === '0') return date.slice(1,2)
                else return date
            })
            return (
                <div className='self-center flex justify-center flex-wrap items-center ma1'>
                    <div className='flex inline-flex items-center'>
                        <Dropdown
                            className='w100p ma2'
                            onChange={async (object)=> await this.setState({monthDate: object.value})}
                            value={this.state.monthDate}
                            placeholder='date' options={monthlyDatesSimple} />
                        <div className=' fw6 mr2 ml2'>at</div>
                    </div>
                    <div className='flex inline-flex items-center'>
                        <Dropdown
                            className='w50p ma2'
                            onChange={async (object)=> await this.setState({hour: object.value})}
                            value={this.state.hour}
                            placeholder='hr' options={hours} />
                        <div className=' fw6 ml2'>:</div>
                        <Dropdown
                            fluid multiple selection
                            className='w50p ml1 mr2'
                            onChange={async (object)=> await this.setState({minute: object.value })}
                            value={this.state.minute}
                            placeholder='min' options={minutes} />
                        <div className='hover-green pointer w50p ml2 flex items-center'
                             onClick={()=> {this._addMonthlyDateSchedule()}}>
                            <i className="fa fa-calendar-check-o fa-2x ml1" aria-hidden="true"> </i>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className='flex flex-column w-80 bg-black-05 h-100 ba br2 b--black-20 mw220p'>
                <h3 className='tc bg-black-20 mt0 pt2 pb2 mb1'>Monthly Dates</h3>
                <FullDropdown />
                <UserPostTimes />
                <div className='tc pointer bg-green white ba br2 b--black-20'
                     onClick={()=>{this._generateRecommendedMonthlySchedule()}}>Generate Recommended Monthly Date Schedule</div>
            </div>
        )
    }
    _deleteMonthlyDateSchedule = (id) => {
        this.props.deleteMonthlyPostSchedule(id)
    }
    _addMonthlyDateSchedule = async () => {
        const monthlyScheduleType = 'monthDate'
        let monthDate = this.state.monthDate
        if (monthDate.length === 1) monthDate = '0'.concat(monthDate)
        const monthDay = ''
        const hour = this.state.hour
        const minute = this.state.minute
        await this.props.addMonthlyPostSchedule(monthlyScheduleType, monthDate, monthDay, hour, minute)
        this.setState({ monthlyDate: '', hour: '', minute: ''})
    }
    _generateRecommendedMonthlySchedule = async () => {
        await this.props.generateRecommendedMonthlySchedule('monthDate')
        this.setState({ monthlyDate: '', hour: '', minute: ''})
    }
}
export default MonthlyDatePostScheduler
