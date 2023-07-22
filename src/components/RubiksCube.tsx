import { Box } from '@react-three/drei'
import { Vector3 } from 'three'
import { CubeColor } from './constants'

interface CubeFaceProps {
	faceColors: CubeColor[]
	position: Vector3
	size: number
}
interface RubiksCubeProps {
	size: number
	solutionCubeState: CubeColor[][]
}

const FACE_POSITIONS = [
	[1, 0, 0], // Right face
	[-1, 0, 0], // Left face
	[0, 1, 0], // Top face
	[0, -1, 0], // Bottom face
	[0, 0, 1], // Front face
	[0, 0, -1] // Back face
] as const

const generateFacePositions = (size: number) => {
	const displacement = (size - 1) / 2
	return [
		[displacement, 0, 0], // Right
		[-displacement, 0, 0], // Left
		[0, displacement, 0], // Up
		[0, -displacement, 0], // Down
		[0, 0, displacement], // Front
		[0, 0, -displacement] // Back
	]
}
const RubiksCube: React.FC<RubiksCubeProps> = ({ solutionCubeState, size }) => {
	const positionVecs = generateFacePositions(size).map(pos =>
		new Vector3().fromArray(pos)
	)

	return (
		<group>
			{solutionCubeState.map((faceColors, faceIndex) => (
				<>
					<CubeFace
						key={faceIndex}
						faceColors={faceColors}
						position={positionVecs[faceIndex]}
						size={size}
					/>
				</>
			))}
		</group>
	)
}

export default RubiksCube
export const CubeFace: React.FC<CubeFaceProps> = ({
	faceColors,
	position,
	size
}) => {
	const gap = 4 // Define the size of the gap here
	const totalSize = size + gap * (size - 1)
	const displacement = (totalSize - 1) / 2
	const createPositions = () =>
		Array.from({ length: size }, (_, i) => i * (1 + gap) - displacement)
	const positionsX = createPositions()
	const positionsY = createPositions()

	return (
		<group position={position}>
			{faceColors.map((color, index) => {
				console.log(color)
				const x = positionsX[index % size]
				const y = positionsY[Math.floor(index / size)]
				return (
					<group position={[x, y, 0]} key={index}>
						<Box args={[1, 1, 1]}>
							<meshStandardMaterial attach="material" color={color} />
						</Box>
						<Box args={[1.02, 1.02, 1.02]}>
							<meshStandardMaterial attach="material" color="black" wireframe />
						</Box>
					</group>
				)
			})}
		</group>
	)
}
