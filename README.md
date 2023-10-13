# Group SQécureuilL 🐿️

The Florin County Council have a number of issues. Like every county council they are having to do more with less and government cuts are biting hard. The council is increasingly having to rely on community involvement and to think of creative solutions to keep valued public services running. The council has asked a number of developer teams to come up with a tech solution for a problem that stakeholders in the local community are facing.

# Florin County Council App

Welcome to the Florin County Council App, your tool for community involvement.

## About the App

Our mission is to create a transparent and efficient local government. The Florin County Council App empowers you to report issues, vote on community priorities, and make a direct impact.

## How It Works

- **Report & Prioritize:** Easily report neighborhood issues. Your reports lead to action through community voting.

- **Democracy in Action:** Your votes prioritize the most important concerns in our county.

## Two Ways to Participate

1. **Submit a Report:** Share problems or ideas; your reports can be voted on for support.

2. **Vote on Reports:** See what's trending in your area and influence County Council actions.

## Why Choose Us

- **Transparency:** Our process is open, so you can track issue resolution.

- **Community Collaboration:** Work with neighbors and the County Council for positive change.

- **Efficiency:** Streamlined reporting for quicker results.

- **Direct Impact:** Your voice directly shapes county improvements.

Join us in building a better Florin County. Download the app and share your voice today!


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