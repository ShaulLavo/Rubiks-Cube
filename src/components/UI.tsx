import { RotationAxis, SetState } from '../types'
import { useStore } from './store'

interface UIProps {}

export const UI = ({}: UIProps) => {
  const setRotationAxis = useStore(state => state.setRotationAxis)
  const rotationAxis = useStore(state => state.rotationAxis)
  return (
    <div className='fixed right-0 top-0 z-50'>
      <div className='inline-flex justify-end items-center bg-opacity-50 bg-blue-100 p-4 rounded-lg backdrop-blur-md opacity-80'>
        <label className='text-lg text-gray-700 mr-2'>
          Select rotation axis
        </label>
        <select
          className='bg-white text-gray-800 p-2 rounded border'
          onChange={e => setRotationAxis(+e.target.value as RotationAxis)}
        >
          <option
            selected={rotationAxis === RotationAxis.X}
            value={RotationAxis.X}
          >
            X
          </option>
          <option
            selected={rotationAxis === RotationAxis.Y}
            value={RotationAxis.Y}
          >
            Y
          </option>
        </select>
      </div>
    </div>
  )
}
