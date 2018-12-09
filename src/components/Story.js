import React from "react";
import moment from "moment";
import client from "../client";
import Comment from "./Comment";

class Story extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            expandedComments: false,
            fetchedComments: false,
            fetchingComments: false,
            comments: []
        }
    }

    fetchComments = async () => {
        if(this.state.fetchedComments || this.state.fetchingComments) return;

        this.setState({
            fetchingComments: true
        });

        const comments = await client.fetchComments(this.props.kids);

        this.setState({
            fetchComments: false,
            fetchedComments: true,
            comments
        });
    }

    expandComments = () => {
        this.setState({
            expandedComments: !this.state.expandedComments
        });

        if(!this.state.fetchedComments && !this.state.fetchingComments) this.fetchComments();
    }

    render() {
        const {title, score, time, by, descendants, url, index} = this.props;
        return (
            <React.Fragment>
                <div className="media text-muted pt-3">
                    <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                        <strong className="d-block text-gray-dark">{index + 1}. <a href={url} target="_blank" rel="noopener noreferrer" className="cursor-pointer">{title}</a></strong>
                        {score} points by {by} {moment.unix(time).fromNow()} | <span onClick={this.expandComments} className="cursor-pointer">{descendants} comments</span>
                    </p>
                </div>
                {this.state.expandedComments && <div className="comments">
                    {this.state.fetchedComments ? (
                        <React.Fragment>
                            {this.state.comments.map(comment => <Comment {...comment} key={comment.id} />)}
                        </React.Fragment>
                    ) : <p>Loading...</p> }
                </div>}
            </React.Fragment>
        );
    }
}

export default Story;