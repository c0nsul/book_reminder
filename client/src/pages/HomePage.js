import React, {useState, useContext, useCallback, useEffect} from 'react'
import {useHttp} from "../hooks/http.hook"
import {Loader} from "../components/Loader"
import {HomeBooks} from "../components/HomeBooks"
import {HomeAuthors} from "../components/HomeAuthors"
import {AuthContext} from "../context/AuthContext"
import {useMessage} from "../hooks/message.hook"
import jwtDecode from "jwt-decode"
import {useHistory} from "react-router-dom"

export const HomePage = () => {
    const message = useMessage()
    const history = useHistory()
    const [books, setBooks] = useState([])
    const [authors, setAuthors] = useState([])
    const auth = useContext(AuthContext)
    const {loading, request} = useHttp()
    let booksData = []
    let authorsData = []
    const { exp } = jwtDecode(auth.token)
    const expirationTime = (exp * 1000) - 360000

    if (Date.now() >= expirationTime) {
        auth.logout()
        history.push('/')
    }

    const fetchBooks = useCallback(async () => {
        try {
            const dataRow = await request('/api/book/bookslib', 'GET', null, {
                Authorization: `Bearer ${auth.token}`
            })
            message(dataRow.message)
            dataRow.map(
                (data)=>{
                    booksData.push({'name': data.name, 'id':data._id})
                    //check is author already exist in array
                    let isInArray = authorsData.find(item => item.name === data.author_id.name)
                    if (typeof isInArray === 'undefined'){
                        authorsData.push({'name':data.author_id.name, 'id': data.author_id._id})
                    }
                }
            )
            setBooks(booksData)
            setAuthors(authorsData)
        } catch (e) {}
    }, [auth.token, request, message])

    useEffect(() => {
        fetchBooks()
    }, [fetchBooks])

    if (loading){
        return <Loader />
    }
    return (
        <>
            <div className="row">
                <div className="col s12">
                    <h3 className="header">Last added</h3>
                    <p className="caption ">Last materials added to site.</p>
                </div>
                {!loading && <HomeBooks books={books}  />}
                {!loading && <HomeAuthors authors={authors}  />}
            </div>
        </>
    )
}