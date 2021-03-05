import React, {useContext, useCallback, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook"
import {AuthContext} from "../context/AuthContext"
import {useHistory, useParams} from "react-router-dom"
import {useMessage} from "../hooks/message.hook"
import jwtDecode from "jwt-decode"
import {Loader} from "../components/Loader"
import {BookUpdate} from "../components/BookUpdate"


export const UpdatePage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const message = useMessage()
    const bookId = useParams().id
    const [book, setBook] = useState(null)
    const {loading, request, error, clearError} = useHttp()
    const {exp} = jwtDecode(auth.token)

    const expirationTime = (exp * 1000) - 360000

    if (Date.now() >= expirationTime) {
        auth.logout()
        history.push('/')
    }

    const updateHandler = async (event, form) => {
        event.preventDefault()
        try {
            const data = await request(`/api/book/update/${bookId}`, 'POST', {...form}, {
                Authorization: `Bearer ${auth.token}`
            })
            history.push(`/detail/${bookId}`)
        } catch (e) {
        }
    }

    const getBook = useCallback(async ()=>{
        try {
            const fetched =  await request(`/api/book/${bookId}`, 'GET', null, {
                Authorization: `Bearer ${auth.token}`
            })
            setBook(fetched)
        } catch (e) {}
    }, [request, bookId])

    useEffect(() => {
        message(error)
        clearError()
        getBook()
        window.M.updateTextFields()
    }, [error, message, clearError, getBook])

    if(loading) {
        return <Loader />
    }

    return (
        <>
            {!loading && book && <BookUpdate book={book} updateHandler={updateHandler} loading={loading} />}
        </>
    )
}