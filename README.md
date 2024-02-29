To those viewing my project:

My name is Christian Morris, and this code repository serves as a quick glance into my current skillset, what I'm learning in my own time, and a silly idea of what I hope to eventually be a spin-off Twitter for boats (or boat owners? that's still being decided).

As of 2024/02/29, I've worked on this project from scratch for about 15-20 hours. It may seem like there's not much to interact with on the tangible side, but a lot of this time was learning React.js. I've never used it prior to this project, so there's been many instances of having to set aside time to learn something new.

## What I've Implemented:

This app uses a Python/Django backend, and a React.js frontend (powered by Vite, paired with TypeScript - I've also never used TypeScript). I wanted to pair something I knew with something I didn't, which serves as a good environment for me to learn.

## Running the Django Server:

For those who are not familiar with the Python/Django structure, here are some preliminary steps to ensure that this project runs appropriately.

1. Please ensure that you are within a Python Virtual Environment (VENV). Within the VENV, within the `shipper\backend` directory, please first run `pip install -r requirements.txt` to ensure that all dependencies are properly installed prior to execution.
2. To ensure all database structures are registered accordingly, please run `python manage.py makemigrations` followed by `python manage.py migrate` within your VENV.
3. Fortunately in using Django, we are provided ease of access in running the server and/or tests for the application using built-in command line instructions. In the case that you would like to run the server, please ensure you are within the project's root folder and run `python manage.py runserver` in your VENV. In the case that you would like to run the tests I have written in this package, please run `python manage.py test`.
4. That's it, the backend server is running locally! To verify that the server is running properly, please refer to the feedback from your VENV, which should include a statment saying `Starting development server at http://[hostname]:[port]/`.

## Running the Vite/React.js Server:

I'm less familiar with this process myself, but I'll try to write a tutorial here. Seemingly it's easy to run something that exists as long as you have `npm` as an accessible command in your CLI of choice and `vite` installed.

1. In your CLI, navigate to `shipper\frontend`.
2. If you have `npm`, run `npm run dev`.
3. The React portion of the project should be running. This can be confirmed if you see lines similar to `VITE vX.X.X ready in [xxx] ms` with a localhost server being indicated in the same CLI (e.g., `-> Local:   http://[hostname]:[port]/`).

Both servers are now hopefully up and running. I'm excited for you all to see the product at work, and hopefully there is enough here to show my intent to grow as a developer.

Thank you again for looking!
Christian
