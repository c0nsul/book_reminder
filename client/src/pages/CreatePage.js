import React, {useEffect, useState, useContext} from 'react'
import {useHttp} from "../hooks/http.hook"
import {AuthContext} from "../context/AuthContext"
import {useHistory} from "react-router-dom"
import {useMessage} from "../hooks/message.hook"
import jwtDecode from "jwt-decode"


export const CreatePage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const message = useMessage()
    const [form, setForm] = useState({
        author: '', book: '', link: '', max_available_chapter: '', last_readed_chapter: ''
    })
    const {loading, request, error, clearError} = useHttp()
    const { exp } = jwtDecode(auth.token)

    const expirationTime = (exp * 1000) - 360000

    if (Date.now() >= expirationTime) {
        auth.logout()
        history.push('/')
    }

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message,clearError])

    //fix css and design after start page (labels + names)
    useEffect(()=> {
        window.M.updateTextFields()
    })

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }


    const createHandler = async event => {
            try {
               const data = await request('/api/book/create', 'POST', {...form}, {
                   Authorization: `Bearer ${auth.token}`
               })
                message(data.message)
                history.push(`/detail/${data.newBook._id}`)
            } catch (e) {}
    }

    return (
        <div className="row">
            <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                    <span className="card-title">Create new book reminder</span>
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
                            <input
                                required="1"
                                placeholder="Short description"
                                id="desc"
                                type="text"
                                name="desc"
                                className="yellow-input"
                                value={form.desc}
                                onChange={changeHandler}
                            />
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
                                placeholder="Last chapter you read"
                                id="last_readed_chapter"
                                type="text"
                                name="last_readed_chapter"
                                className="yellow-input"
                                value={form.last_readed_chapter}
                                onChange={changeHandler}
                            />
                            <label htmlFor="last_readed_chapter">Last chapter you read</label>
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
                            <label htmlFor="last_readed_chapter">Total chapters  </label>
                        </div>
                    </div>
                </div>
                <div className="card-action">
                    <button
                        className="btn yellow darken-4"
                        style={{marginRight:10}}
                        onClick={createHandler}
                        disabled={loading}
                    >
                        Create
                    </button>


                </div>
            </div>
        </div>
    )
}