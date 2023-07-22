import { OrbitControls, Stars, Stats } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Cublet, SimpleCublet } from './components/Cublet'
import { FC, Fragment, useMemo } from 'react'
import { CubeColors } from './components/constants'

function CubePreforment() {
	const spacing = 1.1
	const length = 3
	return (
		<>
			{Array.from({ length }, (_, i) =>
				Array.from({ length }, (_, j) =>
					Array.from({ length }, (_, k) => (
						<Cublet
							key={`${i}-${j}-${k}`}
							position={[
								(i - 4) * spacing,
								(j - 4) * spacing,
								(k - 4) * spacing
							]}
						/>
					))
				)
			)}
		</>
	)
}
interface CubeProps {
	size: number
}

type CubletPosition = [number, number, number]
type FaceCubletFunction = (i: number, j: number, size: number) => number

const generateCubletPositions = (
	size: number,
	spacing: number
): CubletPosition[] => {
	const positions: CubletPosition[] = []
	for (let i = 0; i < size; i++)
		for (let j = 0; j < size; j++)
			for (let k = 0; k < size; k++)
				positions.push([i * spacing, j * spacing, k * spacing])
	return positions
}

const generateFaceCublets = (
	size: number,
	faceCubletFunction: (i: number, j: number, k: number) => number
): number[] => {
	const cublets: number[] = []
	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			for (let k = 0; k < size; k++) {
				const cubletIndex = faceCubletFunction(i, j, k)
				if (cubletIndex !== undefined) {
					cublets.push(cubletIndex)
				}
			}
		}
	}
	return cublets
}

const Cube: FC<CubeProps> = ({ size }) => {
	const spacing = 1.1
	const { scene } = useThree()

	const cubletPositions = useMemo(
		() => generateCubletPositions(size, spacing),
		[size]
	)

	const faceCubletsFront = useMemo(
		() => generateFaceCublets(size, (i, j, size) => i * size * size + j * size),
		[size]
	)
	const faceCubletsBack = useMemo(
		() =>
			generateFaceCublets(
				size,
				(i, j, size) => i * size * size + j * size + size - 1
			),
		[size]
	)
	const faceCubletsTop = useMemo(
		() =>
			generateFaceCublets(
				size,
				(i, j, size) => i * size * size + size * (size - 1) + j
			),
		[size]
	)
	const faceCubletsBottom = useMemo(
		() => generateFaceCublets(size, (i, j, size) => i * size * size + j),
		[size]
	)
	// const faceCubletsLeft = useMemo(() => {
	// 	return generateFaceCublets(size, (i, j, k) =>
	// 		k === 0 ? i * size * size + j * size : -1
	// 	)
	// }, [size])

	// const faceCubletsRight = useMemo(() => {
	// 	return generateFaceCublets(size, (i, j, k) =>
	// 		k === size - 1 ? i * size * size + j * size : -1
	// 	)
	// }, [size])

	const faces = [
		{ cublets: faceCubletsFront, color: CubeColors.DARK_ORANGE },
		{ cublets: faceCubletsBack, color: CubeColors.BLUE },
		{ cublets: faceCubletsTop, color: CubeColors.WHITE },
		{ cublets: faceCubletsBottom, color: CubeColors.RED }
		// { cublets: faceCubletsLeft, color: CubeColors.YELLOW },
		// { cublets: faceCubletsRight, color: CubeColors.GREEN }
	]
	console.log(faceCubletsFront, 'front')
	console.log(faceCubletsBack, 'back')
	console.log(faceCubletsTop, 'top')
	console.log(faceCubletsBottom, 'bottom')
	// console.log(faceCubletsLeft, 'left')
	// console.log(faceCubletsRight, 'Right')
	return (
		<>
			{faces.map(({ cublets, color }, faceIndex) =>
				cublets.map(cubletIndex => (
					<SimpleCublet
						key={`${faceIndex}-${cubletIndex}`}
						position={cubletPositions[cubletIndex]}
						color={color}
					/>
				))
			)}
		</>
	)
}

const CubeOld: React.FC<CubeProps> = ({ size }) => {
	const spacing = 1.1
	const cubletCount = size * size * size
	const { scene } = useThree()

	const cubletPositions = useMemo(() => {
		const positions: [number, number, number][] = []
		for (let i = 0; i < size; i++) {
			for (let j = 0; j < size; j++) {
				for (let k = 0; k < size; k++) {
					positions.push([i * spacing, j * spacing, k * spacing])
				}
			}
		}
		return positions
	}, [size, spacing, cubletCount])

	return (
		<>
			{cubletPositions.map((position, index) => (
				<Cublet key={index} position={position} />
			))}
		</>
	)
}

function Scene() {
	const { camera } = useThree()
	useFrame(() => {
		camera.lookAt(0, 0, 0)
	})

	return (
		<>
			<ambientLight />
			<pointLight position={[10, 10, 10]} />
			<Stars />
			<Cube size={4} />
			<CubePreforment />
			<Stats />
			<OrbitControls />
		</>
	)
}

function App() {
	return (
		<div className="w-screen h-screen overflow-hidden">
			<Canvas frameloop="demand" camera={{ position: [10, 0, 0], fov: 100 }}>
				<Scene />
			</Canvas>
		</div>
	)
}

export default App
