import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Center, Spinner, Text, VStack, Alert, AlertIcon } from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';
import { processOAuthCallback } from '../api/authService';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get token from URL query parameters
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        
        if (token) {
          // Process the OAuth callback
          await processOAuthCallback(token);
          
          // Redirect to dashboard or profile page
          setTimeout(() => {
            navigate('/dashboard');
          }, 1500); // Small delay to show loading state
        } else {
          // No token found, redirect to login
          setError('Authentication failed: No token provided');
          setTimeout(() => {
            navigate('/login', { state: { error: 'Authentication failed' } });
          }, 3000);
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        setError('Authentication failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
        setTimeout(() => {
          navigate('/login', { state: { error: 'Authentication failed' } });
        }, 3000);
      }
    };
    
    // If not already authenticated, process the callback
    if (!isAuthenticated) {
      handleCallback();
    } else {
      navigate('/dashboard');
    }
  }, [location, navigate, isAuthenticated]);
  
  return (
    <Center h="100vh">
      <VStack spacing={4}>
        {error ? (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        ) : (
          <>
            <Spinner size="xl" color="blue.500" thickness="4px" />
            <Text fontSize="lg">Completing authentication...</Text>
          </>
        )}
      </VStack>
    </Center>
  );
};

export default AuthCallback; 