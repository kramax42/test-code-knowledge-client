import { getSnippetsUrl } from '@/lib/helpers/get-snippets-url'
import useSWRMutation from 'swr/mutation'
import { snippetsApi } from '@/lib/api/snippets.api'
import { useSWRConfig } from 'swr'
import { SNIPPETS_BASE_URL } from '@/lib/constants/urls'

interface UseSnippetsProps {
  categoryURLName: string
  id?: string
}

export const useSnippetsMutation = ({
  id,
  categoryURLName,
}: UseSnippetsProps) => {
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null // reached the end
    const snippetsUrl = getSnippetsUrl({
      categoryURLName,
    })
    return snippetsUrl
  }

  const pathcUrl = `${SNIPPETS_BASE_URL}/${id}`
  const deleteUrl = `${SNIPPETS_BASE_URL}/${id}`
  const postUrl = `${SNIPPETS_BASE_URL}`
  const { mutate } = useSWRConfig()

  const {
    trigger: triggerPatchSnippet,
    isMutating: isPatchSnippetLoading,
    error: patchSnippetError,
  } = useSWRMutation(pathcUrl, snippetsApi.patchSnippet)

  const patchSnippet = (snippetPayload) => {
    triggerPatchSnippet(snippetPayload)
    mutate(getKey, snippetPayload)
  }

  const {
    trigger: triggerPostSnippet,
    isMutating: isPostSnippetLoading,
    error: postSnippetError,
  } = useSWRMutation(postUrl, snippetsApi.postSnippet)

  const postSnippet = (snippetPayload) => {
    triggerPostSnippet(snippetPayload)
    mutate(getKey, snippetPayload)
  }

  const {
    trigger: triggerDeleteSnippet,
    isMutating: isDeleteSnippetLoading,
    error: deleteSnippetError,
  } = useSWRMutation(deleteUrl, snippetsApi.deleteSnippet)

  const deleteSnippet = () => {
    triggerDeleteSnippet()
    mutate(getKey)
  }

  return {
    patchSnippet,
    postSnippet,
    deleteSnippet,
    isDeleteSnippetLoading,
    isPatchSnippetLoading,
    isPostSnippetLoading,
    // isLoadingSnippets,
    patchSnippetError,
    getKey,
  }
}
