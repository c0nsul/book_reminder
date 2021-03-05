import React,{useState, useCallback,useContext, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook"
import {AuthContext} from "../context/AuthContext"
import {Loader} from "../components/Loader"
import {BookCard} from "../components/BookCard"
import jwtDecode from "jwt-decode"
import {useHistory} from "react-router-dom"

export const DetailPage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [book, setBook] = useState(null)
    const bookId = useParams().id
    const history = useHistory()
    const { exp } = jwtDecode(token)
    const expirationTime = (exp * 1000) - 360000

    if (Date.now() >= expirationTime) {
        token.logout()
        history.push('/')
    }


    const updateHandler = async (event,id,chapter) => {
        event.preventDefault()
        try {
            await request(`/api/book/updatestat/${id}`, 'POST', {last_readed_chapter:chapter}, {
                Authorization: `Bearer ${token}`
            })
            history.push('/mybooks')
        } catch (e) {}
    }

    const getBook = useCallback(async ()=>{
        try {
            const fetched =  await request(`/api/book/${bookId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setBook(fetched)
        } catch (e) {}
    }, [token, request, bookId])

    useEffect(() => {
        getBook()
        window.M.updateTextFields()
    }, [getBook])

    if(loading) {
        return <Loader />
    }

    return (
        <>
            {!loading && book && <BookCard book={book} updateHandler={updateHandler} loading={loading} />}
        </>
    )
}