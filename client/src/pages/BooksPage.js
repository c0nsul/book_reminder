import React, {useState, useContext, useCallback, useEffect} from 'react'
import {useHttp} from "../hooks/http.hook"
import {AuthContext} from "../context/AuthContext"
import {Loader} from "../components/Loader"
import {BooksList} from "../components/BookList"
import jwtDecode from "jwt-decode"
import {useHistory} from "react-router-dom";
import {useMessage} from "../hooks/message.hook";


export const BooksPage = () => {
    const history = useHistory()
    const [books, setBooks] = useState([])
    const [reload, setReload] = useState(false)
    const {loading, request} = useHttp()
    const auth = useContext(AuthContext)
    const token = auth.token
    const message = useMessage()
    const { exp } = jwtDecode(token)
    const expirationTime = (exp * 1000) - 360000

    if (Date.now() >= expirationTime) {
        auth.logout()
        history.push('/')
    }

    const delHandler = async (event,id) => {
        event.preventDefault()
        try {
            await request(`/api/book/delete/${id}`, 'POST', null, {
                Authorization: `Bearer ${token}`
            })
            setReload(true)
        } catch (e) {}
    }

    const fetchBooks = useCallback(async () => {
        try {
            const fetched = await request('/api/book/mybooks', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            message(fetched.message)
            setBooks(fetched)
            setReload(false)
        } catch (e) {}
    }, [token, request, message])

    useEffect(() => {
        fetchBooks()
    }, [fetchBooks, reload])

    if (loading){
        return <Loader />
    }
    return (
        <>
            {!loading && <BooksList books={books} delHandler={delHandler} />}
        </>
    )
}