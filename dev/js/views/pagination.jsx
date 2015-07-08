var React = require('react');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            firstPage   : 1,
            pagesCount  : 10
        }
    },
    componentWillReceiveProps : function (nextProps) {
        this.setState({
            'firstPage' : (parseInt((nextProps.currentPage - 1) / this.state.pagesCount)) * this.state.pagesCount + 1
        })
    },
    increasePagesNumbers : function () {
        if(this.state.firstPage + this.state.pagesCount <= this.props.pagesCount)
            this.setState({'firstPage' : this.state.firstPage + this.state.pagesCount})
    },
    decreasePagesNumbers : function () {
        if(this.state.firstPage != 1) {
            this.setState({'firstPage' : this.state.firstPage - this.state.pagesCount})
        }
    },
    pageSelect : function (e) {
        this.props.pageSelect(e.target.getAttribute('data-page-number'));
    },
    render : function () {
        var pages = [],
            firstPage = this.state.firstPage,
            lastPage = this.state.firstPage + 10;
            lastPage  = this.props.pagesCount >= lastPage ? lastPage : this.props.pagesCount;  
        for(var i = firstPage; i < lastPage; i++) {
            var className = i == this.props.currentPage ? 'page-number current' : 'page-number';
            pages.push((
                <span
                    key={i}
                    className={className}
                    data-page-number={i}
                    onClick={this.pageSelect}>{i}</span>
            ))
        }
        if(!this.props.pagesCount)
            return null;
        return (
            <div className="pagination-container">
                <span
                    className="page-number page-selector decrease"
                    onClick={this.decreasePagesNumbers}>
                    -
                </span>
                {pages}
                <span
                    className="page-number page-selector increase"
                    onClick={this.increasePagesNumbers}>
                    +
                </span>
            </div>
        )
    }
});
