This project is a simple aircraft queueing system for a fictional air-traffic-control system. You can enqueue and dequeue 4 different types of Aircraft.

-   LargePassengerAircraft
-   SmallPassengerAircraft
-   LargeCargoAircraft
-   SmallCargoAircraft

Each aircraft type is placed into its own subqueue and when the next aircraft is dequeued from the entire system, the earliest aircraft from the highest priority non-empty subqueue is removed from the queue and returned.

# How To Run

To run this app, first ensure you have Git, Docker, and Visual Studio Code installed. I have Git v2.39.2, Docker v4.16.2, and VS Code v1.82.2 installed, but I believe this should work on later versions as well.

After you have that installed, take the following steps to start the app:

1. Go to the "Dev Environments" tab in Docker Desktop.
2. Click the "Create" button in the top-right corner of the screen.
3. Click the "Get Started" button in the modal.
4. On the next screen, put "aeroqueue" for _Name_ and "https://github.com/darren-finch/aeroqueue.git" for the _Existing Git Repo_ field.
5. Press "Continue". Docker will download the source code from Git and start your dev container.
6. After the dev container is set up, press "Continue" again.
7. On the last page, click "Open in VSCode". VSCode will open and connect to the dev container.
8. After VSCode has finished connecting to the dev container, open a new terminal within VSCode and paste in this command: `/bin/bash setup-environment.sh`. This command will finish the environmental setup necessary to start the app and then start the app. This step takes some time.

After following these steps, `localhost:3000` should open in your web browser and you can begin using the aircraft queueing system. I have tested the app on both Firefox and Edge.

# How To Use App

When you open the app for the first time, the app displays a "Boot System" button which you will have to press to continue.

After booting the system, the app displays two primary sections: "Aircraft Queue" and "Last Dequeued Aircraft". The "Aircraft Queue" section displays 4 subqueues and their associated priorities. `LargePassengerAircraft` goes in queue with priority 3, `SmallPassengerAircraft` goes in queue with priority 2, and so on.

To enqueue a new aircraft, select the aircraft type from the dropdown and press the "Enqueue New Aircraft" button. You will see a new aircraft appear in the appropriate queue for the selected type as well as the enqueued time for the aircraft.

To dequeue an aircraft, press the dequeue button. The appropriate aircraft will be selected for dequeueing and it will appear in the "Last Dequeued Aircraft" section along with the time it was dequeued. If there are no aircraft to dequeue, an alert will appear on-screen.

_Important Note:_ This queueing system does not have persistence so if you refresh the page it will reset all of the data.

# How To Test

Open the terminal inside VSCode and ensure you are at the root folder of the app. Then run `npm run test`. You should see 2 test suites and 16 tests pass.
