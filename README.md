Hello Shipper Team,

Again, my name is Christian Morris, and this code repository will serve as another step in my application to be a full-time backend engineer with your company.

Per the coding challenge writeup provided at the beginning of development, I wanted to provide a little bit of a rundown on what I've implemented, how to access each API, and the functionality of each API. Please see the below for more details.

## What I've Implemented:

Within this structure, I've created a Python/Django operated set of APIs that handle the viewing, creation, and updating of Vessels (more on each API below), as well as a set of APIs used for viewing, adding, and updating any single Vessel's Voyage. The models for each are explained below.

### Vessel:

- NACCS (String): The primary key for any Vessel, as it is unique
- Name (String): The name of a Vessel
- Owner ID (String): The name of a Vessel's owner
- Created At (DateTime): A timestamp for the original creation of any Vessel
- Modified At (DateTime): A timestamp for the latest occurence of a PATCH (if no PATCH has occured, this will be null/None)

### Voyage:

- NACCS (String): The primary key for any Voyage, as it is unique (must be from an existing Vessel)
- Departure Location (String): The location of departure for the Voyage
- Arrival Location (String): The location of arrival for the Voyage
- Departure Time (DateTime): The scheduled time for the departure of a Vessel (considered the start of the Voyage)
- Arrival Time (DateTime): The scheduled time for the arrival of a Vessel (considered the end of the Voyage)
- Created At (DateTime): A timestamp for the original creation of any Voyage
- Modified At (DateTime): A timestamp for the latest occurence of a PATCH (if no PATCH has occured, this will be null/None)

## Running the Server:

For those who are not familiar with the Python/Django structure, here are some preliminary steps to ensure that this project runs appropriately.

1. Please ensure that you are within a Python Virtual Environment (VENV). Within the VENV, please first run `pip install -r requirements.txt` to ensure that all dependencies are properly installed prior to execution.
2. To ensure all database structures are registered accordingly, please run `python manage.py makemigrations` followed by `python manage.py migrate` within your VENV.
3. Fortunately in using Django, we are provided ease of access in running the server and/or tests for the application using built-in command line instructions. In the case that you would like to run the server, please ensure you are within the project's root folder and run `python manage.py runserver` in your VENV. In the case that you would like to run the tests I have written in this package, please run `python manage.py test`
4. That's it, the server is running locally! To verify that the server is running properly, please refer to the feedback from your VENV, which should include a statment saying `Starting development server at http://[hostname]:[port]/`.

Now that the server is up, please refer to the writeup below to begin interacting with the APIs that I've implemented.

## About The APIs - Vessel:

### Viewing The List of Vessels in the DB (GET)

This view will be accessible at `[your_localhost]:[port]/shipper/api`. Using a GET call with this URL provides a list of all registered Vessels within the database at that time.

### Creating a New Vessel (POST)

This view is also accessible at `[your_localhost]:[port]/shipper/api`. Using a POST call with this URL allows for the creation of a new Vessel. Please ensure the following when creating a new Vessel:

- All necessary fields are input. This includes a unique `naccs`, a `name`, and an `owner_id`. A sample POST payload/body looks like this:
  `{ "naccs": "ABC123", "name": "Test #1", "owner_id": "Owner #1" }`

### Updating an Existing Vessel (PATCH)

This view is accessible at `[your_localhost]:[port]/shipper/api/[NACCS]`, where `[NACCS]` is the NACCS code of an existing Vessel.

As this is a PATCH operation, it is not necessary to provide every field within the payload/body of a request. For example, the following payload will also work:
`{ "name": "Updated Test #1" }`

## About The APIs - Voyage:

All functionalities (GET, POST, PATCH) for Voyages are accessible at the same url: `[your_localhost]:[port]/shipper/api/[NACCS]/voyage`, where `[NACCS]` is the NACCS code of an existing Vessel. For example: `[your_localhost]:[port]/shipper/api/ABC123/voyage`.

### Viewing a Single Vessel's Current Voyage (GET)

By visiting any page for an existing Vessel, it is possible to see whether or not that Vessel is on a Voyage and the details of said Voyage if there is one.

### Creating a New Voyage (POST)

When making a POST call, please ensure all of the following are provided in your payload/body:

- the `NACCS` of an existing Vessel
- a `departure_location` and `arrival_location`
- a `departure_time` and `arrival_time`, input as a String formatted `YYYY-MM-DD hh:mm`

Please ensure that the `arrival_time` for a voyage occurs only after the `departure_time`.

A sample body is as follows:
`{ "departure_location": "NYC", "arrival_location": "LA", "departure_time": "2020-05-10 10:00", "arrival_time": "2020-05-10 10:30" }`

### Updating an Existing Voyage (PATCH)

When making a PATCH call, it is not necessary to include all fields within the payload/body. For example, the following payload is acceptable:
`{ "departure_location": "Sao Paolo", "arrival_time": "2020-05-15 19:30" }`

My apologies for the long writeup, but I hope that I've explained at least the basics well enough for anyone to navigate this product with relative ease. I'm excited for you all to see the product at work, and hopefully there will be an opportunity to review my code thoroghly with the team to further discuss design decisions, pros, cons, and the like

Thank you again for your consideration, and I hope to hear from you soon.
Christian Morris
