﻿var Board = React.createClass({
    loadCommentsFromServer: function() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", this.props.url, true);
        xhr.onload = function() {
            const data = JSON.parse(xhr.responseText);
            this.setState({ comments: data });
        }.bind(this);
        xhr.send();
    },

    handleCommentSubmit: function(comment) {
        const comments = this.state.comments;
        const newComments = comments.concat([comment]);
        this.setState({ comments: newComments });

        const data = new FormData();
        data.append("Author", comment.Author);
        data.append("Text", comment.Text);

        const xhr = new XMLHttpRequest();
        xhr.open("post", this.props.submitUrl, true);
        xhr.onload = function() {
            this.loadCommentsFromServer();
        }.bind(this);
        xhr.send(data);
    },

    getInitialState: function() {
        return { comments: this.props.initialData };
    },

    componentDidMount: function() {
        window.setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },

    render: function() {
        return (
            <div className="board">
              <h1>Comments</h1>
              <CommentList comments={this.state.comments} editUrl={this.props.editUrl} deleteUrl={this.props.deleteUrl}/>
              <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
           </div>
        );
    }
});


var CommentList = React.createClass({
    handleCommentEdit: function(newText, id) {
        const data = new FormData();
        data.append("text", newText);
        data.append("id", id);

        const xhr = new XMLHttpRequest();
        xhr.open("post", this.props.editUrl + "/" + id, true);
        xhr.send(data);
        const arr = this.props.comments;
        arr[id].Text = newText;
        this.setState({ comments: arr });
    },

    handleCommentDelete: function(id) {
        const data = new FormData();
        data.append("id", id);
        const xhr = new XMLHttpRequest();
        xhr.open("post", this.props.deleteUrl + "/" + id, true);
        xhr.send(data);
        const arr = this.props.comments;
        arr.splice(id, 1);
        this.setState({ comments: arr });
    },

    eachComment: function(comment, i) {
        return (<Comment author={comment.Author} key={i} index={i} editUrl={this.props.editUrl} deleteUrl={this.props.deleteUrl} updateCommentText={this.handleCommentEdit} deleteCommentText={this.handleCommentDelete}>
                  {comment.Text}
                </Comment>);
    },

    render: function() {
        const commentNodes = this.props.comments.map(this.eachComment);
        return (<div className="commentList">
                  {commentNodes}
                </div>
        );
    }
});

var Comment = React.createClass({
    getInitialState: function() {
        return { editing: false };
    },
    edit: function() {
        this.setState({ editing: true });
    },
    remove: function() {
        this.props.deleteCommentText(this.props.index);
    },
    save: function() {
        this.props.updateCommentText(this.refs.newText.value, this.props.index);
        this.setState({ editing: false });
    },

    renderNormal: function() {
        const converter = new Showdown.converter();
        const rawMarkup = converter.makeHtml(this.props.children.toString());
        return (
            <div className="commentContainer">
               <h2 className="commentAuthor">{this.props.author}</h2>
               <span className="commentText" dangerouslySetInnerHTML={{ __html: rawMarkup }}></span>
               <br />
               <button onClick={this.edit} className="btn-primary">Edit</button>
               <button onClick={this.remove} className="btn-danger">Remove</button>
            </div>
        );
    },

    renderForm: function() {
        return (
            <div className="commentContainer">
              <h2 className="commentAuthor">{this.props.author}</h2>
              <textArea ref="newText" defaultValue={this.props.children}></textArea>
              <button onClick={this.save} className="btn-success">Save</button>
            </div>
        );
    },

    render: function() {
        if (this.state.editing) {
            return this.renderForm();
        } else {
            return this.renderNormal();
        }
    }
});

var CommentForm = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        const author = this.refs.author.value.trim();
        const text = this.refs.text.value.trim();
        if (!text || !author) {
            return;
        }
        this.props.onCommentSubmit({ Author: author, Text: text });
        this.refs.author.value = "";
        this.refs.text.value = "";
        return;
    },
    render: function() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
              <p><strong>Post a comment</strong></p>
              <input size="50" type="text" placeholder="Author name" ref="author"/>
              <input size="50" type="text" placeholder="Say something..." ref="text"/>
              <input type="submit" value="Post"/>
            </form>
        );
    }
});
var data = [
    { Author: "Daniel Lo Nigro", Text: "Hello ReactJS.NET World!" },
    { Author: "Pete Hunt", Text: "This is one comment" },
    { Author: "Jordan Walke", Text: "This is *another* comment" }
];

//ReactDOM.render(
//  <Board url="/comments" submitUrl="/comments/new" pollInterval={2000} />,
//  document.getElementById('content')
//);