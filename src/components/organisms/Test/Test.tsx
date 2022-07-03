import React from "react";
import { useRouter } from "next/dist/client/router";
import styles from "./Test.module.scss";



import { Answer } from "interfaces/questions.interface";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { changeCheckedState, decrementCurrentQuestion, incrementCurrentQuestion, selectCheckedAnswers, selectCurrentQuestion, selectQuestions } from "store/reducers/Test.slice";
import { Button, Checkbox, Code, Divider } from "components";

export const answers = ["[object]", "[null]", "[undefined]", "Error"];

interface AnswersListProps {
  answers: Answer[];
}

const AnswersList = ({ answers }: AnswersListProps): JSX.Element => {
  const currentQuestion = useAppSelector(selectCurrentQuestion);

  const checkedAnswers = useAppSelector(selectCheckedAnswers)[currentQuestion];
  const dispatch = useAppDispatch();

  const handleOnChange = (position: number) => {
    dispatch(
      changeCheckedState({
        questionNumber: currentQuestion,
        answerNumber: position,
      })
    );
  };

  return (
    <div className={styles.answersList}>
      {answers.map((answer, index) => {
        return (
          <li key={answer.answer}>
            <Checkbox
              name={answer.answer}
              value={answer.answer}
              checked={checkedAnswers[index]}
              onChange={() => handleOnChange(index)}
            />
          </li>
        );
      })}
    </div>
  );
};

export const Test = (): JSX.Element => {
  const router = useRouter();

  const questions = useAppSelector(selectQuestions);
  const currentQuestion = useAppSelector(selectCurrentQuestion);
  const initQuestionsStatus = new Array(questions.length).fill(false);
  initQuestionsStatus[currentQuestion] = true;
  const [questionsStatus, setQuestionsStatus] =
    React.useState<boolean[]>(initQuestionsStatus);

  const dispatch = useAppDispatch();

  const [isActiveNextBtn, setIsActiveNextBtn] = React.useState<boolean>(false);

  const checkedState = useAppSelector(selectCheckedAnswers)[currentQuestion];

  React.useEffect(() => {
    checkedState.indexOf(true) !== -1
      ? setIsActiveNextBtn(true)
      : setIsActiveNextBtn(false);
  }, [checkedState]);

  // Handlers.
  const backButtonHandler = () => {
    if (currentQuestion > 0) {
      dispatch(decrementCurrentQuestion());
    }
  };

  const nextButtonHandler = () => {
    if (
      currentQuestion < questions.length - 1 &&
      checkedState.indexOf(true) !== -1
    ) {
      const tmp = [...questionsStatus];
      tmp[currentQuestion + 1] = true;
      setQuestionsStatus(tmp);

      setIsActiveNextBtn(false);

      dispatch(incrementCurrentQuestion());
    }
  };

  const endTestHandler = () => {
    router.push("/testResult");
  };

 

  return (
    <>
      {questions.length && (
        <div className={styles.wrapper}>
          <div className={styles.questionNumbers}>
            {questions.map((question, index) => {
              let spanStyle = "";
              if (currentQuestion == index) {
                spanStyle = styles.currentItem;
              } else if (currentQuestion < index) {
                spanStyle = styles.nextItem;
              }

              return (
                <span className={spanStyle} key={question.id}>
                  {index+1}
                </span>
              );
            })}
          </div>
          <div className={styles.content}>
            <h4 className={styles.questionTitle}>
              {questions[currentQuestion].question}
            </h4>
            <Divider />
            <Code codeExample={questions[currentQuestion].codeExample} />

            <AnswersList answers={questions[currentQuestion].answersList} />
          </div>
          <div className={styles.buttons}>
            {/* <button onClick={backButtonHandler}>Назад</button> */}
            {currentQuestion < questions.length - 1 ? (
              // ? <Button appearance={isActiveNextBtn ? "primary" : "disabled"}  onClick={nextButtonHandler}>Next</Button>
              // : <Button appearance={isActiveNextBtn ? "primary" : "disabled"} onClick={endTestHandler}>Finish test</Button>
              <Button appearance={"primary"} onClick={nextButtonHandler}>
                Next
              </Button>
            ) : (
              <Button appearance={"primary"} onClick={endTestHandler}>
                Finish test
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
};
