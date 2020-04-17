import React, { Component } from 'react';
import axios from '../../../axios';
import { Route } from 'react-router-dom';

import'./Posts.css';
import Post from '../../../components/Post/Post'
import FullPost from '../FullPost/FullPost';

class Posts extends Component {
    state = {
        posts: [],
        error: false,
    }
    
    componentDidMount () {
        console.log(this.props);
        axios.get('/posts')
        .then(response => {
            const posts = response.data.result.slice(0, 4);
            const updatedPosts = posts.map(post => {
                return {
                    ...post,
                    author: 'Max'
                }
            })
            // console.log(response.data.result);
            this.setState({posts: updatedPosts});
        })
        .catch(error => {
            console.log(error);
            this.setState({error: true});
        });
    }

    postSelectedHandler = (id) => {
        // this.props.history.push({pathname: '/posts/' + id}); 
        this.props.history.push('/posts/' + id); 
    }

    render() {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong</p>;
        if(!this.state.error){
            posts = this.state.posts.map(post => {
                return (
                    // <Link to={'/posts/' + post.id} key={post.id} >
                        <Post 
                            key={post.id}
                            title={post.title} 
                            author={post.author} 
                            clicked={() => this.postSelectedHandler(post.id)}
                            /> 
                    // </Link>
                );
            });
            if(this.state.posts.length === 0){
                posts = <p style={{textAlign: 'center'}}>Loading...</p>;
            }
        }
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + "/:id"} exact component={FullPost} />
            </div>
        );
    };
};

export default Posts;