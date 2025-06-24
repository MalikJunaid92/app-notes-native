import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AddNoteModal from "../../components/AddNoteModal";
import NoteList from "../../components/NoteList";
import noteService from "../../services/noteService";

const NoteScreen = () => {
  const [notes, setNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    const response = await noteService.getNotes();
    if (response.error) {
      setError(response.error);
      Alert.alert("Error", response.error);
      setLoading(false);
      return;
    } else {
      setNotes(response.data);
      setError(null);
    }
    setLoading(false);
  };

  // Add a new note
  const addNote = async () => {
    if (newNote.trim() === "") {
      return;
    }
    const response = await noteService.addNote(newNote);
    if (response.error) {
      Alert.alert("Error", response.error);
    } else {
      setNotes([...notes, response.data]);
    }
    setNewNote("");
    setModalVisible(false);
  };
  // Edit a note
  const editNote = async (id, newText) => {
    if (newText.trim() === "") {
      Alert.alert("Error", "Note text cannot be empty.");
      return;
    }
    const response = await noteService.updateNote(id, newText);
    if (response.error) {
      Alert.alert("Error", response.error);
    } else {
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.$id === id ? { ...note, text: response.data.text } : note
        )
      );
    }
  };
  // Delete a note
  const deleteNote = async (noteId) => {
    Alert.alert(
      "Delete Note",
      "Are you sure you want to delete this note?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const response = await noteService.deleteNote(noteId);
            if (response.error) {
              Alert.alert("Error", response.error);
            } else {
              setNotes(notes.filter((note) => note.$id !== noteId));
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <>
          {error && <Text style={styles.errorText}>{error}</Text>}
          <NoteList notes={notes} onDelete={deleteNote} onEdit={editNote} />
        </>
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Add Note</Text>
      </TouchableOpacity>
      {/* Modal */}
      <AddNoteModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        newNote={newNote}
        setNewNote={setNewNote}
        addNote={addNote}
      />
    </View>
  );
};

export default NoteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 16,
  },
  noNotesText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
    marginTop: 15,
  },
  modalOvelay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 15,
    marginRight: 10,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "333",
    fontSize: 16,
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
