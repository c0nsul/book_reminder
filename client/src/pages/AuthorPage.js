import React, {useState, useContext, useCallback, useEffect} from 'react'
import {useHttp} from "../hooks/http.hook"
import {Loader} from "../components/Loader"
import {AuthContext} from "../context/AuthContext"
import {useMessage} from "../hooks/message.hook"
import {useHistory, useParams} from "react-router-dom"
import {AuthorCard} from "../components/AuthorCard"
import jwtDecode from "jwt-decode";


export const AuthorPage = () => {
    const message = useMessage()
    const history = useHistory()
    const authorId = useParams().id
    const auth = useContext(AuthContext)
    const token = auth.token
    const {request, loading} = useHttp()
    const [author, setAuthor] = useState(null)
    const [books, setBooks] = useState(null)
    const { exp } = jwtDecode(token)
    const expirationTime = (exp * 1000) - 360000

    if (Date.now() >= expirationTime) {
        auth.logout()
        history.push('/')
    }


    const getAuthor = useCallback(async ()=>{
        try {
            const found =  await request(`/api/author/${authorId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            message(found.message)
            const authorData = found.map(item=>item.author)
            setAuthor(authorData[0])

            const booksData = found.map(item=>item.books)
            setBooks(booksData[0])

        } catch (e) {}
    }, [token, request, authorId, message])

    useEffect(() => {
        getAuthor()
        window.M.updateTextFields()
    }, [getAuthor])

    if(loading) {
        return <Loader />
    }

    return (
        <>
            {!loading && author && <AuthorCard author={author} books={books} />}
        </>
    )
}
