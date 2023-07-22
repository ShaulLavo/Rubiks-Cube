import { Box } from '@react-three/drei'
import { CubeColors } from './constants'

interface CubletProps {
	isFaceCublet?: boolean
	position: [number, number, number]
}
interface SimpleCubletProps {
	color: CubeColors
	position: [number, number, number]
}
export const Cublet: React.FC<CubletProps> = ({ position }) => {
	return (
		<Box args={[1, 1, 1]} position={position}>
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
