import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client';
import App from './App';
import { VaultProvider } from './contexts/vault-context';
import { QueryClient, QueryClientProvider } from 'react-query';

const container = document.getElementById('root')!;
const root = createRoot(container);
const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <VaultProvider>
      <App />
    </VaultProvider>
  </QueryClientProvider>
);
