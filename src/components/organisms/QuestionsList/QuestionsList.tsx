import styles from "./QuestionsList.module.scss";
import axios from "axios";

import React from "react";
import { Question } from "interfaces/questions.interface";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { QuestionsListProps } from "./QuestionsList.props";
import { getQuestionsAsync, selectQuestions } from "store/reducers/Test.slice";
import { ButtonIcon, Card, Modal, QuestionCard, QuestionForm } from "components";


const exampleQuestion: Question = {
  id: 9999,
  question: "What will be output to the console?",
  codeExample: `const example = () => {
    return ExampleCode;
}`,
  answersList: [
    { answer: "first", isCorrect: true },
    { answer: "second", isCorrect: false },
    { answer: "third", isCorrect: false },
    { answer: "fourth", isCorrect: false },
  ],
};

export const QuestionsList = ({
  withEdit = false,
}: QuestionsListProps): JSX.Element => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);

  // const [questions, setQuestions] = React.useState<Question[] | null>(null);

  const [isAddQuestionMode, setIsAddQuestionMode] = React.useState(false);
  const [isEditQuestionMode, setIsEditQuestionMode] = React.useState(false);

  const handleAddQuestionButton = () => {
    setIsAddQuestionMode(true);
  };

  const makeHandleEditButton = (index: number) => {
    return () => {
      setCurrentQuestionIndex(index);
      setIsEditQuestionMode(true);
      getQuestions();
    };
  };

  const questions = useAppSelector(selectQuestions);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    (async function () {
      await getQuestions();
    })();
  }, []);

  const getQuestions = async () => {
    try {
      dispatch(getQuestionsAsync());
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  React.useEffect(() => {
    (async function () {
      await getQuestions();
    })();
  }, []);

  React.useEffect(() => {
    (async function () {
      await getQuestions();
    })();
  }, [isEditQuestionMode, isAddQuestionMode]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <h2>All questions</h2>

        {withEdit && (
        
           <ButtonIcon
           className={styles.addItemButton}
           icon="plus"
           appearance="white"
           onClick={handleAddQuestionButton}
         >Add question</ButtonIcon>
        )}
      </div>
      <div className={styles.container}>
        {questions && questions.length && (
          <>
            {/* Left Column */}
            <div className={styles.column}>
              {questions.map((question, index) => {
                if (index % 2 === 0) {
                  return (
                    <Card className={styles.questionCard} key={question.id}>
                      <QuestionCard
                        withEdit={withEdit}
                        updateQuestions={getQuestions}
                        handleEditButton={makeHandleEditButton(index)}
                        question={question}
                        key={question.id}
                      />
                    </Card>
                  );
                }
              })}
            </div>

            {/* Right Column */}
            <div className={styles.column}>
              {questions.map((question, index) => {
                if (index % 2 !== 0) {
                  return (
                    <Card  className={styles.questionCard} key={question.id} >
                      <QuestionCard
                        withEdit={withEdit}
                        updateQuestions={getQuestions}
                        handleEditButton={makeHandleEditButton(index)}
                        question={question}
                        key={question.id}
                      />
                    </Card>
                  );
                }
              })}
            </div>
          </>
        )}

        {!questions ||
          (!questions.length && (
            <Card className={styles.questionCard}>Empty medication list</Card>
          ))}
      </div>
      {withEdit && isAddQuestionMode && (
        <Modal setIsModalOpen={setIsAddQuestionMode}>
          <QuestionForm
            questionItem={exampleQuestion}
            mode="add"
            setIsModalOpen={setIsAddQuestionMode}
          />
        </Modal>
      )}

      {withEdit && questions && isEditQuestionMode && (
        <Modal setIsModalOpen={setIsEditQuestionMode}>
          <QuestionForm
            questionItem={questions[currentQuestionIndex]}
            mode="edit"
            setIsModalOpen={setIsEditQuestionMode}
          />
        </Modal>
      )}
    </div>
  );
};
