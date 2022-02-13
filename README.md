# Kroket Stream Studio

## What is this?

All the live streaming needs of the digital newsroom in one package.
Features:

-   Restream YouTube live streams or HLS playlists (.m3u8 files) to your Twitter Media Studio Producer, Facebook page, YouTube or Twitch channel or any other RTMP endpoint.
-   Add your own graphics to the live stream using a PNG image.
-   Restream to more than one endpoint at the same time.
-   Download videos from any social media site.

Features coming soon™:

-   YouTube channel live tracker: Add YouTube channels to a watchlist and get a notification when they go live.
-   Official sources live tracker: A watchlist of state media and official sources live streams. Follow them and get notified if they go live.

## Application Diagram

![GitHub Light](/.github/diagram_lightmode.png#gh-light-mode-only)
![GitHub Dark](/.github/diagram_darkmode.png#gh-dark-mode-only)

## Technical description

Kroket Stream Studio is a PERN application with the following components:

-   API: Built in Express, communicates with the database, starts encoding jobs and displays the necessary information on the frontend
-   Frontend: Using React functional components with hooks, renders client-side based on the information available from the API.
-   Database: Powered by PostgreSQL, holds information such as usernames, hashes of the passwords, RTMP endpoints, current streamings and their status.
-   Redis: Used as a session store to keep users logged in after authenticating. Also serves as a message queue (via [RQ](https://python-rq.org/)) which has been used instead of Node-native alternatives because it allows to stop jobs that are currently in execution. This feature is a hard requirement for this project.
-   Ingest: Worker that encodes live streams using [FFMPEG](https://www.ffmpeg.org/). It will layer the user's selected watermark on top of the original stream and reencode it (CPU intensive). One instance of this service only encodes one live stream. The number of instances can be set on the docker-compose file, using the 'replicas' parameter.
-   Relay: Worker that handles forwarding of the server encoded live stream to the selected endpoint. This is not CPU intensive as streams are forwarded without reencoding. One instance of this service can forward 6 live streams. The number of instances can be set on the docker-compose file, using the 'replicas' parameter.
-   Thumbnails: Service that generates thumbnails for the currently encoded live streams, updating them every minute.

## Installation

Clone the repository and run it locally using `docker-compose up`. Visit the frontend one `http://localhost:8085/`. Please note that RQ workers [require](https://python-rq.org/docs/#limitations) `fork()` and thus will only work on Windows under WSL.
