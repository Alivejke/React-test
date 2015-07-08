var React = require('react'),
    _ = require('underscore'),
    $ = require('jquery'),
    ComboBox = require('./combobox.jsx');

module.exports = React.createClass({

    mixins: [React.addons.LinkedStateMixin],

    getInitialState : function () {
        return {
            userName    : '',
            repoName    : '',
            itemsCount  : '30',
            repos       : []
        };
    },
    submit : function () {
        this.props.submit({
            userName    : this.state.userName,
            repoName    : this.state.repoName,
            itemsCount  : this.state.itemsCount
        })
    },
    onLoadRepositoryListSuccess : function (data) {
        var repos = data.map(function (value) {
            return value.name;
        });
        this.setState({'repos' : repos});
    },
    onLoadRepositoryListFail : function () {
        this.setState({'repos' : []})
    },
    getReposList : function () {
        var ajax = $.get('https://api.github.com/users/' +
            this.state.userName + '/repos?per_page=100');
        ajax.done(this.onLoadRepositoryListSuccess);
        ajax.fail(this.onLoadRepositoryListFail);
    },
    componentWillMount : function () {
        this.getReposList = _.debounce(this.getReposList, 500);
    },
    componentDidUpdate : function (prevProps, prevState) {
        if(prevState.userName != this.state.userName)
            this.getReposList(this.state.userName);
    },
    render: function () {

        var userNameLink = this.linkState('userName'),
            repoNameLink = this.linkState('repoName'),
            itemsCountLink = this.linkState('itemsCount');

        var userNameOnChange = function (e) {
            userNameLink.requestChange(e.target.value);
        };

        var repoNameOnChange = function (e) {
            repoNameLink.requestChange(e);
        };

        var itemsCountOnChange = function (e) {
            itemsCountLink.requestChange(e.target.options[e.target.options.selectedIndex].value);
        };

        return (
            <div className="search-box">
                <div className="search-box--group">
                    <div className="wrapper"><span>User name:</span></div>
                    <div className="wrapper">
                        <input
                            placeholder="Enter the user name"
                            type="text"
                            value={userNameLink.value}
                            onChange={userNameOnChange}/>
                    </div>
                    <div className="wrapper"><span>Repository:</span></div>
                    <div className="wrapper">
                        <ComboBox
                            items={this.state.repos}
                            onChange={repoNameOnChange}/>
                    </div>
                    <div className="wrapper"><span>Items count:</span></div>
                    <div className="wrapper">
                        <select
                            ref="itemsCount"
                            value={itemsCountLink.value}
                            onChange={itemsCountOnChange}>
                            <option>10</option>
                            <option>20</option>
                            <option>30</option>
                        </select>
                    </div>

                    <div className="wrapper">
                        <button onClick={this.submit}>Get issues</button></div>
                </div>
            </div>
        )
    }
});
