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