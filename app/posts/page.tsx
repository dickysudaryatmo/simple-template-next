"use client"; // This directive remains crucial

import React, { useState, useEffect, useMemo } from 'react';
import DataTable, { defaultThemes } from 'react-data-table-component';
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import  SidebarLayout  from "@/components/layout/sidebar-layout";
import { RotateCcw } from 'lucide-react';

const customStyles = {
	header: {
		style: {
			minHeight: '56px',
		},
	},
	headRow: {
		style: {
			borderTopStyle: 'solid',
			borderTopWidth: '1px',
			borderTopColor: defaultThemes.default.divider.default,
            fontSize: '16px',
            fontWeight: 'bold',
            backgroundColor: 'rgba(185, 185, 185, 0.9)'
		},
	},
	headCells: {
		style: {
			'&:not(:last-of-type)': {
				borderRightStyle: 'solid',
				borderRightWidth: '1px',
				borderRightColor: defaultThemes.default.divider.default,
			},
		},
	},
	cells: {
		style: {
			'&:not(:last-of-type)': {
				borderRightStyle: 'solid',
				borderRightWidth: '1px',
				borderRightColor: defaultThemes.default.divider.default,
			},
		},
	},
};

const columns = [
	{
		name: 'ID',
		selector: (row: any) => row.id,
		sortable: true,
	},
	{
		name: 'Title',
		selector: (row: any) => row.title,
		sortable: true,
	},
	{
		name: 'Body',
		selector: (row: any) => row.body,
		sortable: true,
        wrap: true
	},
];

// A simple reusable filter component
const FilterComponent = ({ filterText, onFilter, onClear }: { filterText: string, onFilter: (e: React.ChangeEvent<HTMLInputElement>) => void, onClear: () => void }) => (
	<>
        <div className="flex w-full max-w-sm items-center gap-2">
            <Input id="search" type="text"placeholder="Filter by Title or Body" aria-label="Search Input" value={filterText} onChange={onFilter} />
            <Button onClick={onClear} type="submit" variant="outline">
                <RotateCcw />
            </Button>
        </div>
		{/* <input
			id="search"
			type="text"
			placeholder="Filter by Title or Body"
			aria-label="Search Input"
			value={filterText}
			onChange={onFilter}
			style={{ height: '40px', width: '250px', padding: '0 10px', borderRadius: '5px', border: '1px solid #ccc' }}
		/>
		<button type="button" onClick={onClear} style={{ marginLeft: '10px', height: '40px', padding: '0 15px', borderRadius: '5px', border: '1px solid #ccc', cursor: 'pointer' }}>
			X
		</button> */}
	</>
);


export default function PostsPage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('https://jsonplaceholder.typicode.com/posts');
				const json = await response.json();
				setData(json);
				setLoading(false);
			} catch (error) {
				console.error('Error fetching data: ', error);
                setLoading(false);
			}
		};

		fetchData();
	}, []);

	// Filter data based on the user's input
	const filteredItems = data.filter(
		(item: any) => (item.title && item.title.toLowerCase().includes(filterText.toLowerCase())) ||
                       (item.body && item.body.toLowerCase().includes(filterText.toLowerCase()))
	);

	// Memoize the sub-header component to avoid re-rendering on every input change
	const subHeaderComponentMemo = useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};

		return (
			<FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
		);
	}, [filterText, resetPaginationToggle]);


	return (
        <div>
            <SidebarLayout>
                <div className="relative flex w-full flex-1 flex-col">
                    <div className="flex-1 p-2 md:p-4">
                        <header className="flex items-center h-10 px-4 border-b">
                        <h1 className="text-lg font-semibold">Post List</h1>
                        </header>
                        <main className="py-4">
                            <div className="mt-6">
                                <Card>
                                    <div className='pr-4 pl-4'>
                                        <DataTable
                                            // title="Post List"
                                            columns={columns}
                                            data={filteredItems} // Pass the filtered data to the table
                                            customStyles={customStyles}
                                            progressPending={loading}
                                            pagination
                                            paginationResetDefaultPage={resetPaginationToggle} // Resets pagination to page 1 when filter text changes
                                            subHeader // Enables the sub-header area
                                            subHeaderComponent={subHeaderComponentMemo} // Your custom filter component
                                            selectableRows
                                            dense
                                        />

                                    </div>
                                </Card>
                            </div>
                        </main>
                    </div>
                </div>
            </SidebarLayout>
        </div>
	);
};