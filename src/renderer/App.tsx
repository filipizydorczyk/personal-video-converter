import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import { useVaultContext } from './contexts/vault-context';
import { useElectronService } from './services/electron';
import DirectorySelectionView from './views/DirectorySelectionView';
import VideoDashboardView from './views/VideoDashboardView';

export default function App() {
  const { onElectronMessage, sendElectronMessage } = useElectronService();
  const vault = useVaultContext();

  onElectronMessage('directory-picker', (arg) => {
    if (typeof arg === 'string') {
      vault.setPath(arg);
    }
  });

  const windowCloseHandler = () => sendElectronMessage('window-close', []);
  const windowMaxHandler = () => sendElectronMessage('window-max', []);
  const windowMinHandler = () => sendElectronMessage('window-min', []);

  return (
    <>
      <TopBar
        onClose={windowCloseHandler}
        onMax={windowMaxHandler}
        onMin={windowMinHandler}
      />
      <Router>
        <Routes>
          <Route path="/" element={<VideoDashboardView />} />
          <Route path="/vault" element={<DirectorySelectionView />} />
        </Routes>
      </Router>
    </>
  );
}
