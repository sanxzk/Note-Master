import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Grid,
  Box,
  useMediaQuery,
  useTheme,
  Typography,
  Pagination,
  styled,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TodoItem from "../../Components/TodoItem/TodoItem";

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
}));

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  width: '300px',
  marginLeft: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    marginTop: theme.spacing(2),
  },
}));

const PaginationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(3),
}));

const NotesContainer = styled(Grid)(({ theme }) => ({
  justifyContent: 'center',
}));

const MainContent = () => {
  const { notesList } = useSelector((state) => state.todo);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNotes, setFilteredNotes] = useState(notesList);
  
  const notesPerPage = 10;

  useEffect(() => {
    const filtered = notesList.filter(note => 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNotes(filtered);
    setPage(1);
  }, [searchTerm, notesList]);

  const pageCount = Math.ceil(filteredNotes.length / notesPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const displayedNotes = filteredNotes.slice(
    (page - 1) * notesPerPage,
    page * notesPerPage
  );

  return (
    <StyledBox>
      <HeaderContainer>
        <Typography variant="h4" color="secondary">
          All Notes
        </Typography>
        <SearchContainer>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </SearchContainer>
      </HeaderContainer>

      {filteredNotes.length > notesPerPage && (
        <PaginationContainer>
          <Pagination
            count={pageCount}
            page={page}
            onChange={handleChangePage}
            color="primary"
            size={isMobile ? "small" : "medium"}
          />
        </PaginationContainer>
      )}

      <NotesContainer container spacing={3}>
        {displayedNotes.map((note) => (
          <Grid item xs={12} key={note.id}>
            <TodoItem noteItem={note} />
          </Grid>
        ))}
      </NotesContainer>

      {filteredNotes.length > notesPerPage && (
        <PaginationContainer>
          <Pagination
            count={pageCount}
            page={page}
            onChange={handleChangePage}
            color="primary"
            size={isMobile ? "small" : "medium"}
          />
        </PaginationContainer>
      )}

      {filteredNotes.length === 0 && (
        <Typography variant="body1" align="center">
          No notes found matching your search.
        </Typography>
      )}
    </StyledBox>
  );
};

export default MainContent;