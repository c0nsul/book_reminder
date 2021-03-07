import React,{useState, useCallback,useContext, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook"
import {AuthContext} from "../context/AuthContext"
import {Loader} from "../components/Loader"
import {BookCard} from "../components/BookCard"
import jwtDecode from "jwt-decode"
import {useHistory} from "react-router-dom"
import {useMessage} from "../hooks/message.hook";

export const DetailPage = () => {
    const auth = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [book, setBook] = useState(null)
    const bookId = useParams().id
    const history = useHistory()
    const { exp } = jwtDecode(auth.token)
    const expirationTime = (exp * 1000) - 360000
    const message = useMessage()

    if (Date.now() >= expirationTime) {
        auth.logout()
        history.push('/')
    }

    const updateHandler = async (event,id,chapter) => {
        event.preventDefault()
        try {
            await request(`/api/book/updatestat/${id}`, 'POST', {last_readed_chapter:chapter}, {
                Authorization: `Bearer ${auth.token}`
            })
            history.push('/mybooks')
        } catch (e) {}
    }

    const getBook = useCallback(async ()=>{
        try {
            const fetched =  await request(`/api/book/${bookId}`, 'GET', null, {
                Authorization: `Bearer ${auth.token}`
            })
            message(fetched.message)
            setBook(fetched)
        } catch (e) {}
    }, [auth.token, request, bookId, message])

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