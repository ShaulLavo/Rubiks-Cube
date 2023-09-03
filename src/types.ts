import { BufferGeometry, Group, Material, Mesh, NormalBufferAttributes } from "three";

export enum RotationAxis {
    X = 0,
    Y = 1,
    Z = 2
}
type CubletEl = Mesh<
    BufferGeometry<NormalBufferAttributes>,
    Material | Material[]
>;

type GroupRefs = Group[];

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

type NormalMatrix = [number, number, number][];

export type { CubletEl, GroupRefs, SetState, NormalMatrix };