import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Stars, Stats } from '@react-three/drei'
import { Cube } from './Cube'

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
