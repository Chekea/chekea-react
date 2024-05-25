import { sendNotification } from "../ayuda";
import app from "./firebases";
import {
  getDatabase,
  push,
  ref,
  remove,
  set,
  update,
  runTransaction,
  get,
} from "firebase/database";

const database = getDatabase(app);

export const RemoveVaueDB = async (path) => {
  const nodeRef = ref(database, path);

  // Call the remove method to delete the node
  remove(nodeRef)
    .then(() => {
      console.log("Node deleted successfully");
    })
    .catch((error) => {
      console.error("Error deleting node:", error);
    });
};
export const WriteDb = async (objeto, reference) => {
  const databaseRef = ref(database, reference); // Replace '-Mabc123' with the actual key of the record you want to update

  // Update the field with the new value
  set(databaseRef, objeto)
    .then(() => {
      console.log("Data updated in Firebase Realtime Database successfully.");
    })
    .catch((error) => {
      console.error(
        "Error updating data in Firebase Realtime Database:",
        error
      );
    });
};
export const WriteDbPush = async (objeto, reference) => {
  try {
    // Get a reference to the desired location in the database
    const databaseRef = ref(database, reference);

    // Generate a new push key
    const newPushRef = push(databaseRef);
    const pushKey = newPushRef.key;
    console.log("Push key:", pushKey);

    // Store the push key inside the object
    objeto.Codigo = pushKey;

    // Create a reference to the new location with the push key
    const newLocationRef = ref(database, `${reference}/${pushKey}`);

    // Push the updated object to the new location
    await set(newLocationRef, objeto);

    console.log("Data updated in Firebase Realtime Database successfully.");
  } catch (error) {
    console.error(
      "Error updating data in Firebase Realtime Database:",
      error.message
    );
  }
};
export const UpdateDb = async (objeto, reference) => {
  const database = getDatabase(app);

  const databaseRef = ref(database, reference); // Replace '-Mabc123' with the actual key of the record you want to update

  // Update the field with the new value
  update(databaseRef, objeto)
    .then(() => {
      console.log("Data updated in Firebase Realtime Database successfully.");
    })
    .catch((error) => {
      console.error(
        "Error updating data in Firebase Realtime Database:",
        error
      );
    });
};

export const sendNotif = (vendedor, titulo, cuerpo) => {
  const databaseRef = ref(database, `GE/Token/${vendedor}`);
  console.log("HORAS MUCHO");

  get(databaseRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const token = snapshot.val().token;
        console.log(token);
        // Assuming you have a function to send push notifications
        // Implement this function using the appropriate library
        sendNotification(token, titulo, cuerpo);
      } else {
        console.log("Snapshot does not exist");
        // Handle case where snapshot does not exist
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      // Handle error
    });
};

export const decrementValue = (amount, path, vendedor, codigo, contexto) => {
  const databaseRef = ref(database, path);

  runTransaction(databaseRef, (currentData) => {
    const value = currentData ? currentData : 0;
    const newValue = value - amount;

    return newValue;

    // Decrement the value

    // Update the value in the transaction
  })
    .then((result) => {
      const { committed, snapshot } = result;
      if (committed) {
        console.log("Transaction successful. New value:", snapshot.val());
        updatevalue(codigo);
      }
    })
    .catch((error) => {
      console.error("Transaction failed:", error.message);
    });
};

// Function to increment a value by 1
export const incrementValue = (database, path, codigo) => {
  const databaseRef = ref(database, path);

  return runTransaction(databaseRef, (currentData) => {
    const value = currentData ? currentData : 0;
    const newValue = value + 1;

    return newValue;
  })
    .then((result) => {
      const { committed, snapshot } = result;
      if (committed) {
        console.log("Transaction successful. New value:", snapshot.val());
        updatevalue(codigo);
      } else {
        console.log("Transaction aborted. No changes made.");
      }
    })
    .catch((error) => {
      console.error("Transaction failed:", error.message);
      throw error; // Re-throw the error for further handling
    });
};

// Function to update values
export const updatevalue = (codigo) => {
  const updatedValues = {
    isTrue: true,
    // Add other key-value pairs as needed
  };

  update(ref(database, `GE/NotificacionReb/${codigo}`), updatedValues)
    .then(() => {
      console.log("Values updated successfully!");
    })
    .catch((error) => {
      console.error("Error updating values:", error.message);
    });
};
// Function to update the stock value
export const updateStock = (codigo, contexto) => {
  const updatedValue = false; // Replace this with your new value
  const path = `GE/${contexto}/Prod/${codigo}/Stock`;

  const updateData = {
    [path]: updatedValue,
  };

  update(ref(database), updateData)
    .then(() => {
      console.log("Node updated successfully");
    })
    .catch((error) => {
      console.error("Error updating node:", error.message);
    });
};
