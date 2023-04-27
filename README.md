Music Player

This is a simple MP3 player built using React SPA, .Net Core 6 that allows you to upload and play MP3 files. It uses the id3js library to extract information from the ID3 tags of the uploaded file, and displays the title, artist, album, year, and cover image (if available) in the player.
Installation

To install and run this app locally, follow these steps:

    Clone the repository:

bash

git clone https://github.com/DrissBelhaj/MusicPlayer.git

Frontend alone : https://codepen.io/dukedriss/pen/yLReBXE

Requirements

    Node.js
    .NET Core 6
    Sql Server

Running the Application

Database

    For the database make sure you have MSSQL installed.
        In the Package Manager Console
            Run 'add-migration [MigrationName]' to create a migration.
            Run 'Update-Database' to create database based on the context and domain classes and the migration snapshot.   
Backend
     
    Navigate to the backend directory (Main Folder).
    Run 'dotnet build' to build the application.
    Run 'dotnet run' to launch the application.
    The backend will now be running on http://localhost:44330.

Frontend

    Navigate to the frontend directory (ClientApp).
    Run 'npm install' to install the required dependencies.
    Run 'npm start' to start the development server.
    The frontend will now be running on http://localhost:44330.

Or simply Run the application from visual studio by importing the .sln Project (Database migration and update is still required).

//TODO Add docker installation

Usage

To use the app:

    Click the + Button then a modal will open up then "Choose File" button and select an MP3 file from your computer.
    Once the file is selected, the player will display the song information and cover image (if available).
    Save then click the "Play" button to start playing the song. You can pause or stop the song at any time using the corresponding buttons.
    You can upload a new file by clicking the "+" button again.

Troubleshooting

    If the player is not displaying the song information or cover image, it may be because the file does not contain ID3 tags. You can check this by opening the file in a media player that displays metadata.
    If you encounter any other issues or errors, please understand that this is just an assessment program and it was made just for showcasing purposes.

License

This app is licensed under the MIT License.
