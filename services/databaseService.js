import { database } from "./appWrite";

const databaseService = {
  async listDocuments(dbId, colId) {
    try {
      const response = await database.listDocuments(dbId, colId);
      return response.documents || [];
    } catch (error) {
      console.error("Error listing documents:", error.message);
      return { error: error.message };
    }
  },
  async createDocument(dbId, colId, data, id = null) {
    try {
      return await database.createDocument(dbId, colId, id || "unique()", data);
    } catch (error) {
      console.error("Error creating document:", error.message);
      return { error: error.message };
    }
  },
  // update a document by ID
  async updateDocument(dbId, colId, id, data) {
    try {
      return await database.updateDocument(dbId, colId, id, data);
    } catch (error) {
      console.error("Error updating document:", error.message);
      return { error: error.message };
    }
  },
  // Delete a document by ID
  async deleteDocument(dbId, colId, id) {
    try {
      await database.deleteDocument(dbId, colId, id);
      return { success: true };
    } catch (error) {
      console.error("Error deleting document:", error.message);
      return { error: error.message };
    }
  },
};

export default databaseService;
