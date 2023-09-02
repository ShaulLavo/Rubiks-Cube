import { Box } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { MutableRefObject, Ref, useLayoutEffect, useRef } from 'react'
import {
  BoxGeometry,
  BufferGeometry,
  Material,
  Mesh,
  MeshStandardMaterial,
  NormalBufferAttributes,
  Vector3
} from 'three'
import { CubeColors } from './constants'
import { CubletEl } from '../App'

extend({ Mesh, BoxGeometry, MeshStandardMaterial })

interface CubletProps {
  isFaceCublet?: boolean
  position: [number, number, number]
  index: number
  cubletRef?: CubletRef
}
interface SimpleCubletProps {
  color: CubeColors
  position: [number, number, number]
}

export type CubletRef = Ref<
  Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[]>
> &
  MutableRefObject<
    Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[]>
  >

export const Cublet: React.FC<CubletProps> = ({ position }) => {
  const cubletRef = useRef<CubletEl>(null)

  useLayoutEffect(() => {
    if (cubletRef.current) {
      cubletRef.current.translateOnAxis(new Vector3(0, -0.5, -0.5), 1) // translates along the X-axis
    }
  }, [cubletRef.current])

  // if (index < 9) cubletRef?.current?.rotateY(Math.PI / 4)
  return (
    <Box args={[1, 1, 1]} ref={cubletRef} position={position}>
      {Object.values(CubeColors)
        .filter(v => !isNaN(Number(v)))
        .map((color, index) => (
          <meshStandardMaterial
            key={index}
            attach={`material-${index}`}
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
          />
        ))}
    </Box>
  )
}

export const SimpleCublet: React.FC<SimpleCubletProps> = ({
  position,
  color
}) => {
  return (
    <Box args={[1, 1, 1]} position={position}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
      />
    </Box>
  )
}
