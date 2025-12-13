import React, { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../hooks/useAxiosSecure';

const SuccesPage = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    console.log(sessionId);
    const axiosSecure = useAxiosSecure();
    const hasCalled = useRef(false);

    useEffect(() => {
        if (!sessionId || hasCalled.current) return;

        hasCalled.current = true;

        if (sessionId) {
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
                .then(res => {
                    console.log(res.data);
                })
        }
    }, [sessionId, axiosSecure])

    return (
        <div>
            <h3 className='text-3xl font-bold'>Success</h3>
        </div>
    );
};

export default SuccesPage;