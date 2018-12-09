import React from "react";
import Story from "./Story";
import client from "../client";

class Stories extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            stories: [],
            loadedStories: [],
            fetching: false
        };
    }

    async componentDidMount() {
        const topStories = await client.fetchTopStoriesList();

        this.setState({
            stories: topStories.data
        });

        this.fetchNextPage();
    }

    fetchNextPage = async () => {
        const currentStories = this.state.stories;
        if(currentStories.length === 0 || this.state.fetching) return;

        this.setState({
            fetching: true
        });
        
        const nextItems = await client.fetchStories(currentStories.slice(0, 30));
        const stories = currentStories.slice(30);

        const loadedStories = this.state.loadedStories.concat(nextItems.map(item => item.data));

        this.setState({
            stories,
            loadedStories,
            fetching: false
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="stories" >
                    {this.state.loadedStories.map((story, index) => <Story {...story} key={story.id} index={index} />)}
                </div>
                <div>
                    {this.state.stories.length > 0 && <strong onClick={this.fetchNextPage} className="cursor-pointer">{this.state.fetching ? "Loading..." : "More"}</strong>}
                </div>
            </React.Fragment>
        );
    }
}

export default Stories;