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

  // Handle starting the arrow drawing from the guided arrow's endpoint
  const handleMouseDown = useCallback((e, index) => {
    isDrawing.current = true

    // Arrow starts from the guided arrow's end position
    startPoint.current = {
      x: 240, // Fixed starting x position
      y: 75 + index * 80, // Vertical position based on left item index
      index,
    }

    // Create the temporary arrow starting from the fixed point
    setTempArrow({
      points: [240, startPoint.current.y, 240, startPoint.current.y],
      stroke: '#5B616A', // Set stroke color to blue
      opacity: 0.5,
    })
  }, [])

  // Handle updating the temporary arrow as the user drags
  const handleMouseMove = useCallback(
    (e) => {
      if (!isDrawing.current || !tempArrow) return

      const pos = e.target.getStage().getPointerPosition()
      const adjustedEnd = {
        x: Math.min(pos.x - ARROW_PADDING, 450 - ARROW_PADDING),
        y: pos.y,
      }

      // Update the temporary arrow with the new end position
      setTempArrow({
        ...tempArrow,
        points: [240, startPoint.current.y, adjustedEnd.x, adjustedEnd.y],
      })

      // Change cursor style on valid right item
      const rightItemIndex = rightItems.findIndex((item, index) => {
        const itemY = 20 + index * 110
        return pos.x >= 450 && pos.y >= itemY && pos.y <= itemY + 100
      })

      if (rightItemIndex !== -1) {
        // Check if the right item is already matched
        const isAlreadyMatched = matches.some(
          (match) => match.right === rightItems[rightItemIndex]
        )
        if (!isAlreadyMatched) {
          stageRef.current.container().style.cursor = 'pointer' // Change cursor to pointer
        } else {
          stageRef.current.container().style.cursor = 'not-allowed' // Change cursor to not-allowed if already matched
        }
      } else {
        stageRef.current.container().style.cursor = 'default' // Reset cursor
      }
    },
    [tempArrow, ARROW_PADDING, rightItems, matches]
  )

  // Handle finalizing the arrow when the mouse is released
  const handleMouseUp = useCallback(
    (e) => {
      if (!isDrawing.current || !tempArrow) return
      isDrawing.current = false

      const pos = e.target.getStage().getPointerPosition()
      const startIndex = startPoint.current.index

      // Check if the arrow ends at one of the right-side items
      const rightItemIndex = rightItems.findIndex((item, index) => {
        const itemY = 20 + index * 110
        return pos.x >= 450 && pos.y >= itemY && pos.y <= itemY + 100
      })

      if (rightItemIndex !== -1) {
        // Check if the right item is already matched
        const existingMatchIndex = matches.findIndex(
          (match) => match.right === rightItems[rightItemIndex]
        )

        if (existingMatchIndex !== -1) {
          // Remove the existing match if it exists
          setMatches((prev) => {
            const newMatches = [...prev]
            newMatches.splice(existingMatchIndex, 1) // Remove the existing match
            return newMatches
          })

          // Remove the existing arrow if it exists
          setArrows((prev) =>
            prev.filter((arrow) => arrow.rightIndex !== rightItemIndex)
          )
        }

        // Finalize and lock the new arrow
        setArrows((prev) => {
          const newArrow = {
            points: tempArrow.points,
            stroke: '#5B616A', // Set the finalized arrow color to blue
            fill: '#5B616A',
            opacity: 1,
            leftIndex: startIndex,
            rightIndex: rightItemIndex,
          }

          // Remove any previous arrow from the same left item
          const filteredArrows = prev.filter(
            (arrow) => arrow.leftIndex !== startIndex
          )
          return [...filteredArrows, newArrow]
        })

        // Store the new match
        setMatches((prev) => {
          const newMatch = {
            left: leftItems[startIndex],
            right: rightItems[rightItemIndex],
          }
          const updatedMatches = [...prev, newMatch]

          // Check if all left items have been matched
          if (updatedMatches.length === leftItems.length) {
            onNext() // Proceed to the next step
          }
          return updatedMatches
        })

        onMatch(startIndex, rightItemIndex)
      }

      // Clear the temporary arrow after use
      setTempArrow(null)

      // Reset cursor when mouse up
      stageRef.current.container().style.cursor = 'default'
    },
    [tempArrow, rightItems, leftItems, matches, onMatch, onNext]
  )

  return (
    <Stage
      width={800}
      height={400}
      y={0}
      ref={stageRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <Layer>
        {/* Left Items with Background Image */}
        <Group x={50} y={50}>
          {leftItems.map((item, index) => (
            <Group
              key={`left-group-${index}`}
              x={0}
              y={index * 80}
              onMouseDown={(e) => handleMouseDown(e, index)} // Start arrow from anywhere in the group
              onMouseEnter={() =>
                (stageRef.current.container().style.cursor = 'pointer')
              } // Ensure cursor changes to pointer when hovering over left items
              onMouseLeave={() =>
                (stageRef.current.container().style.cursor = 'default')
              } // Reset cursor when leaving
            >
              {leftBgImage && (
                <KonvaImage
                  id={`left-bg-${index}`}
                  image={leftBgImage}
                  width={200}
                  height={50}
                />
              )}
              <Text
                key={`left-${index}`}
                text={item}
                x={10}
                y={0}
                fontSize={16}
                width={100}
                height={50}
                align='center'
                verticalAlign='middle'
              />
              {/* Guided Arrow */}
              <Arrow
                points={[190, 25, 240, 25]} // Arrow guides from left item
                stroke='#5B616A'
                fill='#5B616A'
                opacity={0.7}
                pointerLength={10}
                pointerWidth={10}
                visible={
                  arrows.some((arrow) => arrow.leftIndex === index)
                    ? false
                    : true
                } // Hide if an arrow exists
              />
            </Group>
          ))}
        </Group>

        {/* Right Items with Background Image */}
        <Group x={460} y={20}>
          {rightItems.map((item, index) => (
            <Group key={`right-group-${index}`} x={-20} y={index * 110}>
              {rightBgImage && (
                <KonvaImage image={rightBgImage} width={330} height={100} />
              )}
              <Text
                key={`right-${index}`}
                text={item}
                x={10}
                y={0}
                fontSize={16}
                width={300}
                height={100}
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
            stroke={arrow.stroke}
            fill={arrow.fill}
            opacity={arrow.opacity}
            pointerLength={10}
            pointerWidth={10}
          />
        ))}

        {/* Render temporary arrow */}
        {tempArrow && (
          <Arrow
            points={tempArrow.points}
            stroke={tempArrow.stroke}
            opacity={tempArrow.opacity}
            pointerLength={10}
            pointerWidth={10}
          />
        )}
      </Layer>
    </Stage>
  )
}

export default MatchingComponent
