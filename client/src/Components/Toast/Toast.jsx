import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';
import './Toast.scss';

const ToastContext = createContext(null);

let idSeq = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback((message, opts = {}) => {
    const id = ++idSeq;
    const toast = {
      id,
      message,
      variant: opts.variant || 'info',
      duration: opts.duration ?? 4000,
    };
    setToasts((prev) => [...prev, toast]);
    return id;
  }, []);

  const api = {
    show,
    success: (m, o) => show(m, { ...o, variant: 'success' }),
    error:   (m, o) => show(m, { ...o, variant: 'error' }),
    info:    (m, o) => show(m, { ...o, variant: 'info' }),
    dismiss,
  };

  if (typeof window !== 'undefined') {
    window.__toast = api;
  }

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="toast-container" role="region" aria-live="polite">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onClose={() => dismiss(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onClose }) {
  useEffect(() => {
    if (!toast.duration) return;
    const t = setTimeout(onClose, toast.duration);
    return () => clearTimeout(t);
  }, [toast.duration, onClose]);

  const Icon = toast.variant === 'success'
    ? FaCheckCircle
    : toast.variant === 'error'
      ? FaExclamationCircle
      : FaInfoCircle;

  return (
    <div className={`toast toast--${toast.variant}`} role="status">
      <span className="toast__icon" aria-hidden="true"><Icon /></span>
      <span className="toast__msg">{toast.message}</span>
      <button className="toast__close" onClick={onClose} aria-label="Dismiss">
        <FaTimes />
      </button>
    </div>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    return {
      show: (m) => { if (typeof window !== 'undefined') window.alert(m); },
      success: (m) => { if (typeof window !== 'undefined') window.alert(m); },
      error: (m) => { if (typeof window !== 'undefined') window.alert(m); },
      info: (m) => { if (typeof window !== 'undefined') window.alert(m); },
      dismiss: () => {},
    };
  }
  return ctx;
}

export function toast(message, opts) {
  if (typeof window !== 'undefined' && window.__toast) {
    return window.__toast.show(message, opts);
  }
  if (typeof window !== 'undefined') window.alert(message);
}
toast.success = (m, o) => toast(m, { ...o, variant: 'success' });
toast.error   = (m, o) => toast(m, { ...o, variant: 'error' });
toast.info    = (m, o) => toast(m, { ...o, variant: 'info' });
