import { Box } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { MutableRefObject, Ref, useLayoutEffect, useRef } from 'react'
import {
  BoxGeometry,
  BufferGeometry,
  Material,
  Mesh,
  MeshNormalMaterial,
  MeshStandardMaterial,
  NormalBufferAttributes,
  Vector3
} from 'three'
import { NormalMatrix, CubletEl } from '../types'
import { DarkModeCubeColors } from './constants'

extend({ Mesh, BoxGeometry, MeshStandardMaterial, MeshNormalMaterial })

interface CubletProps {
  isFaceCublet?: boolean
  position: [number, number, number]
  index: number
  cubletRef?: CubletRef
  size?: number
  normalPosition?: NormalMatrix
}

export type CubletRef = Ref<
  Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[]>
> &
  MutableRefObject<
    Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[]>
  >

export const Cublet: React.FC<CubletProps> = ({
  position,
  index: cubletIndex,
  size,
  normalPosition
}) => {
  const cubletRef = useRef<CubletEl>(null)
  useLayoutEffect(() => {
    if (cubletRef.current) {
      // cubletRef.current.position.set(position[0], position[1], position[2])
      cubletRef.current.translateOnAxis(new Vector3(-0.525, -0.525, -0.525), 1)
    }
  }, [cubletRef.current])
  cubletIndex
  // console.log('position', cubletRef.current?.position)
  // console.log('quaternion', cubletRef.current?.quaternion)
  const cubletColor = (cubletIndex: number, faceIndex: number) => {
    console.log(cubletIndex + faceIndex)
    console.log(normalPosition)
    const specificPosition =
      normalPosition?.[
        faceIndex + cubletIndex >= (size ?? 0) ? 0 : faceIndex + cubletIndex
      ]
    const isOuterLayer =
      specificPosition?.[0] === 0 ||
      specificPosition?.[0] === (size ?? 0) - 1 ||
      specificPosition?.[1] === 0 ||
      specificPosition?.[1] === (size ?? 0) - 1 ||
      specificPosition?.[2] === 0 ||
      specificPosition?.[2] === (size ?? 0) - 1

    console.log(isOuterLayer)
    // Other conditions...
    if (isOuterLayer) {
      return 'blue'
    } else {
      return 'red'
    }
  }
  return (
    <Box args={[1, 1, 1]} ref={cubletRef} position={position}>
      {Object.values(DarkModeCubeColors)
        .filter(v => !isNaN(Number(v)))
        .map((color, index) => (
          <meshStandardMaterial
            key={index}
            attach={`material-${index}`}
            color={color}
            ref={() => {}}
            // emissive={color}
            // emissiveIntensity={0.5}
          />
        ))}
    </Box>
  )
}
