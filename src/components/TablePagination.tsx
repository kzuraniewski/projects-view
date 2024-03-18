import styled from '@emotion/styled';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IconButton, TableCell, Typography } from '@mui/material';

const MIN_PAGE = 1;

export type TablePaginationProps = {
	page: number;
	totalPages?: number;
	colSpan?: number;
	onPageChange?: (page: number) => void;
};

const TablePagination = ({
	page,
	totalPages,
	colSpan,
	onPageChange,
}: TablePaginationProps) => {
	const previousPage = () => onPageChange?.(page - 1);

	const nextPage = () => onPageChange?.(page + 1);

	const atMinPage = page <= MIN_PAGE;
	const atMaxPage = totalPages ? page >= totalPages : false;

	return (
		<Cell colSpan={colSpan}>
			<Panel>
				<Typography>
					Page {page}
					{totalPages ? ` of ${totalPages}` : null}
				</Typography>

				<Actions>
					<IconButton onClick={previousPage} disabled={atMinPage}>
						<ArrowBackIosIcon fontSize="small" />
					</IconButton>

					<IconButton onClick={nextPage} disabled={atMaxPage}>
						<ArrowForwardIosIcon fontSize="small" />
					</IconButton>
				</Actions>
			</Panel>
		</Cell>
	);
};

const Cell = styled(TableCell)`
	padding: 10px;
`;

const Panel = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: end;
	align-items: center;
	gap: 1.5rem;
`;

const Actions = styled.div`
	display: flex;
	gap: 0.3rem;
`;

export default TablePagination;
