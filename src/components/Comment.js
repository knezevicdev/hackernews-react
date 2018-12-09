import React from "react";
import moment from "moment";

class Comment extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            expanded: true
        }
    }

    toggleExpanded = () => {
        this.setState({
            expanded: !this.state.expanded
        });
    }

    render() {
        const {text, by, time} = this.props;

        return (
            <div className="card mb-1 mt-1">
                <div className="card-body p-1 pl-3">
                    <div className="row">
                        <div className="col-md-12">
                            <p>
                                <strong>{by} {moment.unix(time).fromNow()} {this.props.kids.length > 0 && (this.state.expanded ? <span onClick={this.toggleExpanded} className="cursor-pointer">[-]</span> : <span onClick={this.toggleExpanded} className="cursor-pointer">[+{this.props.kids.length}]</span>)}</strong>
                            </p>
                            <div dangerouslySetInnerHTML={{
                                __html: text
                            }}></div>
                        </div>
                    </div>
                    {
                        this.state.expanded && this.props.kids.map(comment => <Comment {...comment} key={comment.id} />)
                    }
                </div>
            </div>
        );
    }
}

export default Comment;