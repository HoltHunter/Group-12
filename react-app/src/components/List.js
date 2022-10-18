import React from "react";
import UserCard from "./UserCard";


class List extends React.Component {
    
    renderList() {
        return (this.props.data.map((user) => {
            return (
                <div>{user.id}</div>
            )
        }))
        // return 
        // return { this.props.data.map(( user ) => {
        //     return (
        //         <div key={ user.id } className="item">
        //             <UserCard 
        //                 user={ user } 
        //                 onRequest={ this.props.sendRequest }
        //             />
        //         </div>
        //     );
        // })}
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