import React, { useEffect } from 'react';
import { useState } from 'react';
import './invoice.css';


function NewInvoice({invoiceData,mode,project}) {
    useEffect(()=>{

    },[])
    return (<>
        <div className="invoice-box">
                <table cellPadding={0} cellSpacing={0}>
                    <tbody>
                    <tr className="top">
                        <td colSpan={2}>
                            <table>
                                <tbody>
                                <tr>
                                    <td className="title">
                                        <h1>{'Provide Company Name'}</h1>
                                        <button className="print_btn print" onClick={() => { window.print(); }}>Print</button>
                                    </td>
                                </tr>
                                <tr>

                                    <td>
                                        Invoice #: {invoiceData?.id?.slice(0,5)}<br />
                                        Created: {invoiceData.date}<br />
                                        Due: February 1, 2015
                                    </td>
                                </tr>
                                </tbody>
                            </table>

                        </td>
                    </tr>
                    <tr className="information">
                        <td colSpan={2}>
                            <table>
                                <tbody>
                                <tr>
                                    <td>
                                        Sparksuite, Inc.<br />
                                        12345 Sunny Road<br />
                                        Sunnyville, CA 12345
                                    </td>

                                    <td>
                                        Acme Corp.<br />
                                        John Doe<br />
                                        john@example.com
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr className="heading">
                        <td>Payment Method</td>

                        <td>Amount</td>
                    </tr>

                    <tr className="details">
                        <td>{mode.map((md)=>md.id===invoiceData.PaymentModeId?md.mode:"")}</td>

                        <td>1000</td>
                    </tr>

                    <tr className="heading">
                        <td>Project</td>

                        <td>Price</td>
                    </tr>

                    <tr className="item">
                        <td>{project.map((pr)=>pr.id===invoiceData.ProjectId?pr.name:"")}</td>

                        <td>$300.00</td>
                    </tr>

                    <tr className="item">
                        <td>Hosting (3 months)</td>

                        <td>$75.00</td>
                    </tr>

                    <tr className="item last">
                        <td>Domain name (1 year)</td>

                        <td>$10.00</td>
                    </tr>

                    <tr className="total">
                        <td></td>

                        <td>Total: $385.00</td>
                    </tr>
                    </tbody>
                </table>
            </div>
    
    
    
    </>  );
}

export default NewInvoice;