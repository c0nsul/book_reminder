import React, {useState, useContext, useCallback, useEffect} from 'react'
import {useHttp} from "../hooks/http.hook"
import {Loader} from "../components/Loader"
import {AuthContext} from "../context/AuthContext"
import {useMessage} from "../hooks/message.hook"
import {useParams} from "react-router-dom"
import {AuthorCard} from "../components/AuthorCard"


export const AuthorPage = () => {
    const message = useMessage()
    const authorId = useParams().id
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [author, setAuthor] = useState(null)

    const getAuthor = useCallback(async ()=>{
        try {
            const found =  await request(`/api/author/${authorId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            message(found.message)
            setAuthor(found)
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
            {!loading && author && <AuthorCard author={author} />}
        </>
    )
}
