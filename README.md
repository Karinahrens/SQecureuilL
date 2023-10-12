# Group SQécureuilL 🐿️

The Florin County Council have a number of issues. Like every county council they are having to do more with less and government cuts are biting hard. The council is increasingly having to rely on community involvement and to think of creative solutions to keep valued public services running. The council has asked a number of developer teams to come up with a tech solution for a problem that stakeholders in the local community are facing.

## Installation

To run the Florin County API locally, follow these steps:

1. Clone the repository to your local machine.

   ```bash
   git clone <repository HTTPS or SSH link>

   ```

2. Once you open the project, navigate to the project directory in your terminal.

   ```bash
   cd <api>

   ```

3. Install the required dependencies.Some independencies may already exist, but by running the below command, you will ensure that you have the latest versions.

   ```bash
   npm install
   npm install express dotenv pg cors
   npm install -D nodemon

   ```

   Make sure to install these dependencies in the root directory where you have the initial `package.json` file, which is where the server exists.

4. Create a `.env` file in the root directory and add your database URL and port information.

   ```
   DB_URL=<your elephant SQL database URL>
   PORT=3000

   ```

(To obtain the ElephantSQL URL, you must register for an ElephantSQL account at https://www.elephantsql.com/ [If the link doesn't work here, copy paste it in a new browser] and establish a new instance. Then, copy and paste the link into the configuration above.)

## Database Setup

Before running the API, you need to set up the database. Run the following command to establish a database connection and to set up the required table.

```bash
npm run setup-db

```

If the setup is successful, you should see the following message:

```
DB connection established.
Set-up complete.

```

## Running the Server

Now that the database is set up, you can start the API server using the following command:

```bash
npm run dev

```

The server will listen on port 3000 by default.