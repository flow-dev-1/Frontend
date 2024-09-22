import React, { useState, useRef, useCallback, useEffect } from 'react'
import {
  Stage,
  Layer,
  Text,
  Arrow,
  Group,
  Image as KonvaImage,
} from 'react-konva'
import bg from '../../../../../../assets/selfawareness-images/match-1.png'
import bg2 from '../../../../../../assets/selfawareness-images/match-2.png'

const MatchingComponent = ({ leftItems, rightItems, onMatch, onNext }) => {
  const [arrows, setArrows] = useState([]) // Permanent arrows
  const [tempArrow, setTempArrow] = useState(null) // Temporary arrow during drawing
  const [matches, setMatches] = useState([]) // Store matched items
  const isDrawing = useRef(false)
  const startPoint = useRef(null)
  const stageRef = useRef(null)

  const [leftBgImage, setLeftBgImage] = useState(null)
  const [rightBgImage, setRightBgImage] = useState(null)

  const TEXT_WIDTH = 100 // Approximate text width
  const TEXT_HEIGHT = 20 // Approximate text height
  const ARROW_PADDING = 10 // Padding to prevent arrow from touching text

  // Load images manually
  useEffect(() => {
    const leftImage = new window.Image()
    leftImage.src = bg
    leftImage.onload = () => setLeftBgImage(leftImage)

    const rightImage = new window.Image()
    rightImage.src = bg2
    rightImage.onload = () => setRightBgImage(rightImage)
  }, [])

  // Handle starting the arrow drawing
  const handleMouseDown = useCallback((e) => {
    const pos = e.target.getStage().getPointerPosition()
    const clickedOn = e.target
    if (clickedOn.attrs.id && clickedOn.attrs.id.startsWith('left-item-')) {
      isDrawing.current = true
      const adjustedStart = {
        x: pos.x + ARROW_PADDING + 65, // Start arrow exactly at the tip
        y: pos.y - 10,
        id: clickedOn.attrs.id,
      }
      startPoint.current = adjustedStart
    }
  }, [])

  // Handle updating the temporary arrow position
  const handleMouseMove = useCallback((e) => {
    const pos = e.target.getStage().getPointerPosition()
    const clickedOn = e.target

    if (clickedOn.attrs.id && clickedOn.attrs.id.startsWith('left-item-')) {
      // Change the cursor to pointer when hovering over a left item
      stageRef.current.container().style.cursor = 'pointer'
    } else {
      // Reset the cursor when not over a left item
      stageRef.current.container().style.cursor = 'default'
    }

    if (!isDrawing.current) return

    const adjustedEnd = {
      x: Math.min(pos.x - ARROW_PADDING, 450 - ARROW_PADDING), // Prevent the arrow from extending beyond the right items
      y: pos.y,
    }

    // Update the temporary arrow as the user drags
    setTempArrow({
      points: [
        startPoint.current.x,
        startPoint.current.y,
        adjustedEnd.x,
        adjustedEnd.y,
      ],
      stroke: 'black',
      opacity: 0.5,
    })
  }, [])

  // Handle finalizing the arrow when the mouse is released
  const handleMouseUp = useCallback(
    (e) => {
      if (!isDrawing.current) return

      const pos = e.target.getStage().getPointerPosition()
      isDrawing.current = false
      const startIndex = parseInt(startPoint.current.id.split('-')[2])

      // Check if the arrow ends at one of the right-side items
      const rightItemIndex = rightItems.findIndex((item, index) => {
        const itemY = 20 + index * 110 // Calculate Y position of the right item
        return pos.x >= 450 && pos.y >= itemY && pos.y <= itemY + 100
      })

      if (rightItemIndex !== -1) {
        setArrows((prev) => {
          // Remove any existing arrow from the same left item
          const filteredArrows = prev.filter(
            (arrow) => arrow.leftIndex !== startIndex
          )

          const finalArrow = {
            points: tempArrow.points,
            stroke: 'black',
            fill: 'black',
            opacity: 1,
            leftIndex: startIndex,
            rightIndex: rightItemIndex,
          }

          return [...filteredArrows, finalArrow] // Finalize the new arrow
        })

        setMatches((prev) => {
          const newMatch = {
            left: leftItems[startIndex],
            right: rightItems[rightItemIndex],
          }
          return [...prev, newMatch] // Store the match
        })

        onMatch(startIndex, rightItemIndex) // Trigger the onMatch callback with the indices
      }

      setTempArrow(null) // Clear the temporary arrow

      // If all left items are matched, trigger `onNext`
      if (matches.length + 1 === leftItems.length) {
        onNext() // Proceed to the next screen or step
      }
    },
    [tempArrow, rightItems, leftItems, matches, onMatch, onNext]
  )

  return (
    <Stage
      width={800}
      height={400}
      y={0}
      ref={stageRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <Layer>
        {/* Left Items with Background Image */}
        <Group x={50} y={50}>
          {leftItems.map((item, index) => (
            <Group key={`left-group-${index}`} x={0} y={index * 80}>
              {leftBgImage && (
                <KonvaImage image={leftBgImage} width={200} height={50} />
              )}
              <Text
                key={`left-${index}`}
                id={`left-item-${index}`}
                text={item}
                x={10}
                y={0}
                fontSize={16}
                width={100}
                height={50}
                align='center'
                verticalAlign='middle'
              />
            </Group>
          ))}
        </Group>

        {/* Right Items with Background Image */}
        <Group x={450} y={20}>
          {rightItems.map((item, index) => (
            <Group key={`right-group-${index}`} x={-20} y={index * 110}>
              {rightBgImage && (
                <KonvaImage image={rightBgImage} width={330} height={100} />
              )}
              <Text
                key={`right-${index}`}
                text={item}
                x={10}
                y={-30}
                fontSize={16}
                width={300}
                height={150}
                align='center'
                verticalAlign='middle'
              />
            </Group>
          ))}
        </Group>

        {/* Render permanent arrows */}
        {arrows.map((arrow, index) => (
          <Arrow
            key={`arrow-${index}`}
            points={arrow.points}
            stroke={arrow.stroke || 'black'}
            fill={arrow.fill || 'black'}
            opacity={arrow.opacity || 1}
          />
        ))}

        {/* Render temporary arrow */}
        {tempArrow && (
          <Arrow
            points={tempArrow.points}
            stroke={tempArrow.stroke || 'black'}
            fill={tempArrow.fill || 'black'}
            opacity={tempArrow.opacity || 0.5}
          />
        )}
      </Layer>
    </Stage>
  )
}

export default MatchingComponent
