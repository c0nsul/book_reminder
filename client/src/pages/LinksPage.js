import React, {useState, useContext, useCallback, useEffect} from 'react'
import {useHttp} from "../hooks/http.hook"
import {AuthContext} from "../context/AuthContext"
import {Loader} from "../components/Loader"
import {LinksList} from "../components/LinksList"
import jwtDecode from "jwt-decode"
import {useHistory} from "react-router-dom";


export const LinksPage = () => {
    const history = useHistory()
    const [links, setLinks] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const { exp } = jwtDecode(token)
    const expirationTime = (exp * 1000) - 360000

    if (Date.now() >= expirationTime) {
        token.logout()
        history.push('/')
    }

    const fetchLinks = useCallback(async () => {
        try {
            const fetched = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(fetched)
        } catch (e) {
            console.log(token)
        }
    }, [token, request])

    useEffect(() => {
        fetchLinks()
    }, [fetchLinks])

    if (loading){
        return <Loader />
    }
    return (
        <>
            {!loading && <LinksList links={links} />}
        </>
    )
}