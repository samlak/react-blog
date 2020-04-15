import React, { Component } from 'react';
import axios from 'axios';

import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 643,
        submitted: 0
    }

    postDataHandler = () => {
        const data = {
            title: this.state.title,
            body: this.state.content,
            user_id: this.state.author
        };
        axios.post('/posts', data)
            .then(response => {
                this.setState({submitted: response.status});
                console.log(response.data)

            });
    }

    submittedToggle = () => {
        this.setState({submitted: 0});
    }

    render () {
        let createPost = (
            <div className="NewPost">
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="643">Max</option>
                    <option value="645">Manu</option>
                </select>
                <button onClick={this.postDataHandler}>Add Post</button>
            </div>
        );
        if(this.state.submitted){
            createPost = (
                <div className="NewPost">
                    <p style={{textAlign: 'center'}}>Post created successfully.</p>
                    <button onClick={this.submittedToggle}>Add A New Post</button>
                </div>
            );
            if(this.state.submitted !== 200){
                createPost = (
                    <div className="NewPost">
                        <p style={{textAlign: 'center'}}>Error encountered. Please try again.</p>
                        <button onClick={this.submittedToggle}>Add A New Post</button>
                    </div>
                );
            }
        }
        return createPost
    }
}

export default NewPost;