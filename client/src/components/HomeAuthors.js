import React from 'react'
import {Link} from "react-router-dom"

export const HomeAuthors = ({authors}) => {

    return (
        <div className="col s12 m6">
            <table>
                <thead>
                <tr>
                    <th>Authors</th>
                </tr>
                </thead>
                <tbody>
                {authors.length   ?
                   authors.map((author, index)=>{
                    return (
                        <tr key={author.id}>
                            <td><Link to={`/author/${author.id}`} >{author.name}</Link></td>
                        </tr>
                    )}
                ) : (
                        <tr><td>No new authors</td></tr>
                )}
                </tbody>
            </table>
        </div>
    )
}