import React from 'react'
import {  Image, Container, Title, Text, Button, SimpleGrid } from '@mantine/core';
import './PageNotFoundStyle.css'
import NotFound from '../../Resources/Images/NotFound.webp'
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
    const navigate = useNavigate();
  return (
    <Container className='root'>
      <SimpleGrid spacing={80} cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1, spacing: 40 }]}>
        <div>
          <Title className='title' >Something is not right...</Title>
          <Text color="dimmed" size="lg">
            Page you are trying to open does not exist. You may have mistyped the address, or the
            page has been moved to another URL. If you think this is an error contact support.
          </Text>
          <Button onClick={()=> navigate('../home', {replace: true})} className='control' variant="outline" size="md" mt="xl" >
            Get back to home page
          </Button>
        </div>
        <Image  src={NotFound} />
      </SimpleGrid>
    </Container>
  )
}

export default PageNotFound