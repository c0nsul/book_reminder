import React from "react"
import {Link} from "react-router-dom"

export const BooksList = ({books, delHandler}) => {
    if (!books.length){
        return <p className="center">No books yet</p>
    }

    return (
        <table>
            <thead>
            <tr>
                <th>N</th>
                <th>Book<br/>Author</th>
                <th>Total<br/>Available</th>
                <th>Your chapter</th>
                <th>URL</th>
                <th>URL</th>
                <th>Action</th>
            </tr>
            </thead>

            <tbody>

            {books.map((book, index)=>{
                return (
                    <tr key={book._id}>
                        <td>{index +1}</td>
                        <td style={{width:250}}>{book.book}<br/>{book.author}</td>
                        <td>{book.total}<br/>{book.max_available_chapter}</td>
                        <td>{book.last_readed_chapter}</td>
                        <td><a href={book.link} target="_blank" rel="noopener noreferrer" className="waves-effect waves-light btn-small">Read</a></td>
                        <td><Link to={`/detail/${book._id}`} className="waves-effect waves-light btn-small">details</Link></td>
                        <td><button onClick={(e)=>delHandler(e,book._id)} className="waves-effect waves-light red btn-small">Del</button></td>
                    </tr>
                )
            })}

            </tbody>
        </table>
    )
}