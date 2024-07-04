CREATE DATABASE ESTATE;

CREATE TABLE property(
     property_id SERIAL PRIMARY KEY,
     property_name VARCHAR(100) ,
     property_owner VARCHAR(100) ,
     property_locality VARCHAR(200)
);