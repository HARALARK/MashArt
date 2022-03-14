import React, { useRef, useEffect } from "react"
import io from "socket.io-client"
import styled from "styled-components"

// Referenced from from https://github.com/socketio/socket.io/blob/master/examples/whiteboard/public/main.js

const Board = () => {
  const canvasRef = useRef(null)
  const socket = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    canvas.height = 300
    canvas.width = 300

    const color = document.getElementById("color")
    // set the current color
    const current = {
      color: "#000000",
    }

    const onColorChange = (e) => {
      current.color = e.target.value
    }

    color.addEventListener("change", onColorChange, false)
    let drawing = false

    const drawLine = (x0, y0, x1, y1, color, emit) => {
      context.beginPath()
      context.moveTo(x0, y0)
      context.lineTo(x1, y1)
      context.strokeStyle = color
      context.lineWidth = 2
      context.stroke()
      context.closePath()

      if (!emit) {
        return
      }
      const w = canvas.width
      const h = canvas.height

      socket.current.emit("drawing", {
        x0: x0 / w,
        y0: y0 / h,
        x1: x1 / w,
        y1: y1 / h,
        color,
      })
    }

    const onPointerDown = (e) => {
      e.preventDefault()
      e.stopPropagation()

      drawing = true

      current.x = (e.pageX || e.touches[0].pageX) - canvas.offsetLeft
      current.y = (e.pageY || e.touches[0].pageY) - canvas.offsetTop
    }

    const onPointerMove = (e) => {
      e.preventDefault()
      e.stopPropagation()

      if (!drawing) {
        return
      }
      drawLine(
        current.x,
        current.y,
        (e.pageX || e.touches[0].pageX) - canvas.offsetLeft,
        (e.pageY || e.touches[0].pageY) - canvas.offsetTop,
        current.color,
        true
      )
      current.x = (e.pageX || e.touches[0].pageX) - canvas.offsetLeft
      current.y = (e.pageY || e.touches[0].pageY) - canvas.offsetTop
    }

    const onPointerUp = (e) => {
      e.preventDefault()
      e.stopPropagation()

      if (!drawing) {
        return
      }
      drawing = false
      drawLine(
        current.x,
        current.y,
        (e.pageX || e.changedTouches[e.changedTouches.length - 1].pageX) -
          canvas.offsetLeft,
        (e.pageY || e.changedTouches[e.changedTouches.length - 1].pageY) -
          canvas.offsetTop,
        current.color,
        true
      )
    }

    const throttle = (callback, delay) => {
      let previousCall = new Date().getTime()
      return function () {
        const time = new Date().getTime()

        if (time - previousCall >= delay) {
          previousCall = time
          callback.apply(null, arguments)
        }
      }
    }

    canvas.addEventListener("mousedown", onPointerDown, false)
    canvas.addEventListener("mouseup", onPointerUp, false)
    canvas.addEventListener("mouseout", onPointerUp, false)
    canvas.addEventListener("mousemove", throttle(onPointerMove, 10), false)

    // Touch support for mobile devices
    canvas.addEventListener("touchstart", onPointerDown, false)
    canvas.addEventListener("touchend", onPointerUp, false)
    canvas.addEventListener("touchcancel", onPointerUp, false)
    canvas.addEventListener("touchmove", throttle(onPointerMove, 10), false)

    const onDrawingEvent = (data) => {
      const w = canvas.width
      const h = canvas.height
      drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color)
    }

    socket.current = io.connect("/")
    socket.current.on("drawing", onDrawingEvent)
  }, [])

  return (
    <>
      <Whiteboard ref={canvasRef} className="whiteboard" />
      <ColorsContainer>
        <p>Pick a color:</p>
        <input type="color" id="color" />
      </ColorsContainer>
    </>
  )
}

const Whiteboard = styled.canvas`
  border-radius: 5px;
  background: var(--light);
  width: 300px;
  height: 300px;
`

const ColorsContainer = styled.div`
  width: 100%;
  display: flex;
  background-color: var(--secondary);
  padding: 1rem;
  margin: 1rem 0 0;
  border-radius: 5px;
  align-items: center;
  gap: 1rem;
  color: var(--light);
`
export default Board
