import React, {useEffect, useState} from 'react'

export const BookUpdate = ({book, updateHandler, loading}) => {
    const [form, setForm] = useState(book)
    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }
    //console.log(form)

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    return (
        <div className="row">
            <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                    <span className="card-title">Update book: </span>
                    <p>&nbsp;</p>
                    <div>
                        <div className="input-field">
                            <input
                                required="1"
                                placeholder="Book"
                                id="book"
                                type="text"
                                name="book"
                                className="yellow-input"
                                value={form.book}
                                onChange={changeHandler}
                            />
                            <label htmlFor="book">Book</label>
                        </div>

                        <div className="input-field">
                            <textarea
                                required="1"
                                placeholder="Short description"
                                id="desc"
                                rows="20"
                                cols="20"
                                name="desc"
                                defaultValue={form.desc}
                                className="yellow-input"
                                onChange={changeHandler}
                            >
                            </textarea>
                            <label htmlFor="book">Short description</label>
                        </div>

                        <div className="input-field">
                            <input
                                placeholder="Author"
                                id="author"
                                type="text"
                                name="author"
                                className="yellow-input"
                                value={form.author}
                                onChange={changeHandler}
                            />
                            <label htmlFor="author">Author</label>
                        </div>


                        <div className="input-field">
                            <input
                                placeholder="Link"
                                id="link"
                                type="text"
                                name="link"
                                className="yellow-input"
                                value={form.link}
                                onChange={changeHandler}
                            />
                            <label htmlFor="link">Link</label>
                        </div>

                        <div className="input-field">
                            <input
                                placeholder="Last author's chapter"
                                id="max_available_chapter"
                                type="text"
                                name="max_available_chapter"
                                className="yellow-input"
                                value={form.max_available_chapter}
                                onChange={changeHandler}
                            />
                            <label htmlFor="max_available_chapter">Last author's chapter</label>
                        </div>

                        <div className="input-field">
                            <input
                                placeholder="Total chapters (if book was finished by author)"
                                id="total"
                                type="text"
                                name="total"
                                className="yellow-input"
                                value={form.total}
                                onChange={changeHandler}
                            />
                            <label htmlFor="total">Total chapters</label>
                        </div>
                    </div>
                </div>
                <div className="card-action">
                    <button
                        className="btn yellow darken-4"
                        style={{marginRight: 10}}
                        onClick={(e)=>updateHandler(e, form)}
                        disabled={loading}
                    >
                        Update
                    </button>


                </div>
            </div>
        </div>
    )
}
