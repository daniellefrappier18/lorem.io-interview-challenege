import React, { useEffect, useRef } from 'react';
import styles from './ModeModal.module.css';

export interface ModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onModeSelect: (mode: 'standard' | 'fast') => void;
  selectedMode: 'standard' | 'fast';
}

export const ModeModal: React.FC<ModeModalProps> = ({
  isOpen,
  onClose,
  onModeSelect,
  selectedMode,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const firstOptionRef = useRef<HTMLButtonElement>(null);
  const lastOptionRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );

        if (focusableElements && focusableElements.length > 0) {
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleModeSelect = (mode: 'standard' | 'fast') => {
    onModeSelect(mode);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent, mode: 'standard' | 'fast') => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleModeSelect(mode);
    }
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose} aria-hidden="true" />
      <div
        className={styles.modal}
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className={styles.modalHeader}>
          <h2 id="modal-title" className={styles.modalTitle}>
            Select Response Mode
          </h2>
          <button
            ref={closeButtonRef}
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>

        <p id="modal-description" className={styles.visuallyHidden}>
          Choose between standard mode for detailed responses or fast mode for quick responses
        </p>

        <button
          ref={firstOptionRef}
          className={styles.modeOption}
          onClick={() => handleModeSelect('standard')}
          onKeyDown={(e) => handleKeyDown(e, 'standard')}
          aria-pressed={selectedMode === 'standard'}
          aria-describedby="standard-desc"
        >
          <div className={styles.modeHeader}>
            <span className={styles.modeTitle}>Standard mode</span>
            {selectedMode === 'standard' && (
              <svg
                className={styles.checkIcon}
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-label="Selected"
              >
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            )}
          </div>
          <p id="standard-desc" className={styles.modeDescription}>
            More detailed responses with deeper analysis
          </p>
        </button>

        <button
          ref={lastOptionRef}
          className={styles.modeOption}
          onClick={() => handleModeSelect('fast')}
          onKeyDown={(e) => handleKeyDown(e, 'fast')}
          aria-pressed={selectedMode === 'fast'}
          aria-describedby="fast-desc"
        >
          <div className={styles.modeHeader}>
            <span className={styles.modeTitle}>Fast mode</span>
            {selectedMode === 'fast' && (
              <svg
                className={styles.checkIcon}
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-label="Selected"
              >
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            )}
          </div>
          <p id="fast-desc" className={styles.modeDescription}>
            Shorter responses, optimized for speed
          </p>
        </button>
      </div>
    </>
  );
};
