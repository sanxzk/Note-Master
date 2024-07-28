import React, { useState, useEffect } from "react";
import {
  Typography,
  IconButton,
  styled,
  Box,
  Button
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deleteNote } from "../../store/todo/todoSlice";
import { toast } from "react-toastify";
import EditNote from "../EditNote/EditNote";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";

 
const TodoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  maxWidth: "800px",
  margin: "0 auto",
}));

const ButtonGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
}));

const DescriptionContainer = styled(Box)(({ theme, expanded, readMore }) => ({
  position: 'relative',
  maxHeight: expanded ? 'none' : '100px',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginTop:'1rem',
    height: '50px',
    background: 'linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))',
    display: !expanded && readMore ? 'block' : 'none',
  }
}));

const ReadMoreButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

const DateContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

const TodoItem = ({ noteItem }) => {
  const dispatch = useDispatch();
  const { title, description, createdAt, updatedAt } = noteItem;
  const [expanded, setExpanded] = useState(false);
  const [shouldShowReadMore, setShouldShowReadMore] = useState(false);

  const formattedCreatedAt = format(new Date(createdAt), "dd MMMM, yyyy hh:mma", { locale: enUS });
  const formattedUpdatedAt = format(new Date(updatedAt), "dd MMMM, yyyy hh:mma", { locale: enUS });

  useEffect(() => {
    const wordCount = description.split(/\s+/).length;
    setShouldShowReadMore(wordCount > 50);
  }, [description]);

  const handleDelete = () => {
    dispatch(deleteNote(noteItem));
    toast.success("Deleted");
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <TodoContainer>
      <Box>
        <Typography variant="h6">{title}</Typography>
        <DescriptionContainer readMore={shouldShowReadMore} expanded={expanded}>
          <Typography sx={{overflow:'hidden'}} variant="body2">{description}</Typography>
        </DescriptionContainer>
        {shouldShowReadMore && (
          <ReadMoreButton onClick={toggleExpanded} variant="text" sx={{color:'#67339e'}}>
            {expanded ? "Read Less" : "Read More"}
          </ReadMoreButton>
        )}
        <DateContainer>
          <Typography variant="caption" color="textSecondary" display="block">
            Created At: {formattedCreatedAt}
          </Typography>
          <Typography variant="caption" color="textSecondary" display="block">
            Updated At: {formattedUpdatedAt}
          </Typography>
        </DateContainer>
      </Box>
      <ButtonGroup>
        <EditNote note={noteItem} />
        <IconButton onClick={handleDelete} color="secondary">
          <DeleteIcon style={{ color: "#67339e" }} />
        </IconButton>
      </ButtonGroup>
    </TodoContainer>
  );
};

export default TodoItem;