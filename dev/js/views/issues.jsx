var React = require('react'),
    $ = require('jquery');

var Issue = React.createClass({
    getCreationDate : function (date) {
        return date.substring(0,10);
    },
    render : function () {

        var issue = this.props.issue;

        return (
            <div className="issue-container">
                <div className="avatar-container">
                    <img className="avatar" src={issue.user.avatar_url}/>
                </div>
                <div className="issue-content">
                    <div className="issue-label">
                        <a
                            href={'#issues/' +
                            this.props.userName + '/' +
                            this.props.repoName + '/' +
                            issue.number}>
                            {issue.title}
                        </a>
                    </div>
                    <div className="issue-user">
                        <span className="user-login">{issue.user.login}(<a href={issue.user.html_url}>{issue.user.html_url}</a>)</span>
                    </div>
                    <div className="issue-details">
                        <div className="issue-number">
                            <span>#: </span><span>{issue.number}</span>
                        </div>
                        <div className="issue-date">
                            <span>Date: </span><span>{this.getCreationDate(issue.created_at)}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = React.createClass({
    render : function () {
        var issues = this.props.issues.map(function(value){
            return (
                <Issue
                    key={value.id}
                    issue={value}
                    userName={this.props.userName}
                    repoName={this.props.repoName}/>
            )
        }.bind(this));
        if(issues.length)
            return (
                <div className="issues-container">
                    {issues}
                </div>
            );
        else {
            return (
                <div className="issues-container">
                    <div className="alert">
                        There is nothing to show.
                        Please enter proper user name and repository,
                        after that, click "Get issues" button
                    </div>
                </div>
            )
        }
    }
});