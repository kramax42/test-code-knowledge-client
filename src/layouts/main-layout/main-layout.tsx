import { FC, PropsWithChildren } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'
import { Header } from '@/layouts/header'
import { TailwindBreakpointsIndicator } from '@/components/tailwind-indicator'
import { Container } from '@/components/container/container'
import { Footer } from '../footer'
import { useUser } from '@/lib/hooks'

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  // const { isLoggedIn } = useUser()
  // const router = useRouter()

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     router.replace('/auth/sign-in')
  //   }
  // }, [isLoggedIn])

  // if (!isLoggedIn) {
  //   return (
  //     <Spinner
  //       as="span"
  //       animation="border"
  //       size="sm"
  //       role="status"
  //       aria-hidden="true" />);
  // }

  return (
    <>
      <Head>
        <title>Test code knowledge</title>
        <meta name="description" content="Test code knowledge." />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="typescript, node.js, javascript, test, knowledge"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-background">
        <Header />
        <main className="mb-auto py-5">
          <Container>{children}</Container>
        </main>
        <Footer />

        <TailwindBreakpointsIndicator />
      </div>
    </>
  )
}
