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
import AddNote from "../AddNote/AddNote";

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  width: "50%",  
  margin: "0 auto",  
  [theme.breakpoints.up('md')]: {
    width: "50%",  
  },
  [theme.breakpoints.down('md')]: {
    width: "75%",  
  },
  [theme.breakpoints.down('sm')]: {
    width: "100%",  
  },
}));

const HeaderContainer = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const HeaderContent = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
}));

const SearchContainer = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const PaginationContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginTop: theme.spacing(3),
}));

const NotesContainer = styled(Grid)(({ theme }) => ({
  justifyContent: "left",
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
    const filtered = notesList.filter(
      (note) =>
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
      <HeaderContainer container spacing={3}>
        <Grid item xs={12}>
          <HeaderContent container spacing={3}>
            <Grid item>
              <Typography variant="h4" sx={{ color: "#67339e" }}>
                All Notes
              </Typography>
            </Grid>
            <Grid item>
              <AddNote />
            </Grid>
          </HeaderContent>
        </Grid>
      </HeaderContainer>

      <SearchContainer container spacing={2}>
        <Grid item xs={12}>
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
        </Grid>
      </SearchContainer>

      {filteredNotes.length > notesPerPage && (
        <PaginationContainer container spacing={2}>
          <Grid item>
            <Pagination
              count={pageCount}
              page={page}
              onChange={handleChangePage}
              color="primary"
              size={isMobile ? "small" : "medium"}
            />
          </Grid>
        </PaginationContainer>
      )}

      <NotesContainer container spacing={3}>
        {displayedNotes.map((note) => (
          <Grid item xs={12} sm={6} md={4} key={note.id}>
            <TodoItem noteItem={note} />
          </Grid>
        ))}
      </NotesContainer>

      {filteredNotes.length === 0 && searchTerm.trim()!==''  && (
        <Typography sx={{marginTop:'3rem'}} variant="body1" align="center">
          No notes found matching your search.
        </Typography>
      )}
    </StyledBox>
  );
};

export default MainContent;
