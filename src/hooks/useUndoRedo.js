import { useState, useCallback, useRef } from 'react'

export function useUndoRedo(initialState, maxHistorySize = 50) {
  const [state, setState] = useState(initialState)
  const [history, setHistory] = useState([initialState])
  const [currentIndex, setCurrentIndex] = useState(0)
  const isUndoRedoAction = useRef(false)

  const pushToHistory = useCallback((newState) => {
    if (isUndoRedoAction.current) {
      isUndoRedoAction.current = false
      return
    }

    setHistory(prev => {
      const newHistory = prev.slice(0, currentIndex + 1)
      newHistory.push(newState)
      
      // Limit history size
      if (newHistory.length > maxHistorySize) {
        newHistory.shift()
        return newHistory
      }
      
      return newHistory
    })
    
    setCurrentIndex(prev => Math.min(prev + 1, maxHistorySize - 1))
  }, [currentIndex, maxHistorySize])

  const updateState = useCallback((newState) => {
    setState(newState)
    pushToHistory(newState)
  }, [pushToHistory])

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      isUndoRedoAction.current = true
      const newIndex = currentIndex - 1
      setCurrentIndex(newIndex)
      setState(history[newIndex])
    }
  }, [currentIndex, history])

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      isUndoRedoAction.current = true
      const newIndex = currentIndex + 1
      setCurrentIndex(newIndex)
      setState(history[newIndex])
    }
  }, [currentIndex, history])

  const canUndo = currentIndex > 0
  const canRedo = currentIndex < history.length - 1

  return {
    state,
    setState: updateState,
    undo,
    redo,
    canUndo,
    canRedo,
    history: history.length,
    currentIndex
  }
}

// Hook for keyboard shortcuts
export function useKeyboardShortcuts(undo, redo, canUndo, canRedo) {
  const handleKeyDown = useCallback((event) => {
    if (event.ctrlKey || event.metaKey) {
      if (event.key === 'z' && !event.shiftKey && canUndo) {
        event.preventDefault()
        undo()
      } else if ((event.key === 'y' || (event.key === 'z' && event.shiftKey)) && canRedo) {
        event.preventDefault()
        redo()
      }
    }
  }, [undo, redo, canUndo, canRedo])

  return { handleKeyDown }
}
