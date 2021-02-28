import React, {useState, useContext, useCallback, useEffect} from 'react'
import {useHttp} from "../hooks/http.hook"
import {AuthContext} from "../context/AuthContext"
import {Loader} from "../components/Loader"
import {BooksLib} from "../components/BooksLib"
import jwtDecode from "jwt-decode"
import {useHistory} from "react-router-dom"

export const BooksLibPage = () => {
    const history = useHistory()
    const [books, setBooks] = useState([])
    const [reload, setReload] = useState(false)
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const { exp } = jwtDecode(token)
    const expirationTime = (exp * 1000) - 360000

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

         console.log(id)
    }

    const fetchBooks = useCallback(async () => {
        try {
            const fetched = await request('/api/book/bookslib', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setBooks(fetched)
            setReload(false)
        } catch (e) {}
    }, [token, request])

    useEffect(() => {
        fetchBooks()
    }, [fetchBooks, reload])

    if (loading){
        return <Loader />
    }
    return (
        <>
            {!loading && <BooksLib books={books} addHandler={addHandler} />}
        </>
    )
}