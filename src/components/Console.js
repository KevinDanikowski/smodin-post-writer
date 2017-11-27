import React, { Component } from 'react'
import ParameterList from './ParameterList'
import SocialPostList from './SocialPostList'
import IndustryList from './IndustryList'
import SchedulePage from './SchedulePage'
import BuildPage from './BuildPage'
import ConsoleRibbon from './ConsoleRibbon'

class Console extends Component {
    constructor(props) {
        super(props)
        const primaryIndustryId = 'cj97jd2670t6501027go4pm46'
        const primaryIndustry = 'Generic'
        const defaultSearchText = ''
        const defaultTab = 'build'
        const defaultScheduleType = 'monthly'
        this.state = {
            selectedIndustryId: primaryIndustryId,
            selectedIndustry: primaryIndustry,
            searchText: defaultSearchText,
            tab: defaultTab,
            scheduleType: defaultScheduleType
        }
    }
    componentWillUpdate(nextProps, nextState) {
        if (nextState.selectedIndustryId === !this.state.selectedIndustryId) {}
        if (nextState.searchText === !this.state.searchText) {}
        if (nextState.tab === !this.state.tab) {}
        else return
    }
    render() {
        return (
            <div className='flexbox-parent-console'>
                <div className='pt1 pr2 pl1 w235p bg-black-10 flex'>
                    <IndustryList
                            defaultIndustryId={this.state.selectedIndustryId}
                            defaultIndustry={this.state.selectedIndustry}
                            receiveIndustry={this._passIndustry}/>
                </div>
                <div className='flex-1 fill-area-content fill-area-col'>
                    <div className='bg-gray pt2 pb2 overflow-x-hidden overflow-y-hidden'>
                        <ConsoleRibbon
                            defaultSearchText={this.state.searchText}
                            defaultTab={this.state.tab}
                            defaultScheduleType={this.state.scheduleType}
                            receiveSearchText={this._passSearch}
                            receiveTab={this._passTab}
                            receiveScheduleType={this._passScheduleType}/>
                    </div>
                    <div className='flex-1 fill-area-content'>
                        {(this.state.tab === 'parameters')?
                        <ParameterList
                            selectedIndustry={this.state.selectedIndustry}
                            selectedIndustryId={this.state.selectedIndustryId}
                            searchText={this.state.searchText}/> : null }
                        {(this.state.tab === 'posts')?
                        <SocialPostList
                            selectedIndustry={this.state.selectedIndustry}
                            selectedIndustryId={this.state.selectedIndustryId}
                            searchText={this.state.searchText}/> : null }
                        {(this.state.tab === 'schedule')?
                        <SchedulePage
                            selectedIndustry={this.state.selectedIndustry}
                            selectedIndustryId={this.state.selectedIndustryId}
                            scheduleType={this.state.scheduleType}/> : null }
                        {(this.state.tab === 'build')?
                            <BuildPage
                                selectedIndustry={this.state.selectedIndustry}
                                selectedIndustryId={this.state.selectedIndustryId}/> : null }
                    </div>
                </div>
            </div>
        )
    }
    _passIndustry = (industryId, industry) => {
        this.setState({ selectedIndustryId: industryId, selectedIndustry: industry })
    }
    _passSearch = (searchText) => {
        this.setState({ searchText: searchText })
    }
    _passTab = (tab) => {
        this.setState({ tab: tab })
    }
    _passScheduleType = (scheduleType) => {
        this.setState({ scheduleType: scheduleType })
    }
}

export default Console