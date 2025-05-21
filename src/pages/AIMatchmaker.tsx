import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Input,
  Button,
  SimpleGrid,
  Card,
  CardBody,
  Badge,
  List,
  ListItem,
  ListIcon,
  useToast,
} from '@chakra-ui/react';
import { MdCheckCircle } from 'react-icons/md';
import { useQuery } from 'react-query';
import { ServiceRecommendation } from '../types';
import { getServiceRecommendations } from '../services/ai';

const AIMatchmaker: React.FC = () => {
  const [userQuery, setUserQuery] = useState('');
  const toast = useToast();

  const { data: recommendations, isLoading, error, refetch } = useQuery<ServiceRecommendation[]>(
    ['recommendations', userQuery],
    () => getServiceRecommendations(userQuery),
    {
      enabled: false,
      retry: 1,
    }
  );

  const handleSearch = async () => {
    if (!userQuery.trim()) {
      toast({
        title: 'Please enter your needs',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    refetch();
  };

  return (
    <Container maxW="container.xl">
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading size="xl" mb={4}>
            AI Service Matchmaker
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Tell us what you're looking for, and we'll find the perfect services for you
          </Text>
        </Box>

        <Box>
          <VStack spacing={4}>
            <Input
              size="lg"
              placeholder="E.g., Looking for a phone plan under $30 with international calling"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
            />
            <Button
              size="lg"
              width="full"
              onClick={handleSearch}
              isLoading={isLoading}
            >
              Find Services
            </Button>
          </VStack>
        </Box>

        {error && (
          <Box p={4} bg="red.50" color="red.500" borderRadius="md">
            An error occurred while fetching recommendations. Please try again.
          </Box>
        )}

        {recommendations && recommendations.length > 0 && (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {recommendations.map((rec) => (
              <Card key={rec.id}>
                <CardBody>
                  <Badge colorScheme="blue" mb={2}>
                    {rec.type}
                  </Badge>
                  <Heading size="md" mb={2}>
                    {rec.provider}
                  </Heading>
                  <Text color="gray.600" mb={4}>
                    {rec.plan}
                  </Text>
                  <Text fontWeight="bold" mb={2}>
                    ${rec.cost}/month
                  </Text>
                  <List spacing={2}>
                    {rec.features.map((feature, index) => (
                      <ListItem key={index}>
                        <ListIcon as={MdCheckCircle} color="green.500" />
                        {feature}
                      </ListItem>
                    ))}
                  </List>
                  <Button
                    mt={4}
                    width="full"
                    as="a"
                    href={rec.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn More
                  </Button>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Container>
  );
};

export default AIMatchmaker; 