import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useVaultContext } from './contexts/vault-context';
import { useElectronService } from './services/electron';
import DirectorySelectionView from './views/DirectorySelectionView';
import VideoDashboardView from './views/VideoDashboardView';

export default function App() {
  const { onElectronMessage } = useElectronService();
  const vault = useVaultContext();

  onElectronMessage('directory-picker', (arg) => {
    if (typeof arg === 'string') {
      vault.setPath(arg);
    }
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<VideoDashboardView />} />
        <Route path="/vault" element={<DirectorySelectionView />} />
      </Routes>
    </Router>
  );
}
