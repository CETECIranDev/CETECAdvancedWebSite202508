import Discovering from '@/components/Discovering'
import Main from '@/components/Main'
import Power from '@/components/Power'
import Workflow from '@/components/Workflow'
import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next'


export default function BrainComputer() {
  return (
    <div>
      <Main></Main>
      <Discovering></Discovering>
      <Workflow></Workflow>
      <Power></Power>
    </div>
  )

}
export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ['new-products', 'common'])),
  },
});

