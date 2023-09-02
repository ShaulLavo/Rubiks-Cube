import { useThree } from "@react-three/fiber";
import { Cublet } from "./components/Cublet";
import { FC, useMemo } from "react";
import { CubeColors } from "./components/constants";

function CubePreforment() {
    const spacing = 1.1;
    const length = 3;
    return (
        <>
        {
            Array.from({ length }, (_, i) =>
                Array.from({ length }, (_, j) =>
                    Array.from({ length }, (_, k) => (
                        <Cublet
							key= {`${i}-${j}-${k}`}
							position = { [i * spacing, j * spacing, k * spacing]}
        />
					))
				)
			)
}
</>
	)
}
interface CubeProps {
    size: number;
}

type CubletPosition = [number, number, number];
type FaceCubletFunction = (i: number, j: number, size: number) => number;

const generateCubletPositions = (
    size: number,
    spacing: number
): CubletPosition[] => {
    const positions: CubletPosition[] = [];
    for (let i = 0;i < size;i++)
        for (let j = 0;j < size;j++)
            for (let k = 0;k < size;k++)
                positions.push([i * spacing, j * spacing, k * spacing]);
    return positions;
};

const generateFaceCublets = (
    size: number,
    faceCubletFunction: FaceCubletFunction
): number[] => {
    const cublets: number[] = [];
    for (let i = 0;i < size;i++)
        for (let j = 0;j < size;j++) cublets.push(faceCubletFunction(i, j, size));
    return cublets;
};

const Cube: FC<CubeProps> = ({ size }) => {
    const spacing = 1.1;
    const { scene } = useThree();

    const cubletPositions = useMemo(
        () => generateCubletPositions(size, spacing),
        [size]
    );

    const faceCubletsFront = useMemo(
        () => generateFaceCublets(size, (i, j, size) => i * size * size + j * size),
        [size]
    );
    const faceCubletsBack = useMemo(
        () =>
            generateFaceCublets(
                size,
                (i, j, size) => i * size * size + j * size + size - 1
            ),
        [size]
    );
    const faceCubletsTop = useMemo(
        () =>
            generateFaceCublets(
                size,
                (i, j, size) => i * size + size * (size - 1) * size + j
            ),
        [size]
    );
    const faceCubletsBottom = useMemo(
        () => generateFaceCublets(size, (i, j, size) => i * size + j),
        [size]
    );
    const faceCubletsLeft = useMemo(
        () => generateFaceCublets(size, (i, j, size) => i * size * size + j * size),
        [size]
    );
    const faceCubletsRight = useMemo(
        () =>
            generateFaceCublets(
                size,
                (i, j, size) => (i + 1) * size * size - size + j * size
            ),
        [size]
    );

    const faces = [
        { cublets: faceCubletsFront, color: CubeColors.DARK_ORANGE },
        { cublets: faceCubletsBack, color: CubeColors.BLUE },
        { cublets: faceCubletsTop, color: CubeColors.WHITE },
        { cublets: faceCubletsBottom, color: CubeColors.RED },
        { cublets: faceCubletsLeft, color: CubeColors.YELLOW },
        { cublets: faceCubletsRight, color: CubeColors.GREEN }
    ];
    console.log(faceCubletsFront, 'front');
    console.log(faceCubletsBack, 'back');
    console.log(faceCubletsTop, 'top');
    console.log(faceCubletsBottom, 'bottom');
    console.log(faceCubletsLeft, 'left');
    console.log(faceCubletsRight, 'Right');
    return (
        <>
        {
            faces.map(({ cublets, color }, faceIndex) =>
                cublets.map(cubletIndex => (
                    <SimpleCublet
						key= {`${faceIndex}-${cubletIndex}`}
						position = { cubletPositions[cubletIndex]};
    color = { color }
        />
				))
			)}
</>
	)
}