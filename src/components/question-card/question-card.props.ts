import { IQuestion } from '@/lib/interfaces/questions.interface'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface QuestionCardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  question: IQuestion
  handleEditButton: () => void
  withEdit?: boolean
  index: number
}
