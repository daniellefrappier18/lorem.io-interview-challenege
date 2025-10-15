import React, { forwardRef, useState } from 'react';
import styles from './Chat.module.css';
import { Label } from '../label/Label';
import { ModeModal } from './ModeModal';

export const Chat = forwardRef<HTMLTextAreaElement, ChatProps>(
  ({ placeholder, onSend, onModeChange, initialMode = 'standard', ...props }, ref) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMode, setSelectedMode] = useState<'standard' | 'fast'>(initialMode);

    const handleModeSelect = (mode: 'standard' | 'fast') => {
      setSelectedMode(mode);
      onModeChange?.(mode);
    };

    const handleSendClick = () => {
      if (ref && 'current' in ref && ref.current) {
        const message = ref.current.value;
        if (message.trim()) {
          onSend(message);
          ref.current.value = '';
        }
      }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendClick();
      }
    };

    return (
      <div className={styles.chatContainer}>
        <Label size="sm" className={styles.label}>
          Effortless conversations and refined insights that are engaging and refined with detail
        </Label>

        <div className={styles.inputContainer}>
          <div className={styles.placeholderText}>{placeholder}</div>

          <textarea
            ref={ref}
            className={styles.input}
            onKeyPress={handleKeyPress}
            rows={4}
            {...props}
          />

          <div className={styles.bottomControls}>
            <div className={styles.leftButtonGroup}>
              <button type="button" className={styles.iconButton} aria-label="Attach file or image">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5a2.5 2.5 0 0 1 5 0v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5a2.5 2.5 0 0 0 5 0V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.31 2.69 6 6 6s6-2.69 6-6V6h-2.5z" />
                </svg>
              </button>

              <button
                type="button"
                className={styles.iconButton}
                onClick={() => setIsModalOpen(true)}
                aria-label="Select response mode - currently set to standard mode"
                aria-expanded={isModalOpen}
                aria-haspopup="dialog"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                </svg>
              </button>
            </div>

            <button
              type="button"
              className={styles.sendButton}
              onClick={handleSendClick}
              aria-label="Send message"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
              </svg>
            </button>
          </div>
        </div>

        <ModeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onModeSelect={handleModeSelect}
          selectedMode={selectedMode}
        />
      </div>
    );
  },
);

export interface ChatProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onSend'> {
  placeholder: string;
  onSend: (message: string) => void;
  onModeChange?: (mode: 'standard' | 'fast') => void;
  initialMode?: 'standard' | 'fast';
}
