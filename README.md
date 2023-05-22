# citybike
Web app for displaying CityBike related data (rides, stations). ReactJS, Django, PostgreSQL, Docker.

To run app:
1. Clone the citybike repo.
2. Once cloned, cd to the citybike directory.
3. Load the database:
   1. In the 'citybike' directory, enter 'docker-compose up db'.
   2. Once the 'citybike-db' container is up, open a new terminal, cd to the 'citybike' directory and enter the following command:
      gunzip -c db-citybike.sql.gz | docker-compose exec -T db psql -U postgres postgres
   4. Once the database has been loaded (may take a few minutes), close the terminal.
   5. In the initial terminal, stop the 'citybike-db' container (ctrl&c, 'docker-cmopose down')
4. Once 'citybike-db' container has been shut down, enter 'docker-copmpose up'.
   This will spin up the 'citybike-db', citybike-backend' and 'citybike-frontend' containers.
5. Once all three containers are up, open localhost:3000 in your web browser to access the application.
