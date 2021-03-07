import React from 'react'

export const AuthorCard = ({author}) => {

    return (
        <>
            <h4>{author.name}</h4>
            <p>Author: <strong>{author.name}</strong></p>
             <br/>

        </>
    )
}