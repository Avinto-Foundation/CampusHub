#!/bin/sh
set -e

python manage.py migrate --noinput

python manage.py loaddata \
    m1_library/fixtures/seed.json \
    m2_events/fixtures/seed.json \
    m3_gpa/fixtures/seed.json \
    m4_hostel/fixtures/seed.json \
    m5_bus/fixtures/seed.json \
    m6_printshop/fixtures/seed.json \
    m7_attendance/fixtures/seed.json \
    m8_canteen/fixtures/seed.json

python manage.py runserver 0.0.0.0:8000
