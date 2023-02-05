import { useEffect, useState, useLayoutEffect } from 'react'
import rough from 'roughjs'

// const roughGenerator = rough.generator()

const WhiteBoard = ({ canvasRef, ctxRef, elements, setElements }) => {
  const [isDrawing, setIsDrawing] = useState<boolean>(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctxRef.current = ctx
  }, [])

  useLayoutEffect(() => {
    const roughCanvas = rough.canvas(canvasRef.current)
    elements.forEach(element => {
      roughCanvas.linearPath(element.path)
    })
  }, [elements])

  const handleMouseDown = (e: any) => {
    const { offsetX, offsetY } = e.nativeEvent
    setElements(prevElements => [
      ...prevElements,
      {
        type: 'pencil',
        offsetX,
        offsetY,
        path: [[offsetX, offsetY]],
        stroke: 'black',
      },
    ])
    setIsDrawing(true)
  }

  const handleMouseMove = (e: any) => {
    const { offsetX, offsetY } = e.nativeEvent
    if (isDrawing) {
      const { path } = elements[elements.length - 1]
      const newPath = [...path, [offsetX, offsetY]]

      setElements(prevElements =>
        prevElements.map((ele, index) => {
          if (index === elements.length - 1) {
            return {
              ...ele,
              path: newPath,
            }
          } else {
            return ele
          }
        })
      )
    }
  }

  const handleMouseUp = (e: any) => {
    setIsDrawing(false)
  }

  return (
    <canvas
      ref={canvasRef}
      className='w-full h-full'
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    ></canvas>
  )
}

export default WhiteBoard
