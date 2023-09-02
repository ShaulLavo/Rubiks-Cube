import { Canvas } from '@react-three/fiber'
import { Scene } from './components/Scence'
import { UI } from './components/UI'

function App () {
  return (
    <main className='w-screen h-screen overflow-hidden'>
      <UI />
      <Canvas camera={{ position: [10, 0, 0], fov: 100 }}>
        <Scene />
      </Canvas>
    </main>
  )
}

export default App
