import React from "react"

class SearchBar extends React.Component {
    state = { 
        searchTerm: "",
        debouncedTerm: ""
    }

    onChange = (event) => {
        this.setState({ searchTerm: event.target.value })

        const timeoutId = setTimeout(() => {
            this.setState({ debouncedTerm: this.state.searchTerm }, () => {
                this.props.onFormSubmit(this.state.debouncedTerm)        
            })
        }, 500);

        return () => {
            clearTimeout(timeoutId)
        }
    }

    // NOTE: Technically, there is a bug here, because hitting the Enter key
    // will trigger onFormSubmit. The onChange event will fire ~500ms later.
    // The result is the same - no change in state - so it shouldn't affect
    // the UX, but technically this is a bug.
    onFormSubmit = (event) => {
        event.preventDefault()

        this.setState({ debouncedTerm: this.state.searchTerm }, () => {
            this.props.onFormSubmit(this.state.debouncedTerm)        
        })
    }

    render() {
        return(
            <div className="search-bar ui segment">
                <form onSubmit={ this.onFormSubmit } className="ui form">
                    <div className="field">
                        <label>{this.props.searchLabel}</label>
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            value={ this.state.term }
                            onChange={
                                event => this.onChange(event)
                            }
                        />
                    </div>
                </form>
            </div>
        )
    }
}

export default SearchBar