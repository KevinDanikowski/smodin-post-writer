import React, { Component } from 'react'
import { graphql, gql, compose } from 'react-apollo'
import { findAllParametersInString } from '../utils'
import SocialPostWithCSS from './SocialPostWithCSS'
import TextareaAutosize from 'react-autosize-textarea'
import axios from 'axios'
import Dropzone from 'react-dropzone'

class SocialPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: this.props.socialPost.message,
            postChanged: false,
            editing: false,
            imageFile: []
        }
    }
    _clickToEdit() {
        this.textarea.focus()
    }
    render() {
        return (
            <div className='socialpostbox mt1'>
                <div className='socialpostboxtop justify-end'>
                    {(!this.state.editing) ?
                        <div className='ml4 mb2 mt2 flex-auto pointer'
                             onClick={async ()=>{await this.setState({editing: true}); this._clickToEdit()}}>
                            <SocialPostWithCSS
                                allParametersQuery={this.props.allParametersQuery}>{this.state.message}</SocialPostWithCSS>
                        </div>
                        :<div className='ml4 mb2 mt2 flex-auto'>
                            <TextareaAutosize
                                onBlur={() => {this.setState({ editing: false})}}
                                type='text'
                                className='socialpostboxresponse'
                                innerRef={(input)=>{this.textarea=input}}
                                value={this.state.message}
                                onChange={(e) => { this.setState({ message: e.target.value}); (this.props.socialPost.message !== e.target.value) ?  this.setState({ postChanged: true }) : this.setState({ postChanged: false })}}/>
                        </div>
                    }
                    {(this.state.postChanged) ?
                        <div className='socialpostboxeditbutton socialpostboxeditbutton-edit'>
                            <a className='ma2' onClick={this._updateSocialPost}>E</a>
                        </div>
                        :<div className='socialpostboxeditbutton socialpostboxeditbutton-no-edit'>
                            <a className='ma2'>E</a>
                        </div>}
                    <div className='socialpostboxdeletebutton'>
                        <a className='ma2' onClick={this._deleteSocialPost}>X</a>
                    </div>
                </div>
                <div className='ml4 mr4 mt1 mb2 '>
                    {(this.props.allParametersQuery.loading) ?
                        <p className='pa0 ma0'><strong>Generating Your Messages.....</strong></p>
                        :
                        <p className='pa0 ma0'><strong className='user-select-n'>Rewrite: </strong>{findAllParametersInString(this.props.socialPost.message, '{{', '}}', this.props.allParametersQuery.allParameters)} </p>
                    }
                    <input type='file' name='ImageStyle'/>
                </div>
                <div>
                    <Dropzone
                        onDrop={this.onDrop.bind(this)}
                        className='bg-red'
                        activeClassName='bg-green'
                        multiple={false}>
                        <div>Drag and drop that bitch</div>
                    </Dropzone>
                    {(this.state.imageFile.length > 0)?
                        <div>{this.state.imageFile.map((file) => <img src={file.preview}/>)}</div> : null}
                </div>
            </div>
        )
    }
    _deleteSocialPost = () => {
        const id = this.props.socialPost.id
        this.props.deleteSocialPost(id)
    }
    _updateSocialPost = () => {
        const id = this.props.socialPost.id
        const newMessage = this.state.message
        this.props.updateSocialPost(id, newMessage)
        this.setState({ postChanged: false })
    }
    onDrop(imageFile) {
        this.setState({
            imageFile: imageFile
        })
        console.log(imageFile)
    }
    _onImageFileUpload = (files) => {
        this.file = files[0]
        let data = new FormData()
        data.append('data', files[0])
        axios.post('https://api.graph.cool/file/v1/cj8adz6qz09jy0105s1gkdpoy', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then(response => {
            console.log('file upload response', response)
        })
    }
}
const ADD_SOCIAL_POST_IMAGE_MUTATION = gql`
    mutation AddSocialPostImageMutation($socialPostId: ID!, $secret: String!, $name: String!, $size: Int!, $url: String!, $contentType: String!){
        createSocialPostImage(socialPostId: $socialPostId, secret: $secret, name: $name, size: $size, url: $url, contentType: $contentType){
            id secret name size url contentType
    }
}`
export default compose(
    graphql(ADD_SOCIAL_POST_IMAGE_MUTATION, {name: 'addSocialPostImageMutation'})
)(SocialPost)


/*
RELEVANT LINKS
https://www.graph.cool/docs/reference/graphql-api/file-management-eer4wiang0/#current-limitations
https://github.com/graphcool/content/issues/95
https://github.com/graphcool/framework/blob/master/server/backend-api-system/src/main/scala/cool/graph/system/mutations/AddFieldMutation.scala
https://github.com/HriBB/graphql-server-express-upload
https://www.npmjs.com/package/apollo-upload-client
https://css-tricks.com/image-upload-manipulation-react/
https://react-dropzone.js.org/
https://stackoverflow.com/questions/38349421/react-dropzone-image-preview-not-showing

 */