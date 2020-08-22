This is a web application based on Lydia. It offers
a GUI to translate LDLf formula into DFAs.

It's made of
- a server-side API written in Python using the Lydia tool,
- a client-side web application written using ReactJS,
  and calling that API.

## Set up

Follow the instructions to set up the development environment.

- Clone the repository
```
git clone https://github.com/whitemech/lydia-web-app.git --recursive
```

- Update submodules recursively
```
cd server/lydia && git submodule update --init --recursive
cd ../../
```

- Create the virtual environment and install the Python dependencies:
```
cd server && pipenv shell --python 3.7 && pipenv install --dev && cd ../
```
- Make sure you have `npm` available on your system; then:
```
cd client && npm install && cd ../
```

## Run 

To launch the server on http://localhost:5000:
```
python -m server/lydia_api
```

Then launch a client with
```
cd client
npm run start
```

Now any save to `lydia_api.py` or `client/src/LydiaApp.js` will cause these
components to reload automatically.

## Authors

- Marco Favorito, [favorito@diag.uniroma1.it](mailto:favorito@diag.uniroma1.it)

## License

Both client and server are GPLv3 (see COPYING) as they build upon Lydia, which is GPLv3.

[Copyright WhiteMech 2020.](https://whitemech.github.io)
