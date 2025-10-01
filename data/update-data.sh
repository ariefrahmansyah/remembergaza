#!/bin/bash

# Download summary.min.json
echo "Downloading summary.min.json"
curl -o data/summary.min.json https://data.techforpalestine.org/api/v3/summary.min.json

# Download killed-in-gaza.min.json
echo "Downloading killed-in-gaza.min.json"
curl -o data/killed-in-gaza.min.json https://data.techforpalestine.org/api/v2/killed-in-gaza.min.json
