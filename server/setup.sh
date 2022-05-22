sudo -u postgres psql
#sudo password
CREATE USER memory_cards WITH PASSWORD 'memory_password';
CREATE DATABASE memory_db OWNER memory_cards;
\q
sudo adduser memory_cards
#sudo password
