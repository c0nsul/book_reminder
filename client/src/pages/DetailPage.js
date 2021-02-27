import React,{useState, useCallback,useContext, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook"
import {AuthContext} from "../context/AuthContext"
import {Loader} from "../components/Loader"
import {BookCard} from "../components/BookCard"

export const DetailPage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [book, setBook] = useState(null)
    const bookId = useParams().id

    const getBook = useCallback(async ()=>{
        try {
            const fetched=  await request(`/api/book/${bookId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setBook(fetched)
        } catch (e) {}
    }, [token, bookId, request])

    useEffect(() => {
        getBook()
    }, [getBook])

    if(loading) {
        return <Loader />
    }

    return (
        <>
            {!loading && book && <BookCard book={book} />}
        </>
    )
}