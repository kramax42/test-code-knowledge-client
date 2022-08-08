import * as React from "react";
import Head from "next/head";
import styles from "./AuthLayout.module.scss";
import { AuthLayoutProps } from "./AuthLayout.props";
import { useUser } from "hooks/useUser";
import { useRouter } from "next/router";


const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  description,
  keywords,
}) => {


  const { loggedIn } = useUser();

  const router = useRouter();

  React.useEffect(() => {
    if (loggedIn) router.replace('/');

  }, [loggedIn]);

  if (loggedIn) return <> Redirecting.... </>;

  return (
    <>
      <Head>
        <title>{title || "Test knowledge"}</title>
        <meta name="description" content={`Test knowledge.` + description} />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content={keywords || "javascript, test, knowledge"}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.wrapper}>
        <main className={styles.body}>{children}</main>
      </div>
    </>
  );
};

export type MetaPropsType = Omit<AuthLayoutProps, "children">;

export const withLayout = <T extends Record<string, unknown>>(
  Component: React.FC<T>
) => {
  return function withLayoutComponent(props: T): JSX.Element {
    const metaProps: MetaPropsType = {
      title: `Test knowledge  ${(props?.currentSimulationDimension as string)?.toLowerCase() || ""
        }`,
      description:
        (props?.currentSimulationDimension as string)?.toLowerCase() || "",
    };

    return (
      <AuthLayout {...metaProps}>
        <Component {...props} />
      </AuthLayout>
    );
  };
};
