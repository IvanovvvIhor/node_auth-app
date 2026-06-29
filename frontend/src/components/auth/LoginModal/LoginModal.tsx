import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { closeLoginModal, openRegisterModal, loginUser } from '../../../store/authSlice';
import { type AppDispatch } from '../../../store';

const LoginModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClose = () => {
    dispatch(closeLoginModal());
  };

  const switchToRegister = () => {
    dispatch(openRegisterModal());
  };

  const handleForgot = () => {
    handleClose();
    navigate('/forgot-password');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>&times;</button>
        <h2>Вхід у систему</h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Електронна пошта</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="form-helpers">
            <button type="button" className="link-btn" onClick={handleForgot}>
              Забули пароль?
            </button>
          </div>

          <button type="submit" className="btn-primary full-width">Увійти</button>
        </form>

        <p className="modal-footer">
          Немає акаунта? <button type="button" className="link-btn" onClick={switchToRegister}>Створити зараз</button>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
