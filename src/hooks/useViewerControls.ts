import {
  FIRST_PAGE,
  FULL_ROTATION,
  ROTATION_STEP,
  ZOOM_DEFAULT,
  ZOOM_MAX,
  ZOOM_MIN,
  ZOOM_STEP,
} from '@/components/resume/viewerConstants';
import { useMemo, useReducer } from 'react';

interface ViewerState {
  zoom: number;
  rotation: number;
  page: number;
  numPages: number;
}

type ViewerAction =
  | { type: 'zoomIn' }
  | { type: 'zoomOut' }
  | { type: 'fitWidth' }
  | { type: 'rotate' }
  | { type: 'reset' }
  | { type: 'nextPage' }
  | { type: 'previousPage' }
  | { type: 'documentLoaded'; numPages: number };

const INITIAL_STATE: ViewerState = {
  zoom: ZOOM_DEFAULT,
  rotation: 0,
  page: FIRST_PAGE,
  numPages: 0,
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

function viewerReducer(state: ViewerState, action: ViewerAction): ViewerState {
  switch (action.type) {
    case 'zoomIn':
      return { ...state, zoom: clamp(state.zoom + ZOOM_STEP, ZOOM_MIN, ZOOM_MAX) };
    case 'zoomOut':
      return { ...state, zoom: clamp(state.zoom - ZOOM_STEP, ZOOM_MIN, ZOOM_MAX) };
    case 'fitWidth':
      return { ...state, zoom: ZOOM_DEFAULT };
    case 'rotate':
      return { ...state, rotation: (state.rotation + ROTATION_STEP) % FULL_ROTATION };
    case 'reset':
      return { ...INITIAL_STATE, numPages: state.numPages };
    case 'nextPage':
      return { ...state, page: clamp(state.page + 1, FIRST_PAGE, state.numPages) };
    case 'previousPage':
      return { ...state, page: clamp(state.page - 1, FIRST_PAGE, state.numPages) };
    case 'documentLoaded':
      // Ignore a repeat of the same event so it can never reset the page the user is on.
      if (action.numPages === state.numPages) return state;
      return { ...state, numPages: action.numPages, page: FIRST_PAGE };
    default:
      return state;
  }
}

// Local, throwaway state for one open document. Remount (via `key`) to start fresh for a new resume.
export function useViewerControls() {
  const [state, dispatch] = useReducer(viewerReducer, INITIAL_STATE);

  const actions = useMemo(
    () => ({
      zoomIn: () => dispatch({ type: 'zoomIn' }),
      zoomOut: () => dispatch({ type: 'zoomOut' }),
      fitWidth: () => dispatch({ type: 'fitWidth' }),
      rotate: () => dispatch({ type: 'rotate' }),
      reset: () => dispatch({ type: 'reset' }),
      nextPage: () => dispatch({ type: 'nextPage' }),
      previousPage: () => dispatch({ type: 'previousPage' }),
      documentLoaded: (numPages: number) => dispatch({ type: 'documentLoaded', numPages }),
    }),
    [],
  );

  return {
    state,
    actions,
    canZoomIn: state.zoom < ZOOM_MAX,
    canZoomOut: state.zoom > ZOOM_MIN,
    canGoPrevious: state.page > FIRST_PAGE,
    canGoNext: state.page < state.numPages,
  };
}

export type ViewerControls = ReturnType<typeof useViewerControls>;
