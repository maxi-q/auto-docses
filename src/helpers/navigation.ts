import { NavigateFunction } from 'react-router-dom'

export const ChangeDocument = (id: string, index: number, navigate: NavigateFunction) => {
  navigate(`/LoadPage/${id}/${index}`)
}