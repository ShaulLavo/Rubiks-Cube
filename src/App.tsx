import { OrbitControls, Stars, Stats, PivotControls } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useLayoutEffect, useMemo, useRef } from 'react'
import { Cublet } from './components/Cublet'
import useRefs from 'react-use-refs'
import {
  Material,
  Mesh,
  NormalBufferAttributes,
  BufferGeometry,
  Group,
  Vector3,
  AxesHelper
} from 'three'
import { motion } from 'framer-motion-3d'
interface CubeProps {
  size: number
}
export type CubletEl = Mesh<
  BufferGeometry<NormalBufferAttributes>,
  Material | Material[]
>

type GroupRefs = Group[]

const Cube: React.FC<CubeProps> = ({ size }) => {
  // const maxIndex =  * size * size - 1
  const faceRefs = useRef<GroupRefs>([])
  const cubeRef = useRef<Group | null>(null)

  const cubletMatrix = useMemo(() => {
    const positions: [number, number, number][] = []
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        for (let k = 0; k < size; k++) {
          positions.push([i, j, k])
        }
      }
    }
    return positions
  }, [size])

  const cubletMatrixWithSpacing = useMemo(() => {
    const spacing = 1.05
    return cubletMatrix.map(cube =>
      cube.map(position => (position *= spacing))
    ) as [number, number, number][]
  }, [size])

  const getCubeInFaces = (cube: [number, number, number][]) => {
    const faceArray = []
    for (let i = 0; i < size * size; i++) {
      faceArray.push(cube.slice(i * size * size, (i + 1) * size * size))
    }
    return faceArray
  }

  const rotateFaceByIndex = (index: number, axis: Vector3) => {
    if (faceRefs.current && faceRefs.current[index]) {
      faceRefs.current[index]
        .rotateOnWorldAxis(axis, Math.PI / 2)
        .translateZ(-0.1)
    }
  }

  return (
    <group ref={cubeRef}>
      {getCubeInFaces(cubletMatrixWithSpacing).map((face, index) => {
        return (
          <motion.group
            onClick={e => {
              e.stopPropagation()
              rotateFaceByIndex(index, new Vector3(1, 0, 0))
            }}
            ref={ref => {
              if (faceRefs.current && ref) faceRefs.current[index] = ref as any
            }}
            key={index}
            // rotation={[index === 0 ? Math.PI : 0, 0, 0]}
          >
            {face.map((position, index) => (
              <Cublet
                key={index}
                position={position}
                index={index}
                // cubletRef={ref => (cubeRefs.current[index] = ref)}
              />
            ))}
          </motion.group>
        )
      })}
    </group>
  )
}

function Scene () {
  const { camera, scene } = useThree()
  useFrame(({ clock }) => {
    camera.lookAt(scene.position)
  })
  const axesHelper = new AxesHelper(5) // The number specifies the size of the helper

  scene.add(axesHelper)

  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Stars />
      <Cube size={3} />
      <Stats />
      {/* <gridHelper args={[10, 10, `white`, `gray`]} /> */}

      <OrbitControls />
    </>
  )
}

function App () {
  return (
    <div className='w-screen h-screen overflow-hidden'>
      <Canvas camera={{ position: [10, 0, 0], fov: 100 }}>
        <Scene />
      </Canvas>
    </div>
  )
}

export default App
