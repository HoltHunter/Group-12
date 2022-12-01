import React from "react"
import UserCard from "./UserCard"

class List extends React.Component {
    renderList() {
        return (this.props.data.map((user) => (
            <div>{user.id}</div>
        )))
    }

    render() {
        return (
            <div className="ui relaxed divided list">
                { this.renderList }
            </div>
        )
    }
}

export default List
