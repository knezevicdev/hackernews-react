import axios from "axios";

function fetchTopStoriesList() {
    return axios.get(`https://hacker-news.firebaseio.com/v0/topstories.json`);
}

function fetchStory(id) {
    return axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
}

function fetchStories(storiesIds) {
    return axios.all(storiesIds.map(storyId => fetchStory(storyId)))
}

async function fetchComments(commentsIds) {
    const fetchedComments = await fetchStories(commentsIds);
    let comments = [];

    for(let i = 0; i < fetchedComments.length; i++) {
        let comment = fetchedComments[i].data;
        if(comment === null) continue;
        comment.kids = comment.kids ? await fetchComments(comment.kids) : [];
        comments.push(comment);
    }

    return comments;
}

export default {
    fetchTopStoriesList,
    fetchStories,
    fetchComments
}