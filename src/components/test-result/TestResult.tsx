import React from "react";
import { Code } from "..";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {Checkbox} from "../checkbox/Checkbox";
import styles from "./TestResult.module.scss";
import {
  changeUserCorrectAnswers,
  resetState,
  selectCheckedAnswers,
  selectQuestions,
  selectUserAnswersStatus,
} from "../test/Test.slice";
import { Card } from "../card/Card";
import { Button } from "../button/Button";
import { useRouter } from "next/dist/client/router";
import { Divider } from "../divider/Divider";
import Tag from "../tag/Tag";
import cn from "clsx";
interface IProps {
  answers: string[];
  currentQuestion: number;
}

const AnswersListResult: React.FC<IProps> = ({ answers, currentQuestion }) => {
  const checkedAnswers = useAppSelector(selectCheckedAnswers)[currentQuestion];
  const correctAnswers =
    useAppSelector(selectQuestions)[currentQuestion].correctAnswers;
  const answersList =
    useAppSelector(selectQuestions)[currentQuestion].answersList;

  const dispatch = useAppDispatch();

  const getAnswerLabel = (index: number, isMarked: boolean) => {
    // 'correct' - answer marked and it`s correct.
    // 'error' - answer marked and it`s incorrect.
    // 'empty' - answer unmarked and it`s correct.
    // 'missing' - answer unmarked and it`s incorrect.
    let result: "correct" | "error" | "empty" | "missing" = "error";

    if (isMarked) {
      correctAnswers.indexOf(answersList[index]) !== -1
        ? (result = "correct")
        : (result = "error");
    } else {
      correctAnswers.indexOf(answersList[index]) === -1
        ? (result = "empty")
        : (result = "missing");
    }

    if (result === "error" || result === "missing") {
      dispatch(
        changeUserCorrectAnswers({
          questionNumber: currentQuestion,
          isCorrect: false,
        })
      );
    }
    switch (result) {
      case "error":
        return (
        
        <Tag className={styles.tag} color="error">Error</Tag>
        );
      case "correct":
        return (
        
          <Tag className={styles.tag} color="success">Correct</Tag>
        );
      case "missing":
        return (
        
          <Tag className={styles.tag} color="info">Missing correct</Tag>
        );
    }
  };

  // console.log(currentQuestion, '\n')
  // console.log('checkedAnswers: ', checkedAnswers)
  // console.log('correctAnswers: ', correctAnswers)
  // console.log('answersList: ', answersList)

  return (
    <>
      {/* <ol className={styles.answersList}> */}
      {answers.map((answer, index) => {
        return (
          <li className={styles.answersList} key={index ** 2}>
            <Checkbox
              name={answer}
              value={answer}
              checked={checkedAnswers[index]}
              disabled
            />
            {getAnswerLabel(index, checkedAnswers[index])}
          </li>
        );
      })}
      {/* </ol> */}
    </>
  );
};

const TestResult: React.FC = () => {
  const questions = useAppSelector(selectQuestions);
  const userAnswersStatus = useAppSelector(selectUserAnswersStatus);
  const dispatch = useAppDispatch();

  const router = useRouter();

  const newTestButtonHandler = () => {
    dispatch(resetState());
    router.push("/test");
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <h1>
          Correct answers:{" "}
            {
              userAnswersStatus.filter((answerStatus) => answerStatus === true)
                .length
            }
             {" "}из {userAnswersStatus.length}
          </h1>
          {questions.map((question, index) => {
            return (
              <Card className={cn(styles.card, {
                [styles.successCard]: userAnswersStatus[index],
                [styles.errorCard]: !userAnswersStatus[index]
              })}
              
               key={index+question.question}>
                <h2 className={styles.questionTitle}>Question № {index + 1}</h2>
                <Divider />
                <h3 className={styles.questionTitle}>
                  {questions[index].question}
                </h3>
                <Code exampleCode={questions[index].exampleCode} />

                <AnswersListResult
                  answers={questions[index].answersList}
                  currentQuestion={index}
                />
            
              </Card>
            );
          })}
          <Button appearance="primary" onClick={newTestButtonHandler}>
            New test
          </Button>
        </div>
      </div>
    </>
  );
};

export default TestResult;
