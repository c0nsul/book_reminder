import React, {useState, useContext, useCallback, useEffect} from 'react'
import {useHttp} from "../hooks/http.hook"
import {AuthContext} from "../context/AuthContext"
import {Loader} from "../components/Loader"
import {BooksList} from "../components/BookList"
import jwtDecode from "jwt-decode"
import {useHistory} from "react-router-dom";


export const BooksPage = () => {
    const history = useHistory()
    const [books, setBooks] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const { exp } = jwtDecode(token)
    const expirationTime = (exp * 1000) - 360000

    if (Date.now() >= expirationTime) {
        token.logout()
        history.push('/')
    }

    const fetchBooks = useCallback(async () => {
        try {
            const fetched = await request('/api/book', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setBooks(fetched)
        } catch (e) {}
    }, [token, request])

    useEffect(() => {
        fetchBooks()
    }, [fetchBooks])

    if (loading){
        return <Loader />
    }
    return (
        <>
            {!loading && <BooksList books={books} />}
        </>
    )
}