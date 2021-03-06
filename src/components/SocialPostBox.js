import React, { Component } from 'react'
import { gql, graphql, compose } from 'react-apollo'

class SocialPostBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editingParameter: false,
            tab: 'socialpostexamples'
        }
    }
    render() {
        const SocialPostExamplesArray = () => {
            if (this.props.allSocialPostExamplesQuery.allSocialPostExamples && this.props.allSocialPostExamplesQuery.allSocialPostExamples.loading)
                return(
                    <div
                        className='social-post-example' >loading...</div>
                )
            if (this.props.allSocialPostExamplesQuery.allSocialPostExamples && this.props.allSocialPostExamplesQuery.allSocialPostExamples.error)
                return(
                    <div
                        className='social-post-example' >Error</div>
                )
            if (this.props.allSocialPostExamplesQuery.allSocialPostExamples)
                return this.props.allSocialPostExamplesQuery.allSocialPostExamples.map((SocialPost, index) => (
                        <div
                            key={index}
                            className='social-post-example' >{SocialPost.message}</div>
                    ))
            return null
        }
        const SocialPostIdeasArray = () => {
            if (this.props.allSocialPostIdeasQuery.allSocialPostIdeas && this.props.allSocialPostIdeasQuery.allSocialPostIdeas.loading)
                return (
                    <div
                        className='social-post-idea' >loading...</div>
                )
            if (this.props.allSocialPostIdeasQuery.allSocialPostIdeas && this.props.allSocialPostIdeasQuery.allSocialPostIdeas.error)
                return (
                    <div
                        className='social-post-idea' >Error</div>
                )
            if (this.props.allSocialPostIdeasQuery.allSocialPostIdeas)
                return this.props.allSocialPostIdeasQuery.allSocialPostIdeas.map((SocialPost, index) => (
                        <div
                            key={index}
                            className='social-post-idea' >{SocialPost.idea}</div>
                    ))
            return null
        }
        return (
            <div className='flexbox-parent-console overflow-hidden'>
                <div className='b--light-gray bw2 b--solid flex-auto bg-white pa2 overflow-auto'>
                    {(this.state.tab === 'socialpostexamples') ?
                        <SocialPostExamplesArray />
                        :<SocialPostIdeasArray />}
                </div>
                <div className='flex bg-gray w25p '>
                    <div className='flex vertical-lr'>
                        {(this.state.tab === 'socialpostexamples')?
                            <div className='post-side-tab-chosen flex-1'>Examples</div>
                            :<div className='post-side-tab flex-1 ' onClick={(e)=>this.setState({tab: 'socialpostexamples'})}>Examples</div>}
                        {(this.state.tab === 'socialpostideas')?
                            <div className='post-side-tab-chosen flex-1'>Ideas</div>
                            :<div className='post-side-tab flex-1 ' onClick={(e)=>this.setState({tab: 'socialpostideas'})}>Ideas</div>}

                    </div>
                </div>
            </div>
        )
    }
}

const ALL_SOCIAL_POST_EXAMPLES_QUERY = gql`
  query AllSocialPostExamplesQuery ($industryId: ID!) {
    allSocialPostExamples (filter:{
        industries_some: {
            id: $industryId
            }
        }){
          id
          message
        }}`
const ALL_SOCIAL_POST_IDEAS_QUERY = gql`
  query AllSocialPostIdeasQuery ($industryId: ID!) {
    allSocialPostIdeas (filter:{
        industries_some: {
            id: $industryId
            }
        }){
          id
          idea
        }}`
export default compose(
    graphql(ALL_SOCIAL_POST_EXAMPLES_QUERY, {
        name: 'allSocialPostExamplesQuery',
        options: (ownProps) => {
            const industryId = ownProps.selectedIndustryId
            return {
                variables: { industryId: industryId }
            }}}),
    graphql(ALL_SOCIAL_POST_IDEAS_QUERY, {
        name: 'allSocialPostIdeasQuery',
        options: (ownProps) => {
            const industryId = ownProps.selectedIndustryId
            return {
                variables: { industryId: industryId }
            }}})
)(SocialPostBox)
