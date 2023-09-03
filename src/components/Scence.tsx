import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Stars, Stats } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import { Cublet } from './Cublet'
import { GroupRefs, NormalMatrix, RotationAxis } from '../types'
import { Face } from './Face'
import { useStore } from './store'
// import { Cube } from './Cube'
interface CubeProps {
  size: number
}
type CubeMatrix = [number, number, number][][][]
const Cube: React.FC<CubeProps> = ({ size }) => {
  const faceRefs = useRef<GroupRefs>([])
  const rotationAxis = useStore(state => state.rotationAxis)

  const createCube = (size: number): CubeMatrix =>
    Array.from({ length: size }, (_, x) =>
      Array.from({ length: size }, (_, y) =>
        Array.from(
          { length: size },
          (_, z) => [x, y, z] as [number, number, number]
        )
      )
    )

  const addGap = (cube: CubeMatrix, gap: number) =>
    cube.map(plane =>
      plane.map(row => row.map(coord => coord.map(value => value * gap)))
    ) as unknown as CubeMatrix

  const cube = useMemo(() => addGap(createCube(size), 1.1), [size])

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
    console.log(cube.length)
    for (let i = 0; i < cube.length; i += size * size) {
      for (let j = i; j < i + size * size; j++) {
        if (j < cube.length) {
          const indexWithinBlock = Math.floor((j - i) / size)
          output[indexWithinBlock].push(cube[j])
        }
      }
    }
    console.log(output)
    return output
  }

  const faces =
    rotationAxis === RotationAxis.X
      ? getFacesX(cube.flat(2))
      : getFacesY(cube.flat(2))

  return (
    <>
      {faces.map((face, index) => (
        <Face
          key={index}
          face={face}
          index={index}
          size={size}
          faceRefs={faceRefs}
          cubletMatrix={cube.flat(2)}
        />
      ))}
    </>
  )
}
export const Scene = ({}) => {
  const { camera, scene } = useThree()
  useFrame(() => {
    camera.lookAt(scene.position)
  })

  // const axesHelper = new AxesHelper(5) // The number specifies the size of the helper
  // scene.add(axesHelper)

  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Stars />
      <Cube size={3} />
      <Stats />
      <OrbitControls />
    </>
  )
}
