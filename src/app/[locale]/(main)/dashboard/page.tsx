'use client'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/modules/redux/hooks/reduxAppHooks';
import { fetchCurrentUserThunk } from '@/modules/redux/slices/user/thunk/user.thunk';

const DashboardPage = () => {
  const { user } = useAppSelector((state) => state.user);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  console.log("🚀 ~ DashboardPage ~ user:", user)

  useEffect(() => {
    if (!user) {
      dispatch(fetchCurrentUserThunk());
    }
  }, []);
  return (
    <div>DashboardPage</div>
  )
}

export default DashboardPage