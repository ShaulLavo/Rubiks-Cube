import { Group } from 'three'
import { Face } from './Face'
import { useMemo, useRef } from 'react'
import { NormalMatrix, GroupRefs, RotationAxis } from '../types'
import { useStore } from './store'
interface CubeProps {
  size: number
}

export const Cube: React.FC<CubeProps> = ({ size }) => {
  const cubeRef = useRef<Group | null>(null)
  const faceRefs = useRef<GroupRefs>([])
  const rotationAxis = useStore(state => state.rotationAxis)
  const cubletMatrix = useMemo(() => {
    const positions: NormalMatrix = []
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        for (let k = 0; k < size; k++) {
          positions.push([i, j, k])
        }
      }
    }
    return positions
  }, [size])
  const createCube = (size: number) =>
    Array.from({ length: size }, (_, x) =>
      Array.from({ length: size }, (_, y) =>
        Array.from({ length: size }, (_, z) => ({ x, y, z }))
      )
    )

  console.log('cube3x3x3', createCube(3).flat(4).length)
  const cubletMatrixWithSpacing = useMemo(() => {
    const spacing = 1.05
    return cubletMatrix.map(cube =>
      cube.map(position => (position *= spacing))
    ) as NormalMatrix
  }, [size])

  const getFacesX = (cube: NormalMatrix) => {
    const faceArray = []
    for (let i = 0; i < size; i++) {
      faceArray.push(cube.slice(i * size * size, (i + 1) * size * size))
    }
    return faceArray
  }

  const getFacesY = (cube: NormalMatrix) => {
    const output: NormalMatrix[] = Array(size)
      .fill(null)
      .map(() => [])

    for (let i = 0; i < cube.length; i += size * size) {
      for (let j = i; j < i + size * size; j++) {
        if (j < cube.length) {
          const indexWithinBlock = Math.floor((j - i) / size)
          output[indexWithinBlock].push(cube[j])
        }
      }
    }

    return output
  }

  const faces =
    rotationAxis === RotationAxis.X
      ? getFacesX(cubletMatrixWithSpacing)
      : getFacesY(cubletMatrixWithSpacing)
  console.log('getFacesY(cubletMatrix)', getFacesY(cubletMatrix))
  console.log('getFacesX(cubletMatrix)', getFacesX(cubletMatrix))
  return (
    <group ref={cubeRef}>
      {faces.map((face, index) => (
        <Face
          key={index}
          face={face}
          index={index}
          size={size}
          faceRefs={faceRefs}
          cubletMatrix={cubletMatrix}
        />
      ))}
    </group>
  )
}
