import React, {useState} from 'react'

export const BookCard = ({book, updateHandler, loading}) => {
    const [chapter, setChapter] = useState(book.last_readed_chapter)
    const changeHandler = event => {
        setChapter(event.target.value)
    }
    const progress = ((book.last_readed_chapter * 100)/book.total).toFixed(0)

    return (
        <>
            <h4>{book.book}</h4>
            <p>Author:  <strong>{book.author}</strong></p>
            <p>Book link: <a href={book.link} target="_blank" rel="noopener noreferrer">{book.link}</a></p>
            <p>Last author's chapter:  <span>{book.max_available_chapter}</span></p>
            <p>Total:  <span>{book.total}</span></p>
            <p>Added: <strong>{new Date(book.date).toLocaleDateString()}</strong></p>
            <br/>
            <h4>Your reading progress:</h4>

            <div className="row">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <div>
                            <div className="input-field">
                                <input
                                    required="1"
                                    placeholder="Chapter num"
                                    id="last_readed_chapter"
                                    type="text"
                                    name="last_readed_chapter"
                                    className="yellow-input"
                                    value={chapter}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="book">Last chapter you read</label>

                                <button
                                    className="btn yellow darken-4"
                                    style={{marginRight:10}}
                                    onClick={(e)=>updateHandler(e, book.item_id, chapter)}
                                    disabled={loading}
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p>Overall read progress: <strong>{progress}%</strong></p>
        </>
    )
}