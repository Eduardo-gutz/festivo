import React from 'react'
import Sidebar from '@/components/editor/sidebar/Sidebar'
import { EditorProvider } from '@/components/editor/EditorContext'
import LayersPanel from '@/components/editor/layers/LayersPanel'
import CanvasWrapper from '@/components/editor/CanvasWrapper'

const EditorPage = () => {
  return (
    <EditorProvider>
      <div className="bg-page flex min-h-screen">
        <Sidebar />
        <main className="flex flex-1 items-center justify-center">
          <CanvasWrapper />
        </main>
        <LayersPanel />
      </div>
    </EditorProvider>
  )
}

export default EditorPage