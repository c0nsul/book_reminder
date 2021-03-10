import React from 'react'
import {Link} from "react-router-dom";

export const AuthorCard = ({author, books}) => {

    return (
        <>
            <h5>Author: <strong>{author.name}</strong></h5>
             <br/>

            <table>
                <thead>
                <tr>
                    <th>Books</th>
                </tr>
                </thead>
                <tbody>
                {books && books.length   ?
                    books.map((book)=>{
                            return (
                                <tr key={book._id}>
                                    <td><Link to={`/detail/${book._id}`} >{book.name}</Link></td>
                                </tr>
                            )
                        }
                    ) : (
                        <tr><td>No books</td></tr>
                    )}


                </tbody>
            </table>

        </>
    )
}