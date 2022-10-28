import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Languangs } from 'types/i18n'
import { Button } from '@chakra-ui/react'
import router from 'next/router'

export default function Custom404() {
  return (
    <div className="page-container">
      <div className="notfound-404">404</div>
      <h2>Oops! This Page Could Not Be Found</h2>
      <p>
        Sorry but the page you are looking for does not exist, have been
        removed. name changed or is temporarily unavailable
      </p>
      <Button
        m="2"
        textAlign="start"
        colorScheme="blue"
        onClick={() => {
          router.push('/')
        }}>
        Go To Map
      </Button>
    </div>
  )
}

export async function getStaticProps({ locale }: { locale: Languangs }) {
  return {
    props: {
      ...(await serverSideTranslations(locale))
      // Will be passed to the page component as props
    }
  }
}
