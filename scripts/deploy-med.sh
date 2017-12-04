#! /bin/bash

time=`date +%Y%m%d%H%M%S`

eb create -db.engine postgres -db.i db.m3.medium -db.user u --envvars RAILS_SERVE_STATIC_FILES="true",SECRET_KEY_BASE=AAAAAA -i m3.medium $time
