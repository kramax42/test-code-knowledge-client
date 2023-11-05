import { deepCopy } from '@/lib/helpers/deep-copy'
import { AnswersListProps } from './answers-list.props'
import { Form } from 'react-bootstrap'
// import styles from './AnswersList.module.scss';
const styles = {}

export const AnswersList = ({
  setCheckedAnswers,
  checkedAnswers,
  answers,
  currentQuestion,
}: AnswersListProps): JSX.Element => {
  const handleOnChange = (answerIndex: number) => {
    setCheckedAnswers((checkedAnswers) => {
      const newCheckedAnswers = deepCopy(checkedAnswers)
      newCheckedAnswers[currentQuestion][answerIndex] =
        !newCheckedAnswers[currentQuestion][answerIndex]
      return newCheckedAnswers
    })
  }

  return (
    <div className={styles.answersList}>
      {answers.map((answer, index) => {
        return (
          <li key={answer.answer}>
            <Form.Check
              className={styles.formCheck}
              type={'checkbox'}
              id={answer.answer}
              label={answer.answer}
              value={answer.answer}
              checked={checkedAnswers[currentQuestion][index]}
              onChange={() => handleOnChange(index)}
            />
          </li>
        )
      })}
    </div>
  )
}
