import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react'
import React, { useState } from 'react'
import "./AddressDialog.css"

export default function AddressDialog({address}) {
    const [showAddress,setShowAddress]=useState(false);
    const handleShowAddress=()=>setShowAddress(!showAddress);

    return (
        <> 
            <Button onClick={handleShowAddress} className='text-sm px-2 bg-primary' >Address</Button>
            <Dialog open={showAddress} handler={handleShowAddress} >
                <DialogHeader>
                    Address of this Order:
                </DialogHeader>
                <DialogBody>
                        <div className="my-grid  text-sm w-[200px] sm:text-lg sm:w-[375px] " >
                            <b>Name </b><b >:</b><p > {address.name}</p>
                            <b>Email </b><b>:</b><p> {address.email}</p>
                            <b>phone1 </b><b>:</b><p> {address.phone1}</p>
                            <b>phone2 </b><b>:</b><p> {address.phone2}</p>
                            <b>City </b><b >:</b><p >{address.city}</p>
                            <b>Street </b><b>:</b><p> {address.street}</p>
                            <b>House Number </b><b>:</b><p> {address.houseNo}</p>
                            <b>Pin Code </b><b>:</b><p> {address.pinCode}</p>
                            <b>LandMark </b><b>:</b><p> {address.landMark}</p>

                        </div>
                </DialogBody>
                <DialogFooter>
                    <Button onClick={handleShowAddress} color='green' variant='gradient'>Close</Button>
                </DialogFooter>
            </Dialog>    
        </>
    )
}
