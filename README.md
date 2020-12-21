# JKG Weight Training

![license](https://img.shields.io/static/v1?label=license&message=MIT&color=green&style=for-the-badge)

## Description

Weight lifting training application that stores training session performance and provides a program regimen to follow with recommended weights, reps, and exercises based on performance history.

## Table of Contents

- [Visuals](#visuals)
- [Usage](#usage)
- [Questions](#questions)
- [License](#license)

## Visuals

### Landing

![Landing Page](/client/public/images/Landing.png)

### Dashboard

![Dashboard First Time User](/client/public/images/DashboardFirstTime.png)
![Chart](/client/public/images/Chart.png)
![Training History](/client/public/images/TrainingHistory.png)

### New Training Program

![New Training Program](/client/public/images/WorkoutForm.png)
![New Training Program Review](/client/public/images/WorkoutFormReview.png)

### Training Session

![Training Session](/client/public/images/WorkoutLog.png)
![Training Session Review](/client/public/images/WorkoutLogReview.png)

### Edit

![Edit](/client/public/images/Edit.png)

### Deload

![Deload](/client/public/images/Deload.png)

## Usage

When logging in for the first time, the user will be greeted with a message prompting them to enter in their estimated weight lifting stats in the 'New Training Program' form. Upon submission, the user will be automatically redirected to the 'Training Session' screen to begin logging their first workout. On the 'Training Session' page, the user will find a timer they can use to track their rest periods, and will see a workout template laid out for them with prescribed exercises and recommended weights and reps. The recommended weight is calculated based upon the user's lifting stat for that particular execise. All subsequent workouts can be logged by click the dumbbell floating-action-button (FAB) in the bottom right corner of the dashboard. Additionally, the user can find other options--'New Training Program' and 'Deload Stats'--that expand out from the FAB by either hovering or clicking the FAB depending on whether they are viewing on a mobile device. Everytime a user logs a workout, the corresponding data is saved to the database and rendered onto the the user's dashboard under 'Training History'. In addition, if the user completes the prescribed exercises with the recommended weight and reps, their lifting stats will be updated to reflect that progression for those particular exercises. Once a user has logged more than 5 workouts, they can use the navigation buttons next to the 'Training History' header to paginate through their history. Additionally, once a user has logged more than 2 workouts with any exercise, a line chart will graph their progression onto the dashboard. For each log under the training history, there is an edit button that will redirect the user to an edit page containing data for the corresponding log. From there, the user can alter the weight and reps they previously entered. Doing so, however, will not update the user's current lifting stats as if they had completed a workout using the 'Training Session' page. If the user reaches a training plateau, they can choose to lower the recommended weights on 'Training Session' page by visiting the 'Deload Stats' page where they can lower their lifting stats for certain exercises. Finally, a user can also choose to start fresh with a new program at anytime by visiting the 'New Training Program' page and re-entering their weight lifting stats. This will automatically reset the prescribed exercises cycle that is presented via the 'Training Session' page.

## Questions

Please feel free to contact via email if you have any questions pertaining to this project.  
Email: jkole822@gmail.com  
[GitHub Profile](https://github.com/jkole822)

## License

[MIT](https://choosealicense.com/licenses/mit)
