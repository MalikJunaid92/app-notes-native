import { FlatList } from "react-native";
import NoteIem from "./NoteIem";

const NoteList = ({ notes }) => {
  return (
    <FlatList
      data={notes}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <NoteIem note={item} />}
    />
  );
};

export default NoteList;
