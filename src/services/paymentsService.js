import axios from 'axios';
import baseUrl from './baseURL';
import accessTokenConfig from './accessToken';

export default class PaymentsService {
    static async fetchPaymentIntent(paymentType, bidAmount) {
        try {
            const url = `${baseUrl()}/get-payment-intent`;
            const response = await axios.post(url,{ data: {
                paymentType,
                bidAmount
            }}, accessTokenConfig());
            return response;

        } catch (error) {
            return error.response;
        }
    }

    static async sendTransactionEmail (paymentType, userId, bidAmount=null) {
        
        try {
            const url = `${baseUrl()}/transaction-alert`;
            const response = await axios.post(url,{ data: {
                paymentType,
                userId,
                bidAmount
            }}, accessTokenConfig());
            return response;
            
        } catch (error) {
            return error.response;
            
        }
    }

}