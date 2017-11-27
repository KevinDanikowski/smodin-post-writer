import React, { Component } from 'react'

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchText: this.props.defaultSearchText,
            tab: this.props.defaultTab,
            scheduleType: this.props.defaultScheduleType
        }
    }
    componentWillUpdate(nextProps, nextState) {
        if (nextState.tab === !this.state.tab) {}
        else return
    }
    render() {
        return (
            <div className='flex items-center justify-between'>
                <div className='pt2 pb2'>
                    {(this.state.tab === 'parameters') ?
                        <a className='tab-on smodin-red ml1 pb3'>Parameters</a>
                        :
                        <a
                            className='tab-off ml1 pb3 fw6 white'
                            onClick={() => {this._sendTabToParent('parameters')}}>Parameters</a>}
                    {(this.state.tab === 'posts') ?
                        <a className='tab-on smodin-red ml1 pb3'>Posts</a>
                        :
                        <a
                            className='tab-off ml1 pb3 fw6 white'
                            onClick={() => {this._sendTabToParent('posts')}}>Posts</a>}
                    {(this.state.tab === 'schedule') ?
                        <a className='tab-on smodin-red ml1 pb3'>Schedule</a>
                        :
                        <a
                            className='tab-off ml1 pb3 fw6 white'
                            onClick={() => {this._sendTabToParent('schedule')}}>Schedule</a>}
                    {(this.state.tab === 'build') ?
                        <a className='tab-on smodin-red ml1 pb3 mr3'>Build</a>
                        :
                        <a
                            className='tab-off ml1 pb3 fw6 white mr3'
                            onClick={() => {this._sendTabToParent('build')}}>Build</a>}
                </div>
                {(this.state.tab === 'posts')?
                    <div className='flex items-center mr3'>
                        <i className="fa fa-search fa-lg mr2 white " aria-hidden="true"></i>
                        <input
                            className='br4 pa1 mr3 gray b--solid-ns b--black-40'
                            type='text'
                            placeholder='Search...'
                            onChange={(e) => this.setState({searchText: e.target.value})}
                        />
                        <button
                            className='br4 pa1 b--smodin-red bg-smodin-red fw6'
                            onClick={this._sendSearchTextToParent}>
                            Search
                        </button>
                    </div>
                    : null }
                {(this.state.tab === 'schedule')?
                    <div className='inline-flex'>
                        <div className='self-center fw6 white mr3 '>
                            <span className='mr2'>Schedule</span>
                            <span>Type:</span>
                        </div>
                        {(this.state.scheduleType === 'monthly')?
                            <div className='scheduletypebutton-chosen scheduletypebuttonleft fw6 pa2'>Monthly</div>
                            :<div className='scheduletypebutton scheduletypebuttonleft fw6 pa2'
                                  onClick={() => {this._sendScheduleTypeToParent('monthly')}}>Monthly</div>}
                        {(this.state.scheduleType === 'weekly')?
                            <div className='scheduletypebutton-chosen scheduletypebuttonright fw6 pa2 mr3'>Weekly</div>
                            :<div className='scheduletypebutton scheduletypebuttonright fw6 pa2 mr3'
                                  onClick={() => {this._sendScheduleTypeToParent('weekly')}}>Weekly</div>}
                    </div>
                    : null }
            </div>
        )
    }
    _sendSearchTextToParent = () => {
        this.props.receiveSearchText(this.state.searchText)
    }
    _sendTabToParent = async (tab) => {
        await this.setState({ tab: tab })
        this.props.receiveTab(tab)
    }
    _sendScheduleTypeToParent = async (scheduleType) => {
        await this.setState({ scheduleType: scheduleType })
        this.props.receiveScheduleType(scheduleType)
    }
}

/*
const ALL_LINKS_SEARCH_QUERY = gql`
  query AllLinksSearchQuery($searchText: String!) {
    allLinks(filter: {
      OR: [{
        url_contains: $searchText
      }, {
        description_contains: $searchText
      }]
    }) {
      id
      url
      description
      createdAt
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
        }
      }
    }
  }
`
*/
export default Search
