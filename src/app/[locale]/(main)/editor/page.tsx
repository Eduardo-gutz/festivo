import React from 'react'
import Sidebar from '@/modules/editor/components/sidebar/Sidebar'
import { EditorProvider } from '@/modules/editor/context/EditorContext'
import LayersPanel from '@/modules/editor/components/layers/LayersPanel'
import CanvasWrapper from '@/modules/editor/components/CanvasWrapper'

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