import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

const run = async () => {
  if (import.meta.env.DEV) {
    const { worker } = await import('@/mocks/browser');
    await worker.start({ onUnhandledRequest: 'bypass' });
  }

  createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
};

run();
