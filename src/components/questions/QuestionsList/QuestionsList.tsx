import React from 'react';
import styles from './QuestionsList.module.scss';
import { IQuestionsListProps } from './QuestionsList.props';
import { BsPlusLg } from 'react-icons/bs';
import { Button, Card, Modal } from 'react-bootstrap';
import { useUser } from 'hooks/useUser';
import { useRouter } from 'next/router';
import { useQuestionsInfo } from 'hooks';
import { QuestionCard } from '../QuestionCard/QuestionCard';
import { questionExample } from '../QuestionForm/questionExample';
import { QuestionForm } from '../QuestionForm/QuestionForm';

export const QuestionsList = ({
	questions,
	category: currentCategory
}: IQuestionsListProps): JSX.Element => {
	const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);

	const [isAddQuestionMode, setIsAddQuestionMode] = React.useState(false);
	const [isEditQuestionMode, setIsEditQuestionMode] = React.useState(false);

	const { isLoggedIn, isAdmin } = useUser();

	const { questionsInfo } = useQuestionsInfo();

	const handleAddQuestionButton = () => {
		setIsAddQuestionMode(true);
	};

	const makeHandleEditButton = (index: number) => {
		return () => {
			setCurrentQuestionIndex(index);
			setIsEditQuestionMode(true);
		};
	}

	const router = useRouter();
	const categoryButtonHandler = (category: string) => {
		router.push('/questions/' + category);
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				<div className={styles.categoryButtons}>
					{Object.keys(questionsInfo).map(category => {
						return (
							<Button
								variant={category == currentCategory ? 'primary' : 'secondary'}
								className={category == currentCategory ? '' : styles.inActiveButton}
								key={category}
								onClick={() => categoryButtonHandler(category)}
							>
								{`${category}: ${questionsInfo[category]}`}
							</Button>
						);
					})}
				</div>

				{isLoggedIn && isAdmin && (
					<BsPlusLg
						className={styles.addQuestionButton}
						onClick={handleAddQuestionButton}
					/>
				)}
			</div>
			<div className={styles.container}>
				{questions && questions.length && (
					<>
						<div className={styles.column}>
							{questions.map((question, index) => {
								return (
									<Card
										className={styles.questionCard}
										key={question.id}
									>
										<QuestionCard
											withEdit={isLoggedIn && isAdmin}
											handleEditButton={makeHandleEditButton(index)}
											question={question}
											key={question.id}
											index={index + 1}
										/>
									</Card>
								);

							})}
						</div>


					</>
				)}

				{!questions ||
					(!questions.length && (
						<Card className={styles.questionCard}>Empty medication list</Card>
					))}
			</div>
			{isLoggedIn && isAddQuestionMode && (
				// <Modal setIsModalOpen={setIsAddQuestionMode}>
				<Modal size='lg' show={isAddQuestionMode} onHide={() => setIsAddQuestionMode(false)}>
					<Modal.Body>
						<QuestionForm
							questionItem={questionExample}
							mode="add"
							setIsModalOpen={setIsAddQuestionMode}
						/>
					</Modal.Body>
				</Modal>
			)}

			{isLoggedIn && questions && isEditQuestionMode && (
				// <Modal setIsModalOpen={setIsEditQuestionMode}>
				<Modal size='lg' show={isEditQuestionMode} onHide={() => setIsEditQuestionMode(false)}>
					<Modal.Body>
						<QuestionForm
							questionItem={questions[currentQuestionIndex]}
							mode="edit"
							setIsModalOpen={setIsEditQuestionMode}
						/>
					</Modal.Body>
				</Modal>
			)}
		</div>
	);
};