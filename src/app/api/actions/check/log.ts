import sqlite3 from "sqlite3";
import { open } from "sqlite";

/**
 * Appends data to a SQLite database with the specified columns in the Records table.
 * 
 * @param currentTime - The current time (timestamp).
 * @param wallet - A string representing a wallet address.
 * @param isMember - A boolean indicating membership status.
 */
export async function log(
  currentTime: string,
  wallet: string,
  isMember: boolean
): Promise<void> {
  const dbFilePath = "./logs/database.db"; // Path to the SQLite database file.

  // Open the database file, creating it if it doesn't exist.
  const db = await open({
    filename: dbFilePath,
    driver: sqlite3.Database,
  });

  try {
    // Create the Records table if it doesn't exist.
    await db.exec(
      `CREATE TABLE IF NOT EXISTS Records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp TEXT NOT NULL,
        wallet TEXT NOT NULL,
        isMember BOOLEAN NOT NULL
      )`
    );

    // Insert the new record into the Records table.
    await db.run(
      `INSERT INTO Records (timestamp, wallet, isMember)
       VALUES (?, ?, ?)`,
      currentTime,
      wallet,
      isMember
    );

    console.log("Record appended successfully!");
  } catch (error) {
    console.error("Error appending record to the database:", error);
  } finally {
    // Close the database connection.
    await db.close();
  }
}

/**
 * Appends data to a SQLite database with the specified columns in the Lovers table.
 * 
 * @param time - The current time (timestamp).
 * @param wallet - A string representing a wallet address.
 */
export async function logLove(
  time: string,
  wallet: string
): Promise<void> {
  const dbFilePath = "./logs/database.db"; // Path to the SQLite database file.

  // Open the database file, creating it if it doesn't exist.
  const db = await open({
    filename: dbFilePath,
    driver: sqlite3.Database,
  });

  try {
    // Create the Lovers table if it doesn't exist.
    await db.exec(
      `CREATE TABLE IF NOT EXISTS Lovers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp TEXT NOT NULL,
        wallet TEXT NOT NULL
      )`
    );

    // Insert the new record into the Lovers table.
    await db.run(
      `INSERT INTO Lovers (timestamp, wallet)
       VALUES (?, ?)`,
      time,
      wallet
    );

    console.log("Love record appended successfully!");
  } catch (error) {
    console.error("Error appending love record to the database:", error);
  } finally {
    // Close the database connection.
    await db.close();
  }
}

/**
 * Retrieves the number of rows in the Lovers table.
 * 
 * @returns The number of rows in the Lovers table.
 */
export async function getLoversCount(): Promise<number> {
  const dbFilePath = "./logs/database.db"; // Path to the SQLite database file.

  // Open the database file.
  const db = await open({
    filename: dbFilePath,
    driver: sqlite3.Database,
  });

  try {
    // Query to count the number of rows in the Lovers table.
    const result = await db.get(`SELECT COUNT(*) AS count FROM Lovers`);
    
    return result.count;
  } catch (error) {
    console.error("Error retrieving the number of lovers:", error);
    return 0; // Return 0 in case of error.
  } finally {
    // Close the database connection.
    await db.close();
  }
}
