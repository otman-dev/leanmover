import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

interface SyncStatus {
  inProgress: boolean;
  lastReason: string;
  lastStarted: Date | null;
  lastCompleted: Date | null;
  lastError: string | null;
  lastStats: any;
}

/**
 * Hook to monitor RAG sync status and show completion notifications
 */
export function useRagSyncMonitor() {
  const lastCheckedRef = useRef<Date | null>(null);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const wasInProgressRef = useRef(false);

  useEffect(() => {
    const checkSyncStatus = async () => {
      try {
        const response = await fetch('/api/admin/sync-status');
        if (!response.ok) return;
        
        const status: SyncStatus = await response.json();
        
        // If sync just finished (was in progress, now it's not)
        if (wasInProgressRef.current && !status.inProgress) {
          if (status.lastError) {
            // Sync failed
            toast.error('Échec de la synchronisation RAG', {
              description: `Erreur: ${status.lastError}`,
              duration: 7000,
            });
          } else if (status.lastCompleted) {
            // Sync succeeded
            const duration = status.lastStats?.duration 
              ? `en ${(status.lastStats.duration / 1000).toFixed(1)}s`
              : '';
            toast.success('Synchronisation RAG terminée!', {
              description: `✅ ${status.lastStats?.success || 0} éléments indexés ${duration}`,
              duration: 5000,
            });
          }
          
          // Stop polling after completion
          if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current);
            pollingIntervalRef.current = null;
          }
        }
        
        wasInProgressRef.current = status.inProgress;
        
        // If sync is in progress and we're not polling yet, start polling
        if (status.inProgress && !pollingIntervalRef.current) {
          pollingIntervalRef.current = setInterval(checkSyncStatus, 2000); // Check every 2 seconds
        }
      } catch (error) {
        console.error('Error checking sync status:', error);
      }
    };

    // Check immediately on mount and after any content changes
    checkSyncStatus();

    // Cleanup polling on unmount
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, []);

  return null;
}

/**
 * Start monitoring RAG sync (call this after triggering a sync operation)
 */
export function startRagSyncMonitoring() {
  // Initial check to start polling
  fetch('/api/admin/sync-status').catch(() => {});
}
