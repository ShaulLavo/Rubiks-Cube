import { Group } from 'three'
import { create } from 'zustand'
import { RotationAxis } from '../types'
type Rotation = {
  faceRef: Group
  rotation: [number, number, number]
  axis: RotationAxis
}

interface StoreState {
  rotationAxis: RotationAxis
  rotations: Rotation[] | []
  setRotationAxis: (rotationAxis: RotationAxis) => void
  addRotation: (rotation: Rotation) => void
}

export const useStore = create<StoreState>(set => ({
  rotationAxis: 1 as RotationAxis,
  rotations: [],
  setRotationAxis: (rotationAxis: RotationAxis) => set({ rotationAxis }),
  addRotation: (rotation: Rotation) =>
    set(state => ({
      rotations: [...state.rotations, rotation]
    }))
}))
