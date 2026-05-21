// Test script for email API
// Run with: node test-email-api.js

const testContactAPI = async () => {
  console.log('🧪 Testing Contact Form API...\n');
  
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Test Email from NDcreations',
    message: 'This is a test message to verify the email backend is working correctly.'
  };

  try {
    const response = await fetch('http://localhost:3000/api/send-contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Contact API Test PASSED');
      console.log('Response:', result);
    } else {
      console.log('❌ Contact API Test FAILED');
      console.log('Error:', result);
    }
  } catch (error) {
    console.log('❌ Contact API Test FAILED');
    console.log('Error:', error.message);
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
};

const testBookingAPI = async () => {
  console.log('🧪 Testing Service Booking API...\n');
  
  const testData = {
    name: 'Test Client',
    email: 'client@example.com',
    serviceType: 'AI Development',
    budget: '$3,000 - $5,000 (₹2.5L - ₹4.2L)',
    message: 'This is a test booking to verify the email backend is working correctly.'
  };

  try {
    const response = await fetch('http://localhost:3000/api/send-booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Booking API Test PASSED');
      console.log('Response:', result);
    } else {
      console.log('❌ Booking API Test FAILED');
      console.log('Error:', result);
    }
  } catch (error) {
    console.log('❌ Booking API Test FAILED');
    console.log('Error:', error.message);
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
};

const runTests = async () => {
  console.log('\n' + '='.repeat(50));
  console.log('🚀 NDcreations Email Backend Test Suite');
  console.log('='.repeat(50) + '\n');
  
  console.log('⚠️  Make sure:');
  console.log('   1. Dev server is running (npm run dev)');
  console.log('   2. RESEND_API_KEY is set in .env.local');
  console.log('   3. Server has been restarted after adding API key\n');
  console.log('='.repeat(50) + '\n');
  
  await testContactAPI();
  await testBookingAPI();
  
  console.log('✅ All tests completed!');
  console.log('📧 Check your email at: ndcreation139@gmail.com\n');
};

runTests();
