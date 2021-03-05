import React from "react"
import {Link} from "react-router-dom"

export const BooksLib = ({books, addHandler, admin}) => {

    if (!books.length){
        return <p className="center">Library is empty</p>
    }

    return (
        <table>
            <thead>
            <tr>
                <th>N</th>
                <th>Book</th>
                <th>Author</th>
                <th>URL</th>
                <th>INFO</th>
                <th>Action</th>
            </tr>
            </thead>

            <tbody>

            {books.map((book, index)=>{
                return (
                    <tr key={book._id}>
                        <td>{index +1}</td>
                        <td>{book.book}</td>
                        <td>{book.author}</td>
                        <td><a href={book.link} target="_blank" rel="noopener noreferrer" className="waves-effect waves-light btn-small">Read</a></td>
                        <td><Link to={`/detail/${book._id}`} className="waves-effect waves-light btn-small">details</Link></td>

                        {book.exist  ? (
                            <td>Added</td>
                        ) : (
                            <td><button onClick={(e)=>addHandler(e,book._id)} className="waves-effect waves-light red btn-small">Add</button></td>
                        )}

                        {admin === 'admin' &&
                        <td><Link to={`/update/${book._id}`}
                                  className="waves-effect waves-light red btn-small">UPDATE</Link></td>
                        }

                    </tr>
                )
            })}

            </tbody>
        </table>
    )
}