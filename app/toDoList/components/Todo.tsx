
import { ListItem, ListItemText } from "@mui/material";
import moment from "moment";

const Todo = ({ id, Subject, Task, Deadline }) => {
  return (
    <ListItem 
      sx={{ mt: 3, boxShadow: 3}}
      style={{ backgroundColor: '#FAFAFA' }}
    >
      <ListItemText 
        primary={Subject}
        secondary={moment(Deadline).format("MMMM do, yyyy")}
        />

    </ListItem>
  )
}

export default Todo;