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

const MatchingComponent = ({
  leftItems,
  rightItems,
  onMatch,
  onNext,
  arrows,
  setArrows,
  isCompleted,
}) => {
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

  // Handle starting the arrow drawing
  const handleMouseDown = useCallback(
    (e, index) => {
      if (isCompleted) return

      isDrawing.current = true

      // Remove the existing match and arrow for this left item, if any
      setArrows((prev) => prev.filter((arrow) => arrow.leftIndex !== index))
      setMatches((prev) =>
        prev.filter((match) => match.left !== leftItems[index])
      )

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
    },
    [leftItems, setArrows]
  )

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
    },
    [tempArrow, ARROW_PADDING]
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
        const isAlreadyMatched = matches.some(
          (match) => match.right === rightItems[rightItemIndex]
        )

        // Check if current matches are less than 3
        if (matches.length < 3 || isAlreadyMatched) {

          if (!isAlreadyMatched && matches.length < 3) {
            const newArrow = {
              points: tempArrow.points,
              stroke: '#5B616A', // Set the finalized arrow color to blue
              fill: '#5B616A',
              opacity: 1,
              leftIndex: startIndex,
              rightIndex: rightItemIndex,
            }

            setArrows((prev) => {
              const filteredArrows = prev.filter(
                (arrow) => arrow.leftIndex !== startIndex
              )
              return [...filteredArrows, newArrow]
            })

            // Store the match
            setMatches((prev) => {
              const newMatch = {
                left: leftItems[startIndex],
                right: rightItems[rightItemIndex],
              }
              return [...prev, newMatch]
            })

            onMatch(startIndex, rightItemIndex)
          }
        }
      } else {
        console.log(startIndex)
        onMatch(startIndex, null)
      }

      // Clear the temporary arrow
      setTempArrow(null)

      // Check if all left items are matched
      if (matches.length === leftItems.length - 1) {
        const allArrowsValid = arrows.every((arrow) => {
          return rightItems[arrow.rightIndex] // Validate arrows
        })

        if (allArrowsValid) {
          onNext() // Proceed to the next step
        }
      }
    },
    [
      tempArrow,
      rightItems,
      leftItems,
      matches,
      arrows,
      setArrows,
      onMatch,
      onNext,
    ]
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
              onMouseDown={(e) => handleMouseDown(e, index)}
              onMouseEnter={() => {
                stageRef.current.container().style.cursor = 'pointer' // Set cursor to pointer on hover
              }}
              onMouseLeave={() => {
                stageRef.current.container().style.cursor = 'default' // Reset cursor on leave
              }}
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
            pointerLength={10}
            pointerWidth={10}
          />
        ))}

        {/* Render temporary arrow while drawing */}
        {tempArrow && (
          <Arrow
            points={tempArrow.points}
            stroke={tempArrow.stroke || '#5B616A'}
            fill={tempArrow.fill || '#5B616A'}
            opacity={tempArrow.opacity || 0.5}
            pointerLength={10}
            pointerWidth={10}
          />
        )}
      </Layer>
    </Stage>
  )
}

export default MatchingComponent
