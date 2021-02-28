import React from "react"

export const BookCard = ({book}) => {
    return (
        <>
            <h4>{book.book}</h4>
            <p>Author:  <strong>{book.author}</strong></p>
            <p>Book link: <a href={book.link} target="_blank" rel="noopener noreferrer">{book.link}</a></p>
            <p>Last author's chapter:  <span>{book.max_available_chapter}</span></p>
            <p>Last chapter you read:  <span>{book.bolast_readed_chapterok}</span></p>
            <p>Total:  <span>{book.total}</span></p>
            <p>Overall read progress:  <span>???</span></p>
            <p>Creation date: <strong>{new Date(book.date).toLocaleDateString()}</strong></p>
        </>
    )
}