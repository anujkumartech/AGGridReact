import React, { useState, useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

import { DEFAULT_PAGE_SIZE, countOfMovies, fetchMovies } from '../services/movie-service';

export const AgGridTable = () => {
    const [movieData, setMovieData] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const columnDefs = [
        { field: 'movieId', headerName: "Movie ID", minWidth: 100 },
        { field: 'movieName', headerName: "Movie Name", flex: 1 },
        { field: 'releaseYear', headerName: "Release Year", flex: 1 }
    ];

    useEffect(() => {
        const fetchCount = async () => {
            const totalCount = await countOfMovies();
            setTotalRecords(totalCount);
        }
        fetchCount();
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fetchMovies();
            setMovieData(response);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const paginationPageSizeSelector = useMemo(() => {
        return [5, 10, 20];
    }, []);

    return (
        <>
            {isLoading && <div>Loading...</div>}

            <div
                className="ag-theme-quartz"
                style={{ height: 300, minHeight: 300 }}
            >
                {
                    totalRecords > 0 &&
                    <AgGridReact
                        rowData={movieData}
                        columnDefs={columnDefs}
                        pagination={true}
                        paginationPageSize={DEFAULT_PAGE_SIZE}
                        paginationPageSizeSelector={paginationPageSizeSelector}
                        totalRows={totalRecords}
                    />
                }

            </div>
        </>
    )
}