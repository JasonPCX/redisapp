import Head from 'next/head'
import { Tab, Tabs } from 'react-bootstrap';
import { useState } from 'react';

import CreateCarForm from '@/lib/CreateCarForm';
import SearchCar from '@/lib/SearchCar';

export default function Home() {
  const [key, setKey] = useState('create')
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div style={{ height: "100vh" }} className="bg-light py-4">
        <div className='container rounded bg-white px-5 py-4'>
          <Tabs activeKey={key} fill onSelect={(k) => setKey(k)}>
            <Tab eventKey='create' title='Create Data'>
              <CreateCarForm />
            </Tab>
            <Tab eventKey='search' title='Search Data'>
              <SearchCar />
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
}