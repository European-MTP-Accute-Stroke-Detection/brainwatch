# brAInwatch - Frontend

This repository contains the frontend code of the brAInwatch application.


## Running the project

In order to run the project you have to install the [Angular CLI](https://github.com/angular/angular-cli) and run `npm i` to install the necessary dependencies. Then you can run `ng serve` in order to serve files on localhost.

You can now open a browser at http://localhost:4200 and enjoy!

## Deployment
The project is hooked up with a CD pipeline in Cloudflare Pages so every commit to the main branch will trigger a new build and the app is released under [brainwatch.pages.dev](https://brainwatch.pages.dev). If you need any assistance contact [@beckmarc](https://github.com/beckmarc)

## Firebase
Note, this project uses Firebase for Authentication, File and Data Storage. The project is on the free plan so quotas could be reached if the app is used extensively. For any help regarding Firebase contact [@beckmarc](https://github.com/beckmarc).

## System Architecture

Our general system architecture can be seen in this graphic:
![brainwatch System Architecture](/src/assets/images/brAInwatch%20system%20architecture.png)


