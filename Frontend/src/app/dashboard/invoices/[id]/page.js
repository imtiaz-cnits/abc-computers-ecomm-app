import SingleInvoice from '@/Pages/DashboardPages/SingleInvoice/SingleInvoice';
import React from 'react';

const InvoicePage = async ({ params }) => {

    const { id } = await params

    return (
        <>
            <SingleInvoice id={id} />
        </>
    );
};

export default InvoicePage;