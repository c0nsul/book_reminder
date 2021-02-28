import React from "react"
import {Link} from "react-router-dom"

export const BooksList = ({books, token, request}) => {
    if (!books.length){
        return <p className="center">No books yet</p>
    }

    const delHandler = async (id) => {
        try {
            await request(`/api/book/delete/${id}`, 'POST', null, {
                Authorization: `Bearer ${token}`
            })

        } catch (e) {}
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
                        <td>{book.total}</td>
                        <td>{book.last_readed_chapter}</td>
                        <td>{book.max_available_chapter}</td>
                        <td><a href={book.link} target="_blank" rel="noopener noreferrer" className="waves-effect waves-light btn-small">Read</a></td>
                        <td><Link to={`/detail/${book._id}`} className="waves-effect waves-light btn-small">details</Link></td>
                        <td><button onClick={(e)=>delHandler(book._id)} className="waves-effect waves-light red btn-small">Del</button></td>
                    </tr>
                )
            })}

            </tbody>
        </table>
    )
}