import { useEffect, useState, useLayoutEffect } from 'react'
import rough from 'roughjs'

const roughGenerator = rough.generator()

const WhiteBoard = ({ canvasRef, ctxRef, elements, setElements, tool }) => {
  const [isDrawing, setIsDrawing] = useState<boolean>(false)

  useEffect(() => {
    const canvas = canvasRef.current
    canvas.height = window.innerHeight * 2
    canvas.width = window.innerWidth * 2
    const ctx = canvas.getContext('2d')
    ctxRef.current = ctx
  }, [])

  useLayoutEffect(() => {
    const roughCanvas = rough.canvas(canvasRef.current)

    // Deleting the Previous line in (Draw line)
    if (elements.length > 0) {
      ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    }

    elements.forEach(element => {
      if (element.type === 'rect') {
        roughCanvas.draw(roughGenerator.rectangle(element.offsetX, element.offsetY, element.width, element.height))
      } else if (element.type === 'pencil') {
        roughCanvas.linearPath(element.path)
      } else if (element.type === 'line') {
        roughCanvas.draw(roughGenerator.line(element.offsetX, element.offsetY, element.width, element.height))
      }
    })
  }, [elements])

  const handleMouseDown = (e: any) => {
    const { offsetX, offsetY } = e.nativeEvent

    if (tool === 'pencil') {
      // Pencil
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
    } else if (tool === 'line') {
      // Line
      setElements(prevElements => [
        ...prevElements,
        {
          type: 'line',
          offsetX,
          offsetY,
          width: offsetX,
          height: offsetY,
          stroke: 'black',
        },
      ])
    } else if (tool === 'rectangle') {
      setElements(prevElements => [
        ...prevElements,
        {
          type: 'rect',
          offsetX,
          offsetY,
          width: offsetX,
          height: offsetY,
          stroke: 'black',
        },
      ])
    }
    setIsDrawing(true)
  }

  const handleMouseMove = (e: any) => {
    const { offsetX, offsetY } = e.nativeEvent
    if (isDrawing) {
      if (tool === 'pencil') {
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
      } else if (tool === 'line') {
        setElements(prevElements =>
          prevElements.map((ele, index) => {
            if (index === elements.length - 1) {
              return {
                ...ele,
                width: offsetX,
                height: offsetY,
              }
            } else {
              return ele
            }
          })
        )
      } else if (tool === 'rectangle') {
        setElements(prevElements =>
          prevElements.map((ele, index) => {
            if (index === elements.height - 1) {
              return {
                ...ele,
                width: offsetX - ele.offsetX,
                height: offsetY - ele.offsetY,
              }
            } else {
              return ele
            }
          })
        )
      }
    }
  }

  const handleMouseUp = (e: any) => {
    setIsDrawing(false)
  }

  return (
    <div className='w-full h-full overflow-hidden' onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <canvas ref={canvasRef} />
    </div>
  )
}

export default WhiteBoard
