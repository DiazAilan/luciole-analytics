import { useState } from 'react';
import type { TaskRow } from './types';
import { FileInput } from './components/FileInput';
import { AnalyticsReports } from './components/AnalyticsReports';
import { useAnalytics } from './hooks/useAnalytics';
import styles from './App.module.scss';

function App() {
  const [tasks, setTasks] = useState<TaskRow[]>([]);
  const [error, setError] = useState('');
  const analytics = useAnalytics(tasks);

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>Évaluation Charge DS-RTE</h1>
        <p className={styles.subtitle}>Analytics &amp; Rapports</p>
      </header>

      <main className={styles.main}>
        <FileInput
          onLoad={(data) => {
            setTasks(data);
            setError('');
          }}
          onError={setError}
        />

        {error && (
          <div className={styles.error} role="alert">
            {error}
          </div>
        )}

        {analytics && <AnalyticsReports data={analytics} />}
      </main>
    </div>
  );
}

export default App;
