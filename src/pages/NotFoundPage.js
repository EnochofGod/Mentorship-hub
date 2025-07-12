import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/', { replace: true });
  }, [navigate]);
  return null;
}

export default NotFoundPage;