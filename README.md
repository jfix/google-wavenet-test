# How to use the script

Make sure you have an input file (see in the `input/` directory for examples).

```
node index.js input/swac-2019-18-en.json
```

## Troubleshooting

If you get an Google authorisation error, make sure the `GOOGLE_APPLICATION_CREDENTIALS` environment variable is set and points to the JSON file with the secrets.

```
% export GOOGLE_APPLICATION_CREDENTIALS="./blah-di-blah-Googles-secrets.json" 
```
