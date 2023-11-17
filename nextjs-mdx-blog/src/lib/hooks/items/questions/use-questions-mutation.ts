import useSWRInfinite from 'swr/infinite'
import { useQuestionsApi } from './useQuestionsApi'
import { useQuestionsInfo } from './useQuestionsInfo'
import { getQuestionsUrl } from '@/lib/helpers/get-questions-url'
import { ITEMS_PER_PAGE } from '@/lib/constants/items-per-page'
import { IQuestion } from '@/lib/interfaces/questions.interface'
import useSWRMutation from 'swr/mutation'
import { questionsApi } from '@/lib/api/questions.api'
import { useSWRConfig } from 'swr'
import { QUESTIONS_BASE_URL } from '@/lib/constants/urls'

interface UseQuestionsProps {
  categoryURLName: string
  id?: string
}

export const useQuestionsMutation = ({
  id,
  categoryURLName,
}: UseQuestionsProps) => {
  // SWR default function name for pagination.
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null // reached the end
    const questionsUrl = getQuestionsUrl({
      categoryURLName,
    })
    return questionsUrl
  }

  const pathcUrl = `${QUESTIONS_BASE_URL}/${id}`
  const deleteUrl = `${QUESTIONS_BASE_URL}/${id}`
  const postUrl = `${QUESTIONS_BASE_URL}`
  const { mutate } = useSWRConfig()

  const {
    trigger: triggerPatchQuestion,
    isMutating: isPatchQuestionLoading,
    error: patchQuestionError,
  } = useSWRMutation(pathcUrl, questionsApi.patchQuestion)

  const patchQuestion = (snippetPayload) => {
    triggerPatchQuestion(snippetPayload)
    mutate(getKey, snippetPayload)
  }

  const {
    trigger: triggerPostQuestion,
    isMutating: isPostQuestionLoading,
    error: postQuestionError,
  } = useSWRMutation(postUrl, questionsApi.postQuestion)

  const postQuestion = (snippetPayload) => {
    triggerPostQuestion(snippetPayload)
    mutate(getKey, snippetPayload)
  }

  return {
    patchQuestion,
    postQuestion,
    isPatchQuestionLoading,
    isPostQuestionLoading,
    // isLoadingQuestions,
    patchQuestionError,
    getKey,
  }
}
