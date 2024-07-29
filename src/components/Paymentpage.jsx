import React from 'react';
import axios from 'axios';

function Paymentpage() {
    const handlePayment = () => {
        const options = {
          key: 'Ec76fe9TEqSgbYTsdMrSTN8K', // Replace with your Razorpay Key ID
          amount: '49000', // Amount in paise (e.g., 50000 paise = INR 500)
          currency: 'INR',
          name: 'Om Hr',
          description: 'Test Transaction',
          image: 'https://example.com/your_logo.png',
           // Your logo or any image
          handler: function (response) {
            alert('Payment Successful');
            console.log(response);
            // You can send the payment response to your backend here for verification if needed
          },
          prefill: {
            name: 'John Doe',
            email: 'john@example.com',
            contact: '9999999999'
          },
          theme: {
            color: '#3399cc'
          }
        };
    
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      };
    
      return (
        <button onClick={handlePayment} className="btn btn-primary">
          Pay with Razorpa
        </button>
      );
    };

export default Paymentpage;