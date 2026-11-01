import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../store';
import { setQuantity } from '../store/cartSlice';

export function useDebouncedQuantities(delay = 300) {
  const dispatch = useAppDispatch();
  const [drafts, setDrafts] = useState<Record<string, number>>({});
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const pending = useRef<Record<string, number>>({});

  const commit = useCallback((id: string) => {
    const quantity = pending.current[id];
    if (quantity === undefined) return;
    dispatch(setQuantity({ id, quantity }));
    delete pending.current[id];
    delete timers.current[id];
    setDrafts(d => { const next = { ...d }; delete next[id]; return next; });
  }, [dispatch]);

  const changeQuantity = (id: string, quantity: number) => {
    pending.current[id] = quantity;
    setDrafts(d => ({ ...d, [id]: quantity }));
    clearTimeout(timers.current[id]);
    timers.current[id] = setTimeout(() => commit(id), delay);
  };

  const discard = (id: string) => {
    clearTimeout(timers.current[id]);
    delete timers.current[id];
    delete pending.current[id];
    setDrafts(d => { const next = { ...d }; delete next[id]; return next; });
  };

  const flushPending = useCallback(() => {
    Object.values(timers.current).forEach(clearTimeout);
    Object.entries(pending.current).forEach(([id, quantity]) =>
      dispatch(setQuantity({ id, quantity })));
    timers.current = {};
    pending.current = {};
  }, [dispatch]);

  const flush = useCallback(() => { flushPending(); setDrafts({}); }, [flushPending]);
  useEffect(() => () => flushPending(), [flushPending]);
  return { drafts, changeQuantity, discard, flush };
}
