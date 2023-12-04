import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('token'); // JWT 토큰 확인
  return token ? <Outlet /> : <Navigate to="/login" />; // 토큰이 있으면 해당 라우트를, 없으면 로그인 페이지로 리디렉션
};

export default ProtectedRoute;