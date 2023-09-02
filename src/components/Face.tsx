import { useState } from 'react'
import { ThreeEvent } from '@react-three/fiber'
import { motion } from 'framer-motion-3d'
import { Cublet } from './Cublet'
import { NormalMatrix, GroupRefs, RotationAxis } from '../types'
import { useStore } from './store'

interface FaceProps {
  face: NormalMatrix
  index: number
  size: number
  faceRefs: React.MutableRefObject<GroupRefs>
  cubletMatrix: NormalMatrix
}
export const Face = ({
  face,
  index,
  size,
  faceRefs,
  cubletMatrix
}: FaceProps) => {
  const [rotationTargets, setRotationTargets] = useState([0, 0, 0] as [
    number,
    number,
    number
  ])
  const rotationAxis = useStore(state => state.rotationAxis)
  const rotations = useStore(state => state.rotations)

  const addRotation = useStore(state => state.addRotation)
  const getAnime = () => {
    switch (rotationAxis) {
      case RotationAxis.X:
        return { rotateX: rotationTargets[rotationAxis] }
      case RotationAxis.Y:
        return { rotateY: rotationTargets[rotationAxis] }
    }
  }

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    switch (rotationAxis) {
      case RotationAxis.X:
        rotationTargets[rotationAxis] += Math.PI / 2
        addRotation({
          rotation: rotationTargets,
          faceRef: faceRefs.current[index],
          axis: rotationAxis
        })
        break
      case RotationAxis.Y:
        rotationTargets[rotationAxis] -= Math.PI / 2
        addRotation({
          rotation: rotationTargets,
          faceRef: faceRefs.current[index],
          axis: rotationAxis
        })

        break
    }
    setRotationTargets([...rotationTargets])
  }

  return (
    <motion.group
      animate={getAnime()}
      transition={{
        type: 'spring',
        stiffness: 80,
        damping: 10,
        mass: 0.1,
        ease: 'easeInOut'
      }}
      onClick={handleClick}
      ref={ref => {
        if (faceRefs.current && ref) faceRefs.current[index] = ref as any
      }}
      key={index}
    >
      {face.map((position, index) => (
        <Cublet
          size={size}
          key={index}
          position={position}
          normalPosition={cubletMatrix}
          index={index}
        />
      ))}
    </motion.group>
  )
}
