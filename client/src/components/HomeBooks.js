import React from 'react'
import {Link} from "react-router-dom"

export const HomeBooks = ({books}) => {

    return (
        <div className="col s12 m6">
            <table>
                <thead>
                <tr>
                    <th>Books</th>
                </tr>
                </thead>
                <tbody>
                {books.length   ?
                    books.map((book)=>{
                        return (
                            <tr key={book.id}>
                                <td><Link to={`/detail/${book.id}`} >{book.name}</Link></td>
                            </tr>
                        )
                    }
                ) : (
                        <tr><td>No books</td></tr>
                )}


                </tbody>
            </table>
        </div>
    )
}
