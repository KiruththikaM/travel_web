import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './context/ThemeContext'
import { Provider } from 'react-redux'
import { store } from './store/Store.ts'
import { reloadFromStorage } from './store/slices/messagesSlice.ts'
import './index.css'
import App from './App.tsx'

window.addEventListener('storage', (e) => {
  if (e.key === 'admin_messages') {
    store.dispatch(reloadFromStorage());
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
