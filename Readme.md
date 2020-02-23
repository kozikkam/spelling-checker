Spell checking API written with typescript and Nestjs.

In order to start the app, run
- docker-compose up -d --build

Wait for database to populate with data, you can check whether it's done in web app logs `docker-compose logs -f web`, when
message `App listening on port 3000` will appear.

The app uses ispell dictionary to check if a word is correct, and a list of 10k most common english words to suggest corrections.
Corrections are defined on simple string similarity with postgres function.

API documentation can be found at `/swagger` endpoint.
