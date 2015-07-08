var React       = require('react'),
    $           = require('jquery'),
    SearchBox   = require('./search-box.jsx'),
    Pagination  = require('./pagination.jsx'),
    Issues      = require('./issues.jsx');

var MainContainer = React.createClass({

    getInitialState: function () {
        return {
            issuesNumberOnPage : 0,
            currentPage : 1,
            totalIssuesCount : 0,
            issues : [],
            dataLoading : false,
            repo : {
                userName : '',
                repoName : ''
            }
        }
    },

    setClearedState : function () {
        this.setState({
            'issues' : [],
            'currentPage' : 1,
            'totalIssuesCount' : 0
        })
    },

    onLoadIssuesFail : function () {
        this.setClearedState();
        this.setState({'dataLoading' : false});
    },

    onLoadRepositoryDataFail : function () {
        this.setClearedState();
        this.setState({'dataLoading' : false});
    },

    onLoadIssuesSuccess : function (data) {
        this.setState({'issues' : data});
        this.setState({'dataLoading' : false});
    },

    getIssues: function (pageNumber) {
        this.setState({'dataLoading' : true});
        var ajax = $.get('https://api.github.com/repos/' +
            this.state.repo.userName + '/' +
            this.state.repo.repoName + '/issues?page=' +
            pageNumber + '&per_page=' +
            this.state.issuesNumberOnPage
        );
        ajax.done(this.onLoadIssuesSuccess);
        ajax.fail(this.onLoadIssuesFail);
    },

    onLoadRepositoryDataSuccess : function (data) {
        this.setState({'dataLoading' : false});
        this.setState({
            'totalIssuesCount': data.open_issues_count,
            'repo':{
                userName:data.owner.login,
                repoName:data.name
            }
        });
        this.getIssues();
    },

    getRepositoryData : function (repo) {
        var ajax = $.get('https://api.github.com/repos/' +
            repo.userName + '/' +
            repo.repoName);
        this.setState({'issuesNumberOnPage' : repo.itemsCount});
        this.setState({'dataLoading' : true});
        ajax.done(this.onLoadRepositoryDataSuccess);
        ajax.fail(this.onLoadRepositoryDataFail);
    },

    loadPage : function (pageNumber) {
        this.setState({'currentPage':parseInt(pageNumber)});

    },

    componentDidUpdate : function(prevProps, prevState) {
        if(prevState.currentPage != this.state.currentPage) {
            this.getIssues(this.state.currentPage);
        }
    },

    render: function () {
        var pagesCount = parseInt(this.state.totalIssuesCount / this.state.issuesNumberOnPage);
        pagesCount = pagesCount < this.state.totalIssuesCount / this.state.issuesNumberOnPage ?
                        pagesCount + 1 :
                        pagesCount;
        return (
            <div className="main-container">
                <SearchBox
                    repo={this.state.repo}
                    submit={this.getRepositoryData}/>
                <div className="data-container">
                    <div className="data-loading" data-hidden={!this.state.dataLoading}>
                        <span className="caption">Data is loading...</span>
                    </div>
                    <Pagination
                        pagesCount={pagesCount}
                        currentPage={this.state.currentPage}
                        pageSelect={this.loadPage}/>
                    <Issues
                        repoName={this.state.repo.repoName}
                        userName={this.state.repo.userName}
                        issues={this.state.issues}/>
                </div>
            </div>
        )
    }
});

module.exports = MainContainer;