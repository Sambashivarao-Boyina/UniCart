import React from 'react'
import DataTable from 'react-data-table-component'
import styled, { keyframes } from 'styled-components';


const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
	margin: 16px;
	animation: ${rotate360} 1s linear infinite;
	transform: translateZ(0);
	border-top: 2px solid grey;
	border-right: 2px solid grey;
	border-bottom: 2px solid grey;
	border-left: 4px solid black;
	background: transparent;
	width: 80px;
	height: 80px;
	border-radius: 50%;
`;

const coustomStyles={
	headCells:{
		style:{
			fontSize:"1rem",
			color:"white",
			fontWeight:"500",
			backgroundColor:"blue",
			
		},
	},
	cells:{
		style:{
			width:"auto"
		}
	}
}

const CustomLoader = () => (
	<div style={{ padding: '24px' }}>
		<Spinner />
		<div>Fancy Loader...</div>
	</div>
);

export default function OrdersTable({columns,data,pending}) {
    return (
        <div className='mx-auto p-4  mt-4 lg:w-10/12'>
			<h1 className="p-2 text-xl md:text-3xl font-bold">Order's Details:</h1>
			<DataTable
				className="w-[800px]"
				columns={columns}
				data={data}
				progressPending={pending}
				progressComponent={<CustomLoader />}
				fixedHeader={true}
				customStyles={coustomStyles}
				pagination

			/> 
		</div>
    )
}
