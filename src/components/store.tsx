import { Group } from 'three'
import { create } from 'zustand'
import { RotationAxis } from '../types'

interface StoreState {
  rotationAxis: RotationAxis
  setRotationAxis: (rotationAxis: RotationAxis) => void
}

export const useStore = create<StoreState>(set => ({
  rotationAxis: 1 as RotationAxis,
  setRotationAxis: (rotationAxis: RotationAxis) => set({ rotationAxis })
}))
