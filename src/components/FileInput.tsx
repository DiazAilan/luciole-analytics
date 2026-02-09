import { useCallback, useRef } from 'react';
import type { TaskRow } from '../types';
import { parseCSV } from '../utils/csvParser';
import styles from './FileInput.module.scss';

interface FileInputProps {
  onLoad: (tasks: TaskRow[]) => void;
  onError?: (message: string) => void;
}

export function FileInput({ onLoad, onError }: FileInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!file.name.toLowerCase().endsWith('.csv')) {
        onError?.('Veuillez sélectionner un fichier CSV.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (!text) {
          onError?.('Impossible de lire le fichier.');
          return;
        }
        try {
          const tasks = parseCSV(text);
          if (tasks.length === 0) {
            onError?.('Aucune donnée valide trouvée dans le fichier.');
            return;
          }
          onLoad(tasks);
          onError?.('');
        } catch (err) {
          onError?.(err instanceof Error ? err.message : 'Erreur de parsing.');
        }
      };
      reader.onerror = () => onError?.('Erreur lors de la lecture du fichier.');
      reader.readAsText(file, 'UTF-8');

      if (inputRef.current) inputRef.current.value = '';
    },
    [onLoad, onError]
  );

  const handleClick = () => inputRef.current?.click();

  return (
    <div className={styles.wrapper}>
      <input
        ref={inputRef}
        type="file"
        accept=".csv"
        onChange={handleFile}
        className={styles.hidden}
        aria-label="Choisir un fichier CSV"
      />
      <button type="button" onClick={handleClick} className={styles.button}>
        <span className={styles.icon}>📂</span>
        Importer un fichier CSV
      </button>
      <p className={styles.hint}>
        Format attendu : colonnes Tâche, Catégorie, Sprint
      </p>
    </div>
  );
}
