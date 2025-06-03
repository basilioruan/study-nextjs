import { signIn, signOut, useSession } from 'next-auth/react';
import styles from './styles.module.css';
import Link from 'next/link';
import { ReactNode } from 'react';

export function Header() {

  const { data: session, status } = useSession(); 

  const LOADING_STATUS = 'loading';
  const GOOGLE_PROVIDER = 'google';

  const getConditionalLoginButton = (): ReactNode => {
    let button: ReactNode;

    if (status === LOADING_STATUS) {
      button = <></>;
    }
    else if (session) {
      button = <button className={styles.loginButton} onClick={() => signOut()}> Olá, {session.user?.name} </button>;
    }
    else {
      button = <button className={styles.loginButton} onClick={() => signIn(GOOGLE_PROVIDER)}> Acessar </button>;
    }

    return button;
  }

  return (
    <header className={styles.header}>
      <section className={styles.content}>
        <nav className={styles.nav}>
          <Link href='/'>
            <h1 className={styles.logo}>
              Tarefas <span>+</span>
            </h1>
          </Link>

          <Link href='/dashboard' className={styles.link}>
            Meu Painel
          </Link>
        </nav>

        { getConditionalLoginButton() }
      </section>
    </header>
  );
}