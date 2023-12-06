import { useQuestionsInfo, useSnippetsInfo } from '@/lib/hooks'
import { useRouter } from 'next/router'
import { Button } from '../ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../ui/card'

import {
  SquareCode,
  ShieldQuestion,
  MoveRight,
  ShieldCheck,
  Scissors,
  HelpCircle,
} from 'lucide-react'
import Link from 'next/link'
import { Icons } from '../icons'

export const CategoryCards = () => {
  const router = useRouter()

  const { questionsInfo, isLoadingQuestionsInfo } = useQuestionsInfo()
  const { snippetsInfo, isLoadingSnippetsInfo } = useSnippetsInfo()

  const passTestButtonHandler = (category: string) => () => {
    const categoryQuestionsAmount = questionsInfo[category].amount
    const defaultQuestionsForTestSize = 5

    const sizeInQuery =
      categoryQuestionsAmount < defaultQuestionsForTestSize
        ? categoryQuestionsAmount
        : defaultQuestionsForTestSize
    router.replace(
      `/test/${questionsInfo[category].categoryURLName}?questionsAmount=${sizeInQuery}`,
    )
  }

  if (isLoadingQuestionsInfo || isLoadingSnippetsInfo) {
    return <>spinner</>
  }

  return (
    <>
      <div className="mx-auto flex flex-wrap gap-5 justify-center">
        {Object.keys(questionsInfo).map((category) => {
          return (
            <Card className="w-[280px]" key={category}>
              <CardHeader>
                <CardTitle className="tracking-wide flex justify-center text-3xl before:mr-3 before:text-primary before:content-['{'] after:ml-3 after:text-primary after:content-['}']">
                  {category}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap justify-center gap-5 pb-5 align-middle">
                <Button asChild size="lg" className="w-full text-lg  before:mr-3 before:text-primary before:text-xl before:content-['-?-'] after:text-xl after:ml-3 after:text-primary after:content-['-?-']" variant="outline">
                  <Link
                    href={`/questions/${questionsInfo[category].categoryURLName}`}
                  >
                    {/* <HelpCircle className="mr-1 text-8xl" />  */}
                    Questions
                  </Link>
                </Button>
                {snippetsInfo[category] && (
                  <Button asChild size="lg" className="w-full text-lg  before:mr-3 before:text-primary before:text-xl before:content-['///'] after:text-xl after:ml-3 after:text-primary after:content-['///']" variant="outline">
                  
          
                    <Link
                      href={`/snippets/${questionsInfo[category].categoryURLName}`}
                    >
                      {/* <Scissors className="mr-1" />  */}
                      Snippets
                      {/* <Icons.arrowRight /> */}
                    </Link>
                  </Button>
                )}
                <Button
                  size="lg"
                  className="w-full text-lg  before:mr-3 before:text-white before:text-xl before:content-['|||'] after:text-xl after:ml-3 after:text-white after:content-['|||']"
                  onClick={passTestButtonHandler(category)}
                >
                  {/* <ShieldCheck className="mr-1" /> */}
                  Test
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </>
  )
}
