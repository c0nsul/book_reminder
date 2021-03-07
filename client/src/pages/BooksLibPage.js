import React, {useState, useContext, useCallback, useEffect} from 'react'
import {useHttp} from "../hooks/http.hook"
import {AuthContext} from "../context/AuthContext"
import {Loader} from "../components/Loader"
import {BooksLib} from "../components/BooksLib"
import jwtDecode from "jwt-decode"
import {useHistory} from "react-router-dom"
import {useMessage} from "../hooks/message.hook";

export const BooksLibPage = () => {
    const history = useHistory()
    const [books, setBooks] = useState([])
    const [reload, setReload] = useState(false)
    const {loading, request} = useHttp()
    const {token, role} = useContext(AuthContext)
    const { exp } = jwtDecode(token)
    const expirationTime = (exp * 1000) - 360000
    const message = useMessage()

    if (Date.now() >= expirationTime) {
        history.push('/')
    }

    const addHandler = async (event, id) => {
        event.preventDefault()
        try {
            await request(`/api/book/add/${id}`, 'POST', null, {
                Authorization: `Bearer ${token}`
            })
            setReload(true)
        } catch (e) {}
    }

    const fetchBooks = useCallback(async () => {
        try {
            const fetched = await request('/api/book/bookslib', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            message(fetched.message)
            setBooks(fetched)
            setReload(false)
        } catch (e) {}
    }, [token, request,message])

    useEffect(() => {
        fetchBooks()
    }, [fetchBooks, reload])

    if (loading){
        return <Loader />
    }
    return (
        <>
            {!loading && <BooksLib books={books} admin={role} addHandler={addHandler} />}
        </>
    )
}