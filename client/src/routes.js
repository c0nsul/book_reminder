import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {BooksPage} from "./pages/BooksPage"
import {BooksLibPage} from "./pages/BooksLibPage"
import {CreatePage} from "./pages/CreatePage"
import {DetailPage} from "./pages/DetailPage"
import {AuthPage} from "./pages/AuthPage"
import {UpdatePage} from "./pages/UpdatePage"
import {HomePage} from "./pages/HomePage"
import {AuthorPage} from "./pages/AuthorPage"


export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/author/:id" exact>
                    <AuthorPage />
                </Route>
                <Route path="/home" exact>
                    <HomePage />
                </Route>
                <Route path="/mybooks" exact>
                    <BooksPage />
                </Route>
                <Route path="/booksLib" exact>
                    <BooksLibPage />
                </Route>
                <Route path="/create" exact>
                    <CreatePage />
                </Route>
                <Route path="/update/:id" >
                    <UpdatePage />
                </Route>
                <Route path="/detail/:id">
                    <DetailPage />
                </Route>
                <Redirect to="/home" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}