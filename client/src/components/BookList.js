import React from "react"
import {Link} from "react-router-dom"

export const BooksList = ({books}) => {
    if (!books.length){
        return <p className="center">No books yet</p>
    }
    return (
        <table>
            <thead>
            <tr>
                <th>N</th>
                <th>Book</th>
                <th>Author</th>
                <th>Total</th>
                <th>Last chapter readed</th>
                <th>Last chapter available</th>
                <th>URL</th>
                <th>URL</th>
            </tr>
            </thead>

            <tbody>

            {books.map((book, index)=>{
                return (
                    <tr key={book._id}>
                        <td>{index +1}</td>
                        <td>{book.book}</td>
                        <td>{book.author}</td>
                        <td>{book.total}</td>
                        <td>{book.last_readed_chapter}</td>
                        <td>{book.max_available_chapter}</td>
                        <td><a href={book.link} target="_blank" rel="noopener noreferrer">Read</a></td>
                        <td><Link to={`/detail/${book._id}`}>Details</Link></td>
                    </tr>
                )
            })}

            </tbody>
        </table>
    )
}