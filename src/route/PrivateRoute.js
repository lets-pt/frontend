import React from 'react'
import { Route, Navigate } from 'react-router-dom'

function PrivateRoute({ element: Element, isLoggedIn, ...rest }) {
  // 로그인되어 있을 때만 페이지를 허용하고, 그렇지 않으면 로그인 페이지로 리디렉션합니다.
  return isLoggedIn ? (
    <Route {...rest} element={<Element />} />
  ) : (
    <Navigate to="/login" />
  )
}

export default PrivateRoute
