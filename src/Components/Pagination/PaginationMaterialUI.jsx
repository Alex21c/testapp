import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationMaterialUI({updateCurrentPage, stateTotalNoOfPages}) {
  return (
    <Stack spacing={2}
    className='bg-stone-300 px-[2rem] p-[1rem] rounded-md flex items-center w-fit m-[auto]'
    >      
      <Pagination count={stateTotalNoOfPages>0 ? stateTotalNoOfPages : 1} variant="outlined" shape="rounded" onChange={(event, value)=>updateCurrentPage(value)} />
    </Stack>
  );
}