var React = require('react');

var ListView = React.createClass({
    selectItem : function (e) {
        this.props.setValue(e.target.getAttribute('data-value'));
        this.props.expand();
        e.stopPropagation();
    },
    getHtmlItem : function (index, value, clickCallback) {
        return (
            <div
                key={index}
                className="list-item"
                onClick={clickCallback}
                data-value={value}>
                {value}
            </div>
        )
    },
    getItems : function () {
        return this.props.items
            .map(function(value, index) {
                return this.getHtmlItem(index, value, this.selectItem);
            }.bind(this))
    },
    render : function () {
        var items = this.getItems();
        items = items.length ? items : this.getHtmlItem(0, 'Nothing to show', null);
        return (
            <div className="combo-box--list" data-hidden={!this.props.expanded}>
                {items}
            </div>
        )
    }
});

var EditBox = React.createClass({
    onExpandButtonClick: function () {
        this.props.expand();
    },
    onChangeValue: function (e) {
        this.props.setValue(e.target.value, e.target);
        this.props.expand(true);
    },
    componentDidUpdate: function(props) {
        if(this.props.expected != this.props.value){
            var textBox = React.findDOMNode(this.refs.textBox);
            textBox.setSelectionRange(props.value.length + 1, textBox.value.length);
        }
    },
    render : function () {
        return (
            <div className="combo-box--edit">
                <input
                    ref="textBox"
                    type="text"
                    value={this.props.expected}
                    onChange={this.onChangeValue}
                    lostFocus={this.onLostFocus}/>
                <span
                    onClick={this.onExpandButtonClick}>
                    ▾
                </span>
            </div>
        )
    }
});

module.exports = React.createClass({
    getInitialState : function () {
        return {
            filteredItems   : [],
            listExpanded    : false,
            currentValue    : '',
            expectedValue   : ''
        }
    },
    expandList : function (value) {
        this.setState({
            listExpanded: value == undefined ? !this.state.listExpanded : value
        });
    },
    setValue : function (value) {
        var items = this.filterItems(value, this.props.items),
            expectedValue;
        if(items[0] && this.state.currentValue.length < value.length)
            expectedValue = items[0];
        this.setState({
            filteredItems   : items,
            currentValue    : value,
            expectedValue   : expectedValue || value
        });
        this.props.onChange(expectedValue || value);
    },
    filterItems : function (currentValue, items) {
        currentValue = currentValue || '';
        return items
            .filter(function(value) {
                return currentValue.length != 0 ? value.indexOf(currentValue) == 0 : true;
            }.bind(this))
            .sort(function(val1, val2) {
                return currentValue.length != 0 ? val1.length < val2.length : true;
            })
    },
    componentWillReceiveProps(nexProps) {
        if(this.props.items != nexProps.items)
            this.setState({filteredItems : this.filterItems('', nexProps.items)});
    },
    render : function () {
        return (
            <div className="combo-box">
               <EditBox
                    expected={this.state.expectedValue}
                    expand={this.expandList}
                    value={this.state.currentValue}
                    setValue={this.setValue}/>
               <ListView
                    items={this.state.filteredItems}
                    currentValue={this.state.currentValue}
                    expanded={this.state.listExpanded}
                    setValue={this.setValue}
                    expand={this.expandList}/>
            </div>
        )
    }
});