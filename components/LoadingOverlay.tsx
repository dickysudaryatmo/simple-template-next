// components/LoadingOverlay.tsx
'use client'

export function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
        <p className="text-gray-600 dark:text-gray-400"></p>
      </div>
    </div>
  )
}